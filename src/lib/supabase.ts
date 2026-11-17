import { createClient } from '@supabase/supabase-js';
import { Product, Order } from '@/types';
import { PRODUCTS } from '@/data/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Fetch catalog products.
 * Automatically tries Supabase first; if not configured or query fails,
 * seamlessly falls back to the in-memory PRODUCTS seed list.
 */
export async function getProducts(): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('is_featured', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
      if (error) {
        console.warn('Supabase fetch failed, falling back to local seed products:', error.message);
      }
    } catch (err) {
      console.warn('Supabase query error, using local fallback:', err);
    }
  }
  return PRODUCTS;
}

/**
 * Create a new pending order.
 */
export async function saveOrder(order: Partial<Order>): Promise<{ success: boolean; order?: Order; error?: string }> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();

      if (error) {
        console.error('Failed to create order in Supabase:', error);
        return { success: false, error: error.message };
      }
      return { success: true, order: data as Order };
    } catch (err: any) {
      console.error('Supabase saveOrder exception:', err);
      return { success: false, error: err.message };
    }
  }

  // Fallback for development without Supabase credentials:
  // Store order in memory or sessionStorage
  const mockOrder: Order = {
    id: `ord-${Date.now()}`,
    reference_pubkey: order.reference_pubkey || '',
    status: 'pending',
    items: order.items || [],
    total_usdc: order.total_usdc || 0,
    total_sol_estimated: order.total_sol_estimated || 0,
    customer_email: order.customer_email,
    customer_wallet: order.customer_wallet,
    shipping_address: order.shipping_address,
    created_at: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    const existing = JSON.parse(sessionStorage.getItem('shoppy_orders') || '[]');
    sessionStorage.setItem('shoppy_orders', JSON.stringify([mockOrder, ...existing]));
  }

  return { success: true, order: mockOrder };
}

/**
 * Retrieve an order by its unique Solana Pay reference key.
 */
export async function getOrderByReference(reference: string): Promise<Order | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('reference_pubkey', reference)
        .single();

      if (!error && data) {
        return data as Order;
      }
    } catch (err) {
      console.warn('Error fetching order from Supabase:', err);
    }
  }

  // Fallback check in local session
  if (typeof window !== 'undefined') {
    const existing: Order[] = JSON.parse(sessionStorage.getItem('shoppy_orders') || '[]');
    return existing.find(o => o.reference_pubkey === reference) || null;
  }

  return null;
}

/**
 * Mark order as paid once confirmed on-chain.
 */
export async function markOrderPaid(
  reference: string, 
  txSignature: string, 
  walletAddress?: string
): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          tx_signature: txSignature,
          customer_wallet: walletAddress,
          updated_at: new Date().toISOString(),
        })
        .eq('reference_pubkey', reference);

      if (!error) return true;
    } catch (err) {
      console.error('Error updating order in Supabase:', err);
    }
  }

  // Local fallback
  if (typeof window !== 'undefined') {
    const existing: Order[] = JSON.parse(sessionStorage.getItem('shoppy_orders') || '[]');
    const updated = existing.map(o => 
      o.reference_pubkey === reference 
        ? { ...o, status: 'paid' as const, tx_signature: txSignature, customer_wallet: walletAddress } 
        : o
    );
    sessionStorage.setItem('shoppy_orders', JSON.stringify(updated));
    return true;
  }

  return true;
}
