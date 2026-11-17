'use client';

import { ArrowDown, QrCode, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export function HeroBanner({ onExploreClick }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-800/80">
      {/* Background ambient glow effects */}
      <div className="absolute top-0 left-1/4 -z-10 w-96 h-96 bg-[#9945FF]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -z-10 w-96 h-96 bg-[#14F195]/10 rounded-full blur-[130px] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-xs font-mono mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] animate-pulse"></span>
            <span className="text-zinc-300 font-medium">SHOPPY WINTER &lsquo;26 DROP</span>
            <span className="text-zinc-600">/</span>
            <span className="text-[#14F195] flex items-center gap-1 font-semibold">
              <Zap className="w-3 h-3" /> Solana Pay Ready
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6 font-mono">
            PRECISION FIT. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              FINALIZED IN
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] via-[#c084fc] to-[#14F195]">
              400MS.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed max-w-2xl mb-8">
            Engineered streetwear designed for builders, validators, and creators. 
            450 GSM French Terry hoodies and performance technical polos with 
            instant, zero-middleman checkout powered by <span className="text-white font-medium">Solana Pay</span>.
          </p>

          {/* Call to actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#9945FF] via-[#7C3AED] to-[#14F195] text-black font-bold font-mono text-sm tracking-wide shadow-lg shadow-[#9945FF]/25 hover:shadow-[#14F195]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowDown className="w-4 h-4 text-black" />
            </button>

            <a
              href="#solana-pay-features"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white font-mono text-xs tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-[#14F195]" />
              <span>HOW SOLANA PAY WORKS</span>
            </a>
          </div>

          {/* Feature Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mt-14 pt-10 border-t border-zinc-800/80">
            <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <span className="text-xs font-mono text-zinc-400">Confirmation</span>
              <span className="text-lg sm:text-xl font-bold font-mono text-white flex items-center gap-1 mt-0.5">
                <span className="text-[#14F195]">~400</span> ms
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Sub-second finality</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <span className="text-xs font-mono text-zinc-400">Payment Fee</span>
              <span className="text-lg sm:text-xl font-bold font-mono text-white flex items-center gap-1 mt-0.5">
                <span className="text-[#14F195]">&lt; $0.001</span>
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Zero 3% credit card tax</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <span className="text-xs font-mono text-zinc-400">Currency</span>
              <span className="text-lg sm:text-xl font-bold font-mono text-white flex items-center gap-1 mt-0.5">
                USDC <span className="text-zinc-400 text-xs font-normal">+ SOL</span>
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Direct merchant transfer</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <span className="text-xs font-mono text-zinc-400">Mobile Ready</span>
              <span className="text-lg sm:text-xl font-bold font-mono text-white flex items-center gap-1 mt-0.5">
                Seeker <Sparkles className="w-3.5 h-3.5 text-[#14F195]" />
              </span>
              <span className="text-[10px] text-zinc-400 mt-0.5">Solana Mobile optimized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
