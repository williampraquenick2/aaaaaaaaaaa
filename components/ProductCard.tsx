
import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Minus, ShoppingCart, Leaf } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onFlyStart: (event: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onFlyStart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAdd = (e: React.MouseEvent) => {
    setIsAdding(true);
    onFlyStart(e);
    onAddToCart(product, quantity);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const isCombo = product.category === 'combo';

  return (
    <div className={`
      relative rounded-[2rem] overflow-hidden transition-all duration-500 border 
      ${isAdding 
        ? 'bg-emerald-100 border-emerald-200 scale-[1.03] shadow-2xl z-10' 
        : 'bg-white/95 border-emerald-900/10 shadow-sm hover:shadow-xl'
      } 
      flex flex-col h-full group
    `}>
      {/* Product Image */}
      <div className="relative h-28 sm:h-36 w-full overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isAdding ? 'opacity-50' : ''}`}
        />
        {isCombo && (
          <div className="absolute top-2 left-2 bg-purple-700 text-white text-[7px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Combo Econômico
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-0.5 gap-1">
          <h3 className="font-bold text-emerald-950 text-[11px] sm:text-[13px] leading-tight">
            {product.name}
          </h3>
          <span className="text-emerald-800 font-black text-[11px] sm:text-[13px]">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
        
        {product.weight && (
          <p className="text-purple-600/70 text-[9px] font-bold mb-1.5 uppercase tracking-tight">{product.weight}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-emerald-900/5">
          <div className="flex items-center bg-emerald-900/5 rounded-xl p-0.5 border border-emerald-900/10">
            <button 
              onClick={handleDecrement}
              className="p-1 text-emerald-600 hover:text-emerald-900 transition-colors rounded-lg"
            >
              <Minus size={10} />
            </button>
            <span className="w-4 text-center text-[10px] font-black text-emerald-950">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="p-1 text-emerald-600 hover:text-emerald-900 transition-colors rounded-lg"
            >
              <Plus size={10} />
            </button>
          </div>
          
          <button 
            onClick={handleAdd}
            disabled={isAdding}
            className={`
              flex-grow flex items-center justify-center gap-1.5 font-black py-2 px-3 rounded-xl transition-all active:scale-95
              ${isAdding 
                ? 'bg-emerald-500 text-white' 
                : 'bg-purple-700 hover:bg-emerald-800 text-white shadow-lg'
              }
            `}
          >
            {isAdding ? (
              <Leaf size={12} className="animate-bounce" />
            ) : (
              <>
                <ShoppingCart size={12} />
                <span className="text-[10px] uppercase tracking-wider">Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
