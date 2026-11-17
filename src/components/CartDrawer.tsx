'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, Plus, Minus, ArrowRight, Zap, ShoppingBag, ShieldCheck } from 'lucide-react';
import { ShoppyLogo } from './ShoppyLogo';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  onProceedToCheckout?: () => void;
}

export function CartDrawer({ onProceedToCheckout }: CartDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalUsdc, 
    currency 
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!mounted || !isOpen) return null;

  const totalCount = getTotalItems();
  const totalUsdc = getTotalUsdc();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#000000] border-l border-white/10 h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppyLogo className="w-5 h-5" />
            <h2 className="font-mono font-bold text-sm tracking-wider uppercase text-white">
              YOUR BAG ({totalCount})
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-zinc-600" />
              </div>
              <h3 className="font-mono text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                Your bag is empty
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mb-6 font-sans">
                Explore our heavyweight hoodies and engineered polos powered by Solana Pay.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 rounded-xl bg-[#111111] border border-white/10 hover:border-white/20 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-950 shrink-0 border border-white/10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-mono font-semibold text-white line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-500 hover:text-white p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Size and Color tags */}
                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-400">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-200">
                        {item.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-zinc-700"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        {item.color.name}
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <div className="flex items-center border border-white/10 bg-zinc-950 rounded-md overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-bold text-xs text-white">
                      {formatPrice(item.price_usdc * item.quantity, currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Checkout CTA — Strict Monochrome Black & White */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#000000] space-y-4">
            {/* Solana Pay Highlight Box */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#111111] border border-white/10 text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-white shrink-0" />
              <div className="text-zinc-300 text-[11px] leading-tight">
                <span className="text-white font-semibold">Solana Pay Standard:</span> Real-time reference key & sub-second settlement.
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(totalUsdc, currency)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Network Settlement Fee</span>
                <span className="text-white">&lt; $0.001 (Solana)</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="text-white font-semibold">FREE (HACKATHON DROP)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Total Due</span>
                <span className="text-white text-base">
                  {formatPrice(totalUsdc, currency)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 px-4 rounded-full bg-white text-black hover:bg-zinc-200 font-mono font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
              >
                <span>Checkout with Solana Pay</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>

              <button
                onClick={clearCart}
                className="w-full py-1.5 text-center text-[11px] font-mono text-zinc-500 hover:text-white transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Devnet-Compatible • Instant Wallet QR</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
