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
    category TEXT NOT NULL CHECK (category IN ('hoodies', 'polos', 'runway-suits')),
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

-- Public can view all products
CREATE POLICY "Public products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

-- Public can create orders (checkout)
CREATE POLICY "Anyone can create an order" 
ON public.orders FOR INSERT WITH CHECK (true);

-- Orders can be read by reference or id
CREATE POLICY "Orders can be read by reference" 
ON public.orders FOR SELECT USING (true);

-- Orders can be updated (e.g., mark as paid after verification)
CREATE POLICY "Orders can be updated" 
ON public.orders FOR UPDATE USING (true);

-- ==============================================================================
-- 5. SEED PRODUCTS (12 Items: Polos, Hoodies, Runway Suits with Solana Branding)
-- ==============================================================================
INSERT INTO public.products (id, name, slug, category, description, features, price_usdc, price_sol_approx, images, sizes, colors, stock, badge, is_featured)
VALUES
(
    'prod-01',
    'Genesis Engineered Tech Polo',
    'genesis-engineered-tech-polo',
    'polos',
    'Precision-tailored performance polo woven from recycled tech-fibers with high-density micro-pique knit. Features an authentic thermal-bonded Solana circular emblem on the chest.',
    '["Authentic high-density silicone Solana emblem heat-pressed on chest", "Moisture-wicking Aerotech™ stretch fabric", "Bonded seam construction with laser-cut hem", "UPF 50+ UV solar protection"]'::jsonb,
    49.00,
    0.306,
    '["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S", "M", "L", "XL", "XXL"]'::jsonb,
    '[{"name": "Obsidian Black", "hex": "#121214"}, {"name": "Off-White", "hex": "#F4F4F6"}, {"name": "Charcoal Slate", "hex": "#2A2D34"}]'::jsonb,
    24,
    'Flagship Drop',
    true
),
(
    'prod-02',
    'Breakpoint Piqué Performance Polo',
    'breakpoint-pique-polo',
    'polos',
    'A modern sporting polo crafted from lightweight honeycomb airflow knit. Features a laser-etched Solana brand crest on the sleeve cuff and stay-flat magnetic collar.',
    '["Precision laser-etched Solana disc crest on left sleeve", "Engineered honeycomb piqué airflow weave", "Hidden stay-flat magnetic collar stay", "Anti-odor silver yarn technology"]'::jsonb,
    52.00,
    0.325,
    '["https://images.unsplash.com/photo-1625910513413-568393c5eb29?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S", "M", "L", "XL"]'::jsonb,
    '[{"name": "Pure Onyx", "hex": "#0D0E10"}, {"name": "Arctic White", "hex": "#FFFFFF"}, {"name": "Navy Slate", "hex": "#101B2B"}]'::jsonb,
    32,
    'Breakpoint ’25',
    false
),
(
    'prod-03',
    'Consensus Supima Luxury Polo',
    'consensus-supima-classic-polo',
    'polos',
    'Crafted from 100% extra-long staple American Supima cotton. Unrivaled handfeel, natural drape, and understated tonal embroidered Solana circular insignia.',
    '["Tonal embroidered circular Solana insignia on breast", "100% Extra-long staple American Supima cotton", "Natural horn buttons with laser-engraved monogram", "Reinforced split hem with herringbone tape"]'::jsonb,
    58.00,
    0.363,
    '["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S", "M", "L", "XL", "XXL"]'::jsonb,
    '[{"name": "Heather Graphite", "hex": "#2C2D30"}, {"name": "Jet Black", "hex": "#080809"}, {"name": "Chalk White", "hex": "#F5F5F7"}]'::jsonb,
    19,
    'Consensus Edition',
    false
),
(
    'prod-04',
    'Onyx Shadow Aeromesh Zip Polo',
    'onyx-shadow-aeromesh-polo',
    'polos',
    'Technical active polo engineered with breathable micro-mesh side gussets and a rubberized storm zip placket with matte Solana hardware pull.',
    '["Matte black Solana circular insignia on chest", "Aeromesh micro-perforated side ventilation", "Concealed storm zip placket with rubberized pull", "Reflective rear hem accent"]'::jsonb,
    62.00,
    0.388,
    '["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["M", "L", "XL"]'::jsonb,
    '[{"name": "Stealth Black", "hex": "#111111"}, {"name": "Titanium Grey", "hex": "#383838"}]'::jsonb,
    26,
    'New Release',
    false
),
(
    'prod-05',
    'Validator Edition 450 GSM Heavyweight Hoodie',
    'validator-heavyweight-hoodie',
    'hoodies',
    'Ultra-heavy 450 GSM custom French Terry cotton. Built with an architectural double-lined hood, dropped shoulders, and a stealth branded Solana circular disc emblem on the chest.',
    '["3D embossed Solana circular disc emblem on chest", "450 GSM 100% Combed Organic Cotton French Terry", "Double-stitched ribbed side gussets for mobility", "Sub-second 400ms finality coordinate print on sleeve"]'::jsonb,
    85.00,
    0.531,
    '["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S", "M", "L", "XL", "XXL"]'::jsonb,
    '[{"name": "Phantom Charcoal", "hex": "#1E1E22"}, {"name": "Pure Onyx", "hex": "#0B0B0C"}, {"name": "Heather Grey", "hex": "#3A3D40"}]'::jsonb,
    28,
    'Best Seller',
    true
),
(
    'prod-06',
    'Seeker Genesis Storm-Shield Zip Hoodie',
    'seeker-genesis-zip-hoodie',
    'hoodies',
    'Designed in tribute to the Solana Seeker mobile phone. Water-resistant matte nylon shell bonded with microfleece, featuring branded Solana emblem and phone chest pouch.',
    '["Solana emblem badge heat-transferred on upper arm", "Storm-proof DWR coated exterior shell", "Ergonomic internal Seeker device pocket with magnetic closure", "Two-way YKK matte black waterproof zippers"]'::jsonb,
    89.00,
    0.556,
    '["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S", "M", "L", "XL"]'::jsonb,
    '[{"name": "Matte Stealth", "hex": "#181A1B"}, {"name": "Lunar Slate", "hex": "#4A5568"}]'::jsonb,
    15,
    'Seeker Edition',
    true
),
(
    'prod-07',
    'Sub-Second Oversized Loopback Hoodie',
    'sub-second-oversized-loopback-hoodie',
    'hoodies',
    'Relaxed drop-shoulder silhouette with heavy brushed interior. Features the branded Solana disc crest on the chest and technical architecture schematic print on the back.',
    '["Branded Solana emblem disc patch on chest", "400 GSM brushed loopback fleece", "Relaxed boxy streetwear drape", "High-density 3D tonal back graphic celebrating 400ms finality"]'::jsonb,
    79.00,
    0.494,
    '["https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["M", "L", "XL", "XXL"]'::jsonb,
    '[{"name": "Pitch Black", "hex": "#0D0E10"}, {"name": "Slate Moss", "hex": "#3B413C"}, {"name": "Vintage Ash", "hex": "#252528"}]'::jsonb,
    22,
    'Popular',
    false
),
(
    'prod-08',
    'Obsidian Stealth Modular Hoodie',
    'obsidian-stealth-modular-hoodie',
    'hoodies',
    'Futuristic technical hoodie built with magnetic hood closures, bonded utility kangaroo pockets, and high-visibility reflective Solana emblem insignia.',
    '["Reflective Solana brand insignia on left cuff", "Magnetic collar storm closure", "Concealed zip utility kangaroo pouch", "Thermal-regulating double-knit technical fleece"]'::jsonb,
    94.00,
    0.588,
    '["https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S", "M", "L", "XL"]'::jsonb,
    '[{"name": "Obsidian", "hex": "#141416"}, {"name": "Dark Iron", "hex": "#2F3136"}]'::jsonb,
    18,
    'Limited Drop',
    false
),
(
    'prod-09',
    '"Monolith" Tailored Technical Runway Suit',
    'monolith-tailored-runway-suit',
    'runway-suits',
    'Avant-garde two-piece runway suit merging bespoke Italian sartorial lines with high-performance technical fabric. Accented with a precision-cast metallic Solana emblem on the peak lapel.',
    '["Matte black Solana circular brand medallion on peak lapel", "Bonded wool-poly Italian technical twill", "Structured architectural shoulder with relaxed drape", "Pleated wide-leg trousers with concealed drawcord waistband"]'::jsonb,
    240.00,
    1.500,
    '["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S (38R)", "M (40R)", "L (42R)", "XL (44R)"]'::jsonb,
    '[{"name": "Obsidian Black", "hex": "#0A0A0C"}, {"name": "Chalk Charcoal", "hex": "#232428"}]'::jsonb,
    10,
    'Runway Exclusive',
    true
),
(
    'prod-10',
    '"Validator" Minimalist Techwear Runway Suit',
    'validator-techwear-runway-suit',
    'runway-suits',
    'High-concept runway track suit comprising a stand-collar zip blouson and articulated runway pants. Finished with rubberized Solana circular insignia on the chest.',
    '["Rubberized branded Solana emblem seal on upper chest", "Water-repellent 4-way stretch Japanese nylon ripstop", "Concealed two-way waterproof zip closures", "Articulated darting at knees for ergonomic drape"]'::jsonb,
    195.00,
    1.219,
    '["https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S", "M", "L", "XL"]'::jsonb,
    '[{"name": "Stealth Black", "hex": "#111215"}, {"name": "Slate Graphite", "hex": "#34373E"}]'::jsonb,
    14,
    'Paris Runway ’26',
    true
),
(
    'prod-11',
    '"Consensus" Double-Breasted Runway Suit',
    'consensus-double-breasted-runway-suit',
    'runway-suits',
    'Statuesque double-breasted runway statement suit. Hand-cut architectural silhouette featuring horn buttons, internal technical carry harness, and engraved Solana emblem cuff plate.',
    '["Laser-engraved Solana emblem cuff badge plate", "Contemporary relaxed 6x2 double-breasted closure", "Internal crossbody carry harness straps for post-show wear", "Double-pleated flowing runway trousers"]'::jsonb,
    280.00,
    1.750,
    '["https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S (38R)", "M (40R)", "L (42R)", "XL (44R)"]'::jsonb,
    '[{"name": "Pitch Black", "hex": "#070708"}, {"name": "Deep Midnight", "hex": "#10141E"}]'::jsonb,
    8,
    'Limited Atelier',
    false
),
(
    'prod-12',
    '"Velocity" Bonded Neoprene Runway Warmup Suit',
    'velocity-bonded-neoprene-runway-suit',
    'runway-suits',
    'Futuristic sculptural warmup suit crafted from bonded matte neoprene. Designed for post-stage athletes and crypto creators, with branded Solana emblem seal on the chest.',
    '["3D bonded Solana disc emblem seal on chest", "Ultralight 2mm aerated tech neoprene construction", "Magnetic zip storm flap and laser-welded seams", "Tapered cuff trousers with hidden ankle zips"]'::jsonb,
    220.00,
    1.375,
    '["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
    '["S", "M", "L", "XL"]'::jsonb,
    '[{"name": "Pure Onyx", "hex": "#0D0D0E"}, {"name": "Smoked White", "hex": "#E8E8EC"}]'::jsonb,
    12,
    'Futurism Drop',
    false
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    features = EXCLUDED.features,
    price_usdc = EXCLUDED.price_usdc,
    price_sol_approx = EXCLUDED.price_sol_approx,
    images = EXCLUDED.images,
    sizes = EXCLUDED.sizes,
    colors = EXCLUDED.colors,
    stock = EXCLUDED.stock,
    badge = EXCLUDED.badge,
    is_featured = EXCLUDED.is_featured;
