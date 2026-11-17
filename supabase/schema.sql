-- ==============================================================================
-- SHOPPY // SUPABASE DATABASE SCHEMA
-- Dev3pack Hackathon: Solana Apparel & Solana Pay Checkout
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('hoodies', 'polos', 'accessories')),
    description TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    price_usdc NUMERIC(10, 2) NOT NULL,
    price_sol_approx NUMERIC(10, 4) NOT NULL,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
    colors JSONB NOT NULL DEFAULT '[]'::jsonb,
    stock INTEGER NOT NULL DEFAULT 50,
    badge TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_pubkey TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'cancelled')),
    items JSONB NOT NULL,
    total_usdc NUMERIC(10, 2) NOT NULL,
    total_sol_estimated NUMERIC(10, 4) NOT NULL,
    customer_email TEXT,
    customer_wallet TEXT,
    shipping_address JSONB,
    tx_signature TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_orders_reference ON public.orders(reference_pubkey);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_wallet ON public.orders(customer_wallet);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Policies
-- Products: Read-only to public
CREATE POLICY "Allow public read access on products"
    ON public.products FOR SELECT
    USING (true);

-- Orders: Public can insert pending orders
CREATE POLICY "Allow public insert on orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

-- Orders: Public can select by reference_pubkey (for Solana Pay polling) or wallet
CREATE POLICY "Allow public select on orders by reference"
    ON public.orders FOR SELECT
    USING (true);

-- Orders: Public update allowed for tx_signature & status (or handled via service role API)
CREATE POLICY "Allow public update order status"
    ON public.orders FOR UPDATE
    USING (true);

