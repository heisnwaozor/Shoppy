import { Product } from '@/types';

export const SOL_PRICE_USD = 160;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Genesis Engineered Tech Polo',
    slug: 'genesis-engineered-tech-polo',
    category: 'polos',
    description: 'Precision-tailored performance polo woven from recycled tech-fibers with high-density micro-pique knit. Features subtle Solana ultraviolet accent threading on the collar.',
    features: [
      'Moisture-wicking Aerotech™ stretch fabric',
      'Bonded seam construction with laser-cut hem',
      'Minimalist Solana ultraviolet micro-tag',
      'UPF 50+ UV solar protection'
    ],
    price_usdc: 49.00,
    price_sol_approx: +(49.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Black', hex: '#121214' },
      { name: 'Solana Purple', hex: '#9945FF' },
      { name: 'Carbon Grey', hex: '#2A2D34' }
    ],
    stock: 24,
    badge: 'Flagship Drop',
    is_featured: true,
  },
  {
    id: 'prod-02',
    name: 'Validator Edition 450 GSM Heavyweight Hoodie',
    slug: 'validator-heavyweight-hoodie',
    category: 'hoodies',
    description: 'Ultra-heavy 450 GSM custom French Terry cotton. Built with an architectural double-lined hood, dropped shoulders, and a stealth iridescent Solana gradient sleeve insignia.',
    features: [
      '450 GSM 100% Combed Organic Cotton',
      'Double-stitched ribbed side gussets for mobility',
      'Hidden kangaroo pocket with internal zippered key pouch',
      'Heat-transferred holographic validator badge'
    ],
    price_usdc: 85.00,
    price_sol_approx: +(85.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Phantom Charcoal', hex: '#1E1E22' },
      { name: 'Cyber Teal', hex: '#14F195' },
      { name: 'Pure Onyx', hex: '#0B0B0C' }
    ],
    stock: 18,
    badge: 'Best Seller',
    is_featured: true,
  },
  {
    id: 'prod-03',
    name: 'Seeker Genesis Storm-Shield Zip Hoodie',
    slug: 'seeker-genesis-zip-hoodie',
    category: 'hoodies',
    description: 'Designed in tribute to Solana Seeker mobile. Water-resistant matte nylon shell bonded with soft microfleece. Engineered with dedicated secure mobile phone pocket and rubberized pulls.',
    features: [
      'Storm-proof DWR coated exterior shell',
      'Ergonomic internal Seeker device pocket with magnetic closure',
      'Two-way YKK matte black waterproof zippers',
      'Reflective Solana gradient heat seals'
    ],
    price_usdc: 89.00,
    price_sol_approx: +(89.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Matte Stealth', hex: '#181A1B' },
      { name: 'Lunar Slate', hex: '#4A5568' }
    ],
    stock: 12,
    badge: 'Seeker Edition',
    is_featured: true,
  },
  {
    id: 'prod-04',
    name: 'Breakpoint Piqué Performance Polo',
    slug: 'breakpoint-pique-polo',
    category: 'polos',
    description: 'A modern sporting polo crafted from lightweight honeycomb knit. Subtle contrast placket in Solana cyan with magnetic closure and clean laser-engraved buttons.',
    features: [
      'Engineered honeycomb piqué airflow weave',
      'Hidden stay-flat magnetic collar stay',
      'Anti-odor silver yarn technology',
      'Tailored athletic taper fit'
    ],
    price_usdc: 52.00,
    price_sol_approx: +(52.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1625910513413-568393c5eb29?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight Navy', hex: '#101B2B' },
      { name: 'Pure White', hex: '#F8FAFC' },
      { name: 'Solana Gradient', hex: '#9945FF' }
    ],
    stock: 30,
    badge: 'New Season',
    is_featured: false,
  },
  {
    id: 'prod-05',
    name: 'Sub-Second Oversized Fleece Hoodie',
    slug: 'sub-second-oversized-fleece',
    category: 'hoodies',
    description: 'Relaxed drop-shoulder silhouette with heavy brushed interior. Back typography commemorates "400ms Sub-Second Finality" in subtle reflective print.',
    features: [
      '400 GSM brushed loopback fleece',
      'Relaxed boxy streetwear drape',
      'High-density 3D tonal back graphic',
      'Pre-shrunk organic wash'
    ],
    price_usdc: 79.00,
    price_sol_approx: +(79.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Pitch Black', hex: '#0D0E10' },
      { name: 'Heather Moss', hex: '#3B413C' }
    ],
    stock: 20,
    badge: 'Popular',
    is_featured: false,
  },
  {
    id: 'prod-06',
    name: 'Consensus Supima Cotton Classic Polo',
    slug: 'consensus-supima-classic-polo',
    category: 'polos',
    description: 'Crafted from 100% extra-long staple American Supima cotton. Unrivaled softness, deep color retention, and an understated tonal Solana crest embroidery.',
    features: [
      '100% Premium American Supima cotton',
      'Mother-of-pearl engraved buttons',
      'Reinforced split hem with herringbone tape',
      'Pre-washed for zero shrinkage'
    ],
    price_usdc: 48.00,
    price_sol_approx: +(48.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Dark Heather Grey', hex: '#2C2D30' },
      { name: 'Solana Teal', hex: '#14F195' },
      { name: 'Deep Space Navy', hex: '#0F172A' }
    ],
    stock: 15,
    is_featured: false,
  },
  {
    id: 'prod-07',
    name: 'Zero-Gas Boxy Cropped Hoodie',
    slug: 'zero-gas-boxy-cropped-hoodie',
    category: 'hoodies',
    description: 'Contemporary boxy, raw-hem streetwear cut. Custom garment-dyed wash gives every piece a unique patina. Accented with subtle purple contrast stitch along the cuffs.',
    features: [
      '380 GSM garment-dyed French Terry',
      'Raw edge waist hem with stay-stitch reinforcement',
      'Dropped shoulder seam styling',
      'Ultra-soft brushed peach skin handfeel'
    ],
    price_usdc: 75.00,
    price_sol_approx: +(75.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Vintage Washed Black', hex: '#232325' },
      { name: 'Solana Violet', hex: '#7C3AED' }
    ],
    stock: 16,
    badge: 'Limited Drop',
    is_featured: false,
  },
  {
    id: 'prod-08',
    name: 'Seeker 5-Panel Water-Repellent Cap',
    slug: 'seeker-5-panel-cap',
    category: 'accessories',
    description: 'Technical 5-panel unstructured cap made with water-resistant ripstop nylon. Fitted with a quick-release magnetic Fidlock buckle and iridescent Solana icon on the brow.',
    features: [
      'Ultra-durable micro-ripstop nylon weave',
      'German engineered magnetic slider buckle',
      'Absorbent moisture-wicking sweatband',
      'Flexible packable visor'
    ],
    price_usdc: 35.00,
    price_sol_approx: +(35.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['One Size (Adjustable)'],
    colors: [
      { name: 'Matte Black', hex: '#111215' },
      { name: 'Storm Grey', hex: '#374151' }
    ],
    stock: 45,
    badge: 'Essential',
    is_featured: false,
  }
];
