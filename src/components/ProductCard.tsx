'use client';

import { useState } from 'react';
import { Product, ProductColor } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { Plus, Check, Eye } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, currency } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedSize, selectedColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div
      onClick={() => onOpenModal(product)}
      className="group relative flex flex-col bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-white/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-black">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase rounded bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-md">
              {product.badge}
            </span>
          </div>
        )}

        {/* Branded Solana Emblem */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-md">
          <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
            <Image
              src="/solana-logo.png"
              alt="Solana Authentic Brand Seal"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[9px] font-mono tracking-wider font-semibold uppercase text-zinc-300">
            Solana
          </span>
        </div>

        {/* Bottom corner garment insignia watermark */}
        <div className="absolute bottom-3 left-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none">
          <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden">
            <Image
              src="/solana-logo.png"
              alt="Solana Brand Mark"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[8px] font-mono tracking-widest uppercase text-white/80 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
            PAY NATIVE
          </span>
        </div>

        {/* Hover Quick View Overlay button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/20 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-white" /> Quick Inspect
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category & Stock */}
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
          <span>
            {product.category === 'polos'
              ? 'Polo Shirt'
              : product.category === 'hoodies'
              ? 'Heavyweight Hoodie'
              : 'Runway Suit'}
          </span>
          <span className="text-zinc-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            In Stock ({product.stock})
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-white group-hover:text-zinc-200 line-clamp-1 mb-2 font-mono">
          {product.name}
        </h3>

        {/* Color swatches preview */}
        <div className="flex items-center gap-1.5 mb-3">
          {product.colors.map(col => (
            <button
              key={col.name}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(col);
              }}
              style={{ backgroundColor: col.hex }}
              title={col.name}
              className={`w-3.5 h-3.5 rounded-full border transition-all ${
                selectedColor.name === col.name
                  ? 'border-white scale-125 shadow-sm'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            />
          ))}
          <span className="text-[11px] text-zinc-500 font-mono ml-1">
            {selectedColor.name}
          </span>
        </div>

        {/* Size pills */}
        <div className="flex items-center gap-1 mb-4 flex-wrap" onClick={(e) => e.stopPropagation()}>
          {product.sizes.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-colors ${
                selectedSize === size
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold font-mono text-white">
              {formatPrice(product.price_usdc, currency)}
            </div>
            {currency === 'USDC' ? (
              <div className="text-[10px] font-mono text-zinc-500">
                ≈ {product.price_sol_approx} SOL
              </div>
            ) : (
              <div className="text-[10px] font-mono text-zinc-500">
                ≈ ${product.price_usdc.toFixed(2)} USDC
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              isAdded
                ? 'bg-white text-black font-semibold'
                : 'bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