-- ==============================================================================
-- 6. SEED PRODUCTS
-- ==============================================================================
INSERT INTO public.products (id, name, slug, category, description, features, price_usdc, price_sol_approx, images, sizes, colors, stock, badge, is_featured)
VALUES
(
  'prod-01',
  'Genesis Engineered Tech Polo',
  'genesis-engineered-tech-polo',
  'polos',
  'Precision-tailored performance polo woven from recycled tech-fibers with high-density micro-pique knit. Features subtle Solana ultraviolet accent threading on the collar.',
  '["Moisture-wicking Aerotech™ stretch fabric", "Bonded seam construction with laser-cut hem", "Minimalist Solana ultraviolet micro-tag", "UPF 50+ UV solar protection"]'::jsonb,
  49.00,
  0.306,
  '["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  '["S", "M", "L", "XL", "XXL"]'::jsonb,
  '[{"name": "Obsidian Black", "hex": "#121214"}, {"name": "Solana Purple", "hex": "#9945FF"}, {"name": "Carbon Grey", "hex": "#2A2D34"}]'::jsonb,
  24,
  'Flagship Drop',
  true
),
(
  'prod-02',
  'Validator Edition 450 GSM Heavyweight Hoodie',
  'validator-heavyweight-hoodie',
  'hoodies',
  'Ultra-heavy 450 GSM custom French Terry cotton. Built with an architectural double-lined hood, dropped shoulders, and a stealth iridescent Solana gradient sleeve insignia.',
  '["450 GSM 100% Combed Organic Cotton", "Double-stitched ribbed side gussets for mobility", "Hidden kangaroo pocket with internal zippered key pouch", "Heat-transferred holographic validator badge"]'::jsonb,
  85.00,
  0.531,
  '["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  '["M", "L", "XL", "XXL"]'::jsonb,
  '[{"name": "Phantom Charcoal", "hex": "#1E1E22"}, {"name": "Cyber Teal", "hex": "#14F195"}, {"name": "Pure Onyx", "hex": "#0B0B0C"}]'::jsonb,
  18,
  'Best Seller',
  true
),
(
  'prod-03',
  'Seeker Genesis Storm-Shield Zip Hoodie',
  'seeker-genesis-zip-hoodie',
  'hoodies',
  'Designed in tribute to Solana Seeker mobile. Water-resistant matte nylon shell bonded with soft microfleece. Engineered with dedicated secure mobile phone pocket and rubberized pulls.',
  '["Storm-proof DWR coated exterior shell", "Ergonomic internal Seeker device pocket with magnetic closure", "Two-way YKK matte black waterproof zippers", "Reflective Solana gradient heat seals"]'::jsonb,
  89.00,
  0.556,
  '["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  '[{"name": "Matte Stealth", "hex": "#181A1B"}, {"name": "Lunar Slate", "hex": "#4A5568"}]'::jsonb,
  12,
  'Seeker Edition',
  true
),
(
  'prod-04',
  'Breakpoint Piqué Performance Polo',
  'breakpoint-pique-polo',
  'polos',
  'A modern sporting polo crafted from lightweight honeycomb knit. Subtle contrast placket in Solana cyan with magnetic closure and clean laser-engraved buttons.',
  '["Engineered honeycomb piqué airflow weave", "Hidden stay-flat magnetic collar stay", "Anti-odor silver yarn technology", "Tailored athletic taper fit"]'::jsonb,
  52.00,
  0.325,
  '["https://images.unsplash.com/photo-1625910513413-568393c5eb29?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  '["S", "M", "L", "XL"]'::jsonb,
  '[{"name": "Midnight Navy", "hex": "#101B2B"}, {"name": "Pure White", "hex": "#F8FAFC"}, {"name": "Solana Gradient", "hex": "#9945FF"}]'::jsonb,
  30,
  'New Season',
  false
),
(
  'prod-05',
  'Sub-Second Oversized Fleece Hoodie',
  'sub-second-oversized-fleece',
  'hoodies',
  'Relaxed drop-shoulder silhouette with heavy brushed interior. Back typography commemorates "400ms Sub-Second Finality" in subtle reflective print.',
  '["400 GSM brushed loopback fleece", "Relaxed boxy streetwear drape", "High-density 3D tonal back graphic", "Pre-shrunk organic wash"]'::jsonb,
  79.00,
  0.494,
  '["https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  '["M", "L", "XL"]'::jsonb,
  '[{"name": "Pitch Black", "hex": "#0D0E10"}, {"name": "Heather Moss", "hex": "#3B413C"}]'::jsonb,
  20,
  'Popular',
  false
),
(
  'prod-06',
  'Consensus Supima Cotton Classic Polo',
  'consensus-supima-classic-polo',
  'polos',
  'Crafted from 100% extra-long staple American Supima cotton. Unrivaled softness, deep color retention, and an understated tonal Solana crest embroidery.',
  '["100% Premium American Supima cotton", "Mother-of-pearl engraved buttons", "Reinforced split hem with herringbone tape", "Pre-washed for zero shrinkage"]'::jsonb,
  48.00,
  0.300,
  '["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  '["S", "M", "L", "XL", "XXL"]'::jsonb,
  '[{"name": "Dark Heather Grey", "hex": "#2C2D30"}, {"name": "Solana Teal", "hex": "#14F195"}, {"name": "Deep Space Navy", "hex": "#0F172A"}]'::jsonb,
  15,
  NULL,
  false
),
(
  'prod-07',
  'Zero-Gas Boxy Cropped Hoodie',
  'zero-gas-boxy-cropped-hoodie',
  'hoodies',
  'Contemporary boxy, raw-hem streetwear cut. Custom garment-dyed wash gives every piece a unique patina. Accented with subtle purple contrast stitch along the cuffs.',
  '["380 GSM garment-dyed French Terry", "Raw edge waist hem with stay-stitch reinforcement", "Dropped shoulder seam styling", "Ultra-soft brushed peach skin handfeel"]'::jsonb,
  75.00,
  0.469,
  '["https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  '["XS", "S", "M", "L"]'::jsonb,
  '[{"name": "Vintage Washed Black", "hex": "#232325"}, {"name": "Solana Violet", "hex": "#7C3AED"}]'::jsonb,
  16,
  'Limited Drop',
  false
),
(
  'prod-08',
  'Seeker 5-Panel Water-Repellent Cap',
  'seeker-5-panel-cap',
  'accessories',
  'Technical 5-panel unstructured cap made with water-resistant ripstop nylon. Fitted with a quick-release magnetic Fidlock buckle and iridescent Solana icon on the brow.',
  '["Ultra-durable micro-ripstop nylon weave", "German engineered magnetic slider buckle", "Absorbent moisture-wicking sweatband", "Flexible packable visor"]'::jsonb,
  35.00,
  0.219,
  '["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  '["One Size (Adjustable)"]'::jsonb,
  '[{"name": "Matte Black", "hex": "#111215"}, {"name": "Storm Grey", "hex": "#374151"}]'::jsonb,
  45,
  'Essential',
  false
)
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  price_usdc = EXCLUDED.price_usdc,
  stock = EXCLUDED.stock;
