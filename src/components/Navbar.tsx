'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, Zap, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

export function Navbar({ onCategorySelect, selectedCategory = 'all' }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems, currency, setCurrency } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  const handleNavClick = (cat: string) => {
    if (onCategorySelect) {
      onCategorySelect(cat);
    }
    const target = document.getElementById('catalog-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-[#9945FF]/10 via-[#14F195]/10 to-[#00C2FF]/10 border-b border-zinc-800/50 py-1.5 px-4 text-center text-[11px] font-mono tracking-wider text-zinc-300 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          SOLANA DEVNET
        </span>
        <span className="hidden sm:inline text-zinc-400">|</span>
        <span className="hidden sm:inline">DEV3PACK HACKATHON BUILD</span>
        <span className="text-zinc-500">•</span>
        <span className="text-[#14F195] font-medium flex items-center gap-1">
          <Zap className="w-3 h-3" /> Sub-second checkout with Solana Pay
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9945FF] via-[#8752F4] to-[#14F195] p-[1.5px] shadow-lg shadow-[#9945FF]/20 group-hover:shadow-[#14F195]/30 transition-all">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195] text-lg tracking-tighter">
                    S
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1 font-mono">
                  SHOPPY
                  <span className="text-[10px] tracking-normal font-sans px-1.5 py-0.2 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                    LABS
                  </span>
                </span>
                <span className="text-[10px] text-zinc-400 tracking-widest uppercase font-mono">
                  Solana Athletics
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => handleNavClick('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              All Drops
            </button>
            <button
              onClick={() => handleNavClick('hoodies')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'hoodies'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              Hoodies
            </button>
            <button
              onClick={() => handleNavClick('polos')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'polos'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              Polos
            </button>
            <button
              onClick={() => handleNavClick('accessories')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                selectedCategory === 'accessories'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#14F195]" />
              Seeker Gear
            </button>
          </nav>

          {/* Action buttons (Currency switch + Cart) */}
          <div className="flex items-center gap-3">
            {/* Currency Toggle */}
            <div className="hidden sm:flex items-center bg-zinc-900/90 border border-zinc-800 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setCurrency('USDC')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                  currency === 'USDC'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                USDC
              </button>
              <button
                onClick={() => setCurrency('SOL')}
                className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                  currency === 'SOL'
                    ? 'bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                SOL
              </button>
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-300 group-hover:text-[#14F195] transition-colors" />
              <span className="text-xs font-medium font-mono hidden sm:inline">Bag</span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold font-mono rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black shadow-md shadow-[#9945FF]/40 animate-in zoom-in duration-200">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs">
            <span className="text-zinc-400 font-mono">Currency Preference:</span>
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setCurrency('USDC')}
                className={`px-2.5 py-1 rounded ${currency === 'USDC' ? 'bg-blue-600 text-white' : 'text-zinc-400'}`}
              >
                USDC
              </button>
              <button
                onClick={() => setCurrency('SOL')}
                className={`px-2.5 py-1 rounded ${currency === 'SOL' ? 'bg-[#14F195] text-black' : 'text-zinc-400'}`}
              >
                SOL
              </button>
            </div>
          </div>
          <button
            onClick={() => handleNavClick('all')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-zinc-200 hover:bg-zinc-900"
          >
            All Drops
          </button>
          <button
            onClick={() => handleNavClick('hoodies')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-zinc-200 hover:bg-zinc-900"
          >
            Hoodies (Heavyweight & Zip)
          </button>
          <button
            onClick={() => handleNavClick('polos')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-zinc-200 hover:bg-zinc-900"
          >
            Polo Shirts (Performance Piqué)
          </button>
          <button
            onClick={() => handleNavClick('accessories')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-[#14F195] hover:bg-zinc-900 flex items-center justify-between"
          >
            <span>Seeker Edition Gear</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
