'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product, Category } from '@/types';
import { PRODUCTS } from '@/data/products';
import { getProducts } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { Search, SlidersHorizontal, Sparkles, QrCode, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load products (Supabase or fallback seed)
  useEffect(() => {
    async function loadData() {
      const data = await getProducts();
      setProducts(data);
    }
    loadData();
  }, []);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' ? true : p.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === ''
            ? true
            : p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price_usdc - b.price_usdc;
        if (sortBy === 'price-desc') return b.price_usdc - a.price_usdc;
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
      {/* Top Navbar */}
      <Navbar
        selectedCategory={selectedCategory}
        onCategorySelect={(cat) => setSelectedCategory(cat as Category)}
      />

      {/* Editorial Banner Link */}
      <div className="bg-zinc-900/60 border-b border-zinc-800 py-2 px-4 text-center text-xs font-mono text-zinc-400 flex items-center justify-center gap-2">
        <span>Looking for our flagship design agency landing page?</span>
        <Link href="/" className="text-[#14F195] hover:underline flex items-center gap-1 font-semibold">
          Visit Orvante Editorial Studio ↗
        </Link>
      </div>

      {/* Hero Header Section */}
      <HeroBanner onExploreClick={handleScrollToCatalog} />

      {/* Main Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Controls Bar: Category Pills + Search + Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-zinc-800/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              All Drops ({products.length})
            </button>
            <button
              onClick={() => setSelectedCategory('hoodies')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'hoodies'
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              Hoodies
            </button>
            <button
              onClick={() => setSelectedCategory('polos')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'polos'
                  ? 'bg-white text-black shadow-lg shadow-white/10'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              Polos
            </button>
            <button
              onClick={() => setSelectedCategory('accessories')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'accessories'
                  ? 'bg-[#14F195] text-black shadow-lg shadow-[#14F195]/20 font-bold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9945FF]" />
              Seeker Gear
            </button>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-400 focus:outline-none focus:border-[#14F195] transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-zinc-900/80 border border-zinc-800 rounded-xl pl-3 pr-8 py-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-[#14F195] transition-colors cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/80">
            <p className="font-mono text-sm text-zinc-400 mb-2">No apparel matched your filters</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-[#14F195] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        )}

        {/* Feature Explainer Section: How Solana Pay Works */}
        <section id="solana-pay-features" className="mt-28 pt-16 border-t border-zinc-800/80">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9945FF]/10 text-[#c084fc] text-xs font-mono mb-3 border border-[#9945FF]/20">
              <Zap className="w-3.5 h-3.5" /> HOW SHOPPY WORKS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mb-3">
              The Next Evolution of Digital Commerce
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Traditional stores charge 3% credit card fees and take 3 business days to settle. 
              Shoppy uses official Solana Pay standards for instant, peer-to-peer settlement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                <QrCode className="w-5 h-5 text-[#14F195]" />
              </div>
              <h3 className="font-mono text-base font-semibold text-white mb-2">
                1. Dynamic Solana Pay QR
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Every cart checkout generates a unique one-time Ed25519 reference public key. Scan directly with Phantom or Solflare on your mobile device.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-[#9945FF]" />
              </div>
              <h3 className="font-mono text-base font-semibold text-white mb-2">
                2. Sub-Second RPC Detection
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Our poller listens to Solana Devnet RPC websocket. Within ~400ms of signing on your phone, the desktop checkout screen transitions automatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-mono text-base font-semibold text-white mb-2">
                3. On-Chain Order Proof
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Your order is confirmed immutably on Solana and synchronized in realtime with Supabase. Zero chargebacks, zero fraud, 100% cryptographic proof.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
