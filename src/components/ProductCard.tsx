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
      className="group relative flex flex-col bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/60 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
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
            <span className="px-2.5 py-1 text-[11px] font-mono font-semibold tracking-wide uppercase rounded-md bg-black/80 backdrop-blur-md text-white border border-zinc-700/80 shadow-md">
              {product.badge}
            </span>
          </div>
        )}

        {/* Hover Quick View Overlay button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md text-zinc-200 text-xs font-mono font-medium border border-zinc-700 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#14F195]" /> Quick Inspect
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category & Stock */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
          <span className="uppercase tracking-wider">
            {product.category === 'polos' ? 'Polo Shirt' : product.category === 'hoodies' ? 'Heavyweight Hoodie' : 'Technical Gear'}
          </span>
          <span className="text-emerald-400/90 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            In Stock ({product.stock})
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base text-white group-hover:text-zinc-200 line-clamp-1 mb-2 font-mono">
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
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedColor.name === col.name
                  ? 'border-white scale-125 shadow-sm'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            />
          ))}
          <span className="text-[11px] text-zinc-400 font-mono ml-1">
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
                  ? 'bg-zinc-200 text-black border-white font-bold'
                  : 'bg-zinc-800/80 text-zinc-400 border-zinc-700/60 hover:text-white hover:border-zinc-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-auto pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="text-base font-bold font-mono text-white">
              {formatPrice(product.price_usdc, currency)}
            </div>
            {currency === 'USDC' ? (
              <div className="text-[11px] font-mono text-zinc-400">
                ≈ {product.price_sol_approx} SOL
              </div>
            ) : (
              <div className="text-[11px] font-mono text-zinc-400">
                ≈ ${product.price_usdc.toFixed(2)} USDC
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              isAdded
                ? 'bg-emerald-500 text-black font-semibold'
                : 'bg-zinc-800 hover:bg-gradient-to-r hover:from-[#9945FF] hover:to-[#14F195] text-zinc-200 hover:text-black border border-zinc-700 hover:border-transparent'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
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
