'use client';

import { useState, useEffect } from 'react';
import { Product, ProductColor } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { X, Check, ShieldCheck, Zap, Minus, Plus, ShoppingBag } from 'lucide-react';
import { ShoppyLogo } from './ShoppyLogo';
import Image from 'next/image';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, currency } = useCartStore();

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setSelectedImageIndex(0);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product || !selectedColor) return null;

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Dialog Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#090909] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8 text-[#f4f4f4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-zinc-400 hover:text-white border border-white/10 transition-all"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Gallery */}
          <div className="p-6 md:p-8 bg-[#111111] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black mb-4 border border-white/10">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-md bg-black/80 text-white border border-white/20">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? 'border-white scale-105' : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between bg-[#090909]">
            <div>
              {/* Category & Finality Tag */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span className="uppercase tracking-widest text-zinc-300 flex items-center gap-1.5 font-semibold">
                  <ShoppyLogo className="w-3.5 h-3.5" />
                  {product.category}
                </span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <Zap className="w-3.5 h-3.5 text-white" /> Solana Pay Enabled
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold font-mono text-white mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-bold font-mono text-white">
                  {formatPrice(product.price_usdc, currency)}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {currency === 'USDC' ? `≈ ${product.price_sol_approx} SOL` : `≈ $${product.price_usdc.toFixed(2)} USDC`}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Technical Features */}
              <div className="mb-6 space-y-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                  Technical Specifications
                </span>
                <ul className="text-xs text-zinc-400 space-y-1.5 font-sans">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-white font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Selection */}
              <div className="mb-5">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-zinc-300 uppercase tracking-wider">Color:</span>
                  <span className="text-white font-semibold">{selectedColor.name}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-white scale-110 shadow-lg ring-2 ring-white/30'
                          : 'border-white/20 opacity-80 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-zinc-300 uppercase tracking-wider">Size:</span>
                  <span className="text-zinc-400 text-[11px]">True to size fit</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-mono font-medium rounded-lg border transition-all text-center ${
                        selectedSize === size
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-[#111111] text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Quantity:
                </span>
                <div className="flex items-center border border-white/10 bg-[#111111] rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-sm text-white font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Add to Bag CTA */}
            <div>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-3.5 px-6 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-zinc-200 text-black'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>
                      Add to Bag — {formatPrice(product.price_usdc * quantity, currency)}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500 mt-3">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" /> 100% On-chain Verified
                </span>
                <span>•</span>
                <span>Free Global Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
