import { Zap, Shield, Database } from 'lucide-react';
import { ShoppyLogo } from './ShoppyLogo';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#090909] py-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <ShoppyLogo className="w-7 h-7" />
              <span className="font-mono font-bold text-base text-white tracking-wider">
                SHOPPY
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Solana apparel e-commerce powered by Solana Pay sub-second settlement and Supabase realtime order state. Built for the Dev3pack Hackathon.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>Devnet Network Active</span>
            </div>
          </div>

          {/* Hackathon Specs */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Hackathon Tracks
            </h4>
            <ul className="text-xs space-y-1.5 font-sans">
              <li className="flex items-center gap-1.5 text-zinc-300">
                <Zap className="w-3.5 h-3.5 text-white" />
                Solana Pay & Consumer Apps
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <Database className="w-3.5 h-3.5 text-white" />
                Supabase Sponsor Integration
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <Shield className="w-3.5 h-3.5 text-white" />
                Solana Mobile / Seeker Ready
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Architecture
            </h4>
            <ul className="text-xs space-y-1.5 font-mono text-zinc-400">
              <li>Next.js 16 (App Router + Turbopack)</li>
              <li>Tailwind CSS v4 & Strict Monochrome</li>
              <li>@solana/pay & @solana/web3.js</li>
              <li>Zustand State Store (Persisted)</li>
              <li>Supabase Database & Realtime</li>
            </ul>
          </div>

          {/* Verification & Compliance */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Solana Pay Spec
            </h4>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Every checkout generates an ephemeral Ed25519 reference public key. Zero custody, peer-to-peer transaction verification directly against Solana RPC nodes.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#111111] border border-white/10 text-[10px] font-mono text-zinc-300">
                Standard: solana:&lt;recipient&gt;?reference=...
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <p>© 2026 Shoppy Labs — Built for Dev3pack Solana Hackathon.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Speed: ~400ms TPS</span>
            <span>•</span>
            <span>USDC & SOL Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
