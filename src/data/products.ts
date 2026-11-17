import { Product } from '@/types';

export const SOL_PRICE_USD = 160;

export const PRODUCTS: Product[] = [
  // ==========================================
  // POLOS (4 Items)
  // ==========================================
  {
    id: 'prod-01',
    name: 'Genesis Engineered Tech Polo',
    slug: 'genesis-engineered-tech-polo',
    category: 'polos',
    description: 'Precision-tailored performance polo woven from recycled tech-fibers with high-density micro-pique knit. Features an authentic thermal-bonded Solana circular emblem on the chest.',
    features: [
      'Authentic high-density silicone Solana emblem heat-pressed on chest',
      'Moisture-wicking Aerotech™ stretch fabric',
      'Bonded seam construction with laser-cut hem',
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
      { name: 'Off-White', hex: '#F4F4F6' },
      { name: 'Charcoal Slate', hex: '#2A2D34' }
    ],
    stock: 24,
    badge: 'Flagship Drop',
    is_featured: true,
  },
  {
    id: 'prod-02',
    name: 'Breakpoint Piqué Performance Polo',
    slug: 'breakpoint-pique-polo',
    category: 'polos',
    description: 'A modern sporting polo crafted from lightweight honeycomb airflow knit. Features a laser-etched Solana brand crest on the sleeve cuff and stay-flat magnetic collar.',
    features: [
      'Precision laser-etched Solana disc crest on left sleeve',
      'Engineered honeycomb piqué airflow weave',
      'Hidden stay-flat magnetic collar stay',
      'Anti-odor silver yarn technology'
    ],
    price_usdc: 52.00,
    price_sol_approx: +(52.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1625910513413-568393c5eb29?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure Onyx', hex: '#0D0E10' },
      { name: 'Arctic White', hex: '#FFFFFF' },
      { name: 'Navy Slate', hex: '#101B2B' }
    ],
    stock: 32,
    badge: 'Breakpoint ’25',
    is_featured: false,
  },
  {
    id: 'prod-03',
    name: 'Consensus Supima Luxury Polo',
    slug: 'consensus-supima-classic-polo',
    category: 'polos',
    description: 'Crafted from 100% extra-long staple American Supima cotton. Unrivaled handfeel, natural drape, and understated tonal embroidered Solana circular insignia.',
    features: [
      'Tonal embroidered circular Solana insignia on breast',
      '100% Extra-long staple American Supima cotton',
      'Natural horn buttons with laser-engraved monogram',
      'Reinforced split hem with herringbone tape'
    ],
    price_usdc: 58.00,
    price_sol_approx: +(58.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Heather Graphite', hex: '#2C2D30' },
      { name: 'Jet Black', hex: '#080809' },
      { name: 'Chalk White', hex: '#F5F5F7' }
    ],
    stock: 19,
    badge: 'Consensus Edition',
    is_featured: false,
  },
  {
    id: 'prod-04',
    name: 'Onyx Shadow Aeromesh Zip Polo',
    slug: 'onyx-shadow-aeromesh-polo',
    category: 'polos',
    description: 'Technical active polo engineered with breathable micro-mesh side gussets and a rubberized storm zip placket with matte Solana hardware pull.',
    features: [
      'Matte black Solana circular insignia on chest',
      'Aeromesh micro-perforated side ventilation',
      'Concealed storm zip placket with rubberized pull',
      'Reflective rear hem accent'
    ],
    price_usdc: 62.00,
    price_sol_approx: +(62.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Stealth Black', hex: '#111111' },
      { name: 'Titanium Grey', hex: '#383838' }
    ],
    stock: 26,
    badge: 'New Release',
    is_featured: false,
  },

  // ==========================================
  // HOODIES (4 Items)
  // ==========================================
  {
    id: 'prod-05',
    name: 'Validator Edition 450 GSM Heavyweight Hoodie',
    slug: 'validator-heavyweight-hoodie',
    category: 'hoodies',
    description: 'Ultra-heavy 450 GSM custom French Terry cotton. Built with an architectural double-lined hood, dropped shoulders, and a stealth branded Solana circular disc emblem on the chest.',
    features: [
      '3D embossed Solana circular disc emblem on chest',
      '450 GSM 100% Combed Organic Cotton French Terry',
      'Double-stitched ribbed side gussets for mobility',
      'Sub-second 400ms finality coordinate print on sleeve'
    ],
    price_usdc: 85.00,
    price_sol_approx: +(85.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Phantom Charcoal', hex: '#1E1E22' },
      { name: 'Pure Onyx', hex: '#0B0B0C' },
      { name: 'Heather Grey', hex: '#3A3D40' }
    ],
    stock: 28,
    badge: 'Best Seller',
    is_featured: true,
  },
  {
    id: 'prod-06',
    name: 'Seeker Genesis Storm-Shield Zip Hoodie',
    slug: 'seeker-genesis-zip-hoodie',
    category: 'hoodies',
    description: 'Designed in tribute to the Solana Seeker mobile phone. Water-resistant matte nylon shell bonded with microfleece, featuring branded Solana emblem and phone chest pouch.',
    features: [
      'Solana emblem badge heat-transferred on upper arm',
      'Storm-proof DWR coated exterior shell',
      'Ergonomic internal Seeker device pocket with magnetic closure',
      'Two-way YKK matte black waterproof zippers'
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
    stock: 15,
    badge: 'Seeker Edition',
    is_featured: true,
  },
  {
    id: 'prod-07',
    name: 'Sub-Second Oversized Loopback Hoodie',
    slug: 'sub-second-oversized-loopback-hoodie',
    category: 'hoodies',
    description: 'Relaxed drop-shoulder silhouette with heavy brushed interior. Features the branded Solana disc crest on the chest and technical architecture schematic print on the back.',
    features: [
      'Branded Solana emblem disc patch on chest',
      '400 GSM brushed loopback fleece',
      'Relaxed boxy streetwear drape',
      'High-density 3D tonal back graphic celebrating 400ms finality'
    ],
    price_usdc: 79.00,
    price_sol_approx: +(79.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', hex: '#0D0E10' },
      { name: 'Slate Moss', hex: '#3B413C' },
      { name: 'Vintage Ash', hex: '#252528' }
    ],
    stock: 22,
    badge: 'Popular',
    is_featured: false,
  },
  {
    id: 'prod-08',
    name: 'Obsidian Stealth Modular Hoodie',
    slug: 'obsidian-stealth-modular-hoodie',
    category: 'hoodies',
    description: 'Futuristic technical hoodie built with magnetic hood closures, bonded utility kangaroo pockets, and high-visibility reflective Solana emblem insignia.',
    features: [
      'Reflective Solana brand insignia on left cuff',
      'Magnetic collar storm closure',
      'Concealed zip utility kangaroo pouch',
      'Thermal-regulating double-knit technical fleece'
    ],
    price_usdc: 94.00,
    price_sol_approx: +(94.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian', hex: '#141416' },
      { name: 'Dark Iron', hex: '#2F3136' }
    ],
    stock: 18,
    badge: 'Limited Drop',
    is_featured: false,
  },

  // ==========================================
  // RUNWAY SUITS (4 Items)
  // ==========================================
  {
    id: 'prod-09',
    name: '"Monolith" Tailored Technical Runway Suit',
    slug: 'monolith-tailored-runway-suit',
    category: 'runway-suits',
    description: 'Avant-garde two-piece runway suit merging bespoke Italian sartorial lines with high-performance technical fabric. Accented with a precision-cast metallic Solana emblem on the peak lapel.',
    features: [
      'Matte black Solana circular brand medallion on peak lapel',
      'Bonded wool-poly Italian technical twill',
      'Structured architectural shoulder with relaxed drape',
      'Pleated wide-leg trousers with concealed drawcord waistband'
    ],
    price_usdc: 240.00,
    price_sol_approx: +(240.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S (38R)', 'M (40R)', 'L (42R)', 'XL (44R)'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0C' },
      { name: 'Chalk Charcoal', hex: '#232428' }
    ],
    stock: 10,
    badge: 'Runway Exclusive',
    is_featured: true,
  },
  {
    id: 'prod-10',
    name: '"Validator" Minimalist Techwear Runway Suit',
    slug: 'validator-techwear-runway-suit',
    category: 'runway-suits',
    description: 'High-concept runway track suit comprising a stand-collar zip blouson and articulated runway pants. Finished with rubberized Solana circular insignia on the chest.',
    features: [
      'Rubberized branded Solana emblem seal on upper chest',
      'Water-repellent 4-way stretch Japanese nylon ripstop',
      'Concealed two-way waterproof zip closures',
      'Articulated darting at knees for ergonomic drape'
    ],
    price_usdc: 195.00,
    price_sol_approx: +(195.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Stealth Black', hex: '#111215' },
      { name: 'Slate Graphite', hex: '#34373E' }
    ],
    stock: 14,
    badge: 'Paris Runway ’26',
    is_featured: true,
  },
  {
    id: 'prod-11',
    name: '"Consensus" Double-Breasted Runway Suit',
    slug: 'consensus-double-breasted-runway-suit',
    category: 'runway-suits',
    description: 'Statuesque double-breasted runway statement suit. Hand-cut architectural silhouette featuring horn buttons, internal technical carry harness, and engraved Solana emblem cuff plate.',
    features: [
      'Laser-engraved Solana emblem cuff badge plate',
      'Contemporary relaxed 6x2 double-breasted closure',
      'Internal crossbody carry harness straps for post-show wear',
      'Double-pleated flowing runway trousers'
    ],
    price_usdc: 280.00,
    price_sol_approx: +(280.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S (38R)', 'M (40R)', 'L (42R)', 'XL (44R)'],
    colors: [
      { name: 'Pitch Black', hex: '#070708' },
      { name: 'Deep Midnight', hex: '#10141E' }
    ],
    stock: 8,
    badge: 'Limited Atelier',
    is_featured: false,
  },
  {
    id: 'prod-12',
    name: '"Velocity" Bonded Neoprene Runway Warmup Suit',
    slug: 'velocity-bonded-neoprene-runway-suit',
    category: 'runway-suits',
    description: 'Futuristic sculptural warmup suit crafted from bonded matte neoprene. Designed for post-stage athletes and crypto creators, with branded Solana emblem seal on the chest.',
    features: [
      '3D bonded Solana disc emblem seal on chest',
      'Ultralight 2mm aerated tech neoprene construction',
      'Magnetic zip storm flap and laser-welded seams',
      'Tapered cuff trousers with hidden ankle zips'
    ],
    price_usdc: 220.00,
    price_sol_approx: +(220.00 / SOL_PRICE_USD).toFixed(3),
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure Onyx', hex: '#0D0D0E' },
      { name: 'Smoked White', hex: '#E8E8EC' }
    ],
    stock: 12,
    badge: 'Futurism Drop',
    is_featured: false,
  }
];
