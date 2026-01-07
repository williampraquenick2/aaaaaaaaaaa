
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import { ShoppingCart, Leaf } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyElements, setFlyElements] = useState<{ id: number; x: number; y: number; tx: number; ty: number }[]>([]);
  const [isBouncing, setIsBouncing] = useState(false);
  
  const cartIconRef = useRef<HTMLButtonElement>(null);
  const flyCounter = useRef(0);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleFlyAnimation = (e: React.MouseEvent) => {
    if (!cartIconRef.current) return;
    
    const rect = cartIconRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;
    
    const diffX = targetX - startX;
    const diffY = targetY - startY;

    const id = flyCounter.current++;
    setFlyElements(prev => [...prev, { id, x: startX, y: startY, tx: diffX, ty: diffY }]);
    
    setTimeout(() => {
      setFlyElements(prev => prev.filter(el => el.id !== id));
    }, 700);
  };

  const categorisedProducts = {
    principais: PRODUCTS.filter(p => p.category === 'individual'),
    especiais: PRODUCTS.filter(p => p.category === 'especial'),
    combos: PRODUCTS.filter(p => p.category === 'combo'),
  };

  return (
    <div className="min-h-screen pb-40 bg-[#94b494]">
      <Header />

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-12">
        {/* Section: Catálogo */}
        <section>
          <div className="flex flex-col items-center mb-6 text-center">
            <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Nosso Catálogo</h2>
            <div className="w-12 h-1 bg-purple-700 mt-2 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categorisedProducts.principais.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onFlyStart={handleFlyAnimation}
              />
            ))}
          </div>
        </section>

        {/* Section: Temperos Especiais */}
        <section className="bg-emerald-950/10 p-6 rounded-[2rem] border border-emerald-950/10">
          <div className="flex flex-col items-center mb-6 text-center">
            <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Temperos Especiais</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categorisedProducts.especiais.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onFlyStart={handleFlyAnimation}
              />
            ))}
          </div>
        </section>

        {/* Section: Combos */}
        <section>
          <div className="flex flex-col items-center mb-6 text-center">
            <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Combos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {categorisedProducts.combos.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onFlyStart={handleFlyAnimation}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Floating Fly Elements */}
      {flyElements.map(el => (
        <div 
          key={el.id}
          className="fixed z-[999] pointer-events-none animate-fly"
          style={{ 
            left: el.x, 
            top: el.y, 
            '--tw-translate-x': `${el.tx}px`,
            '--tw-translate-y': `${el.ty}px`
          } as any}
        >
          <div className="w-8 h-8 bg-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white">
            <Leaf size={14} />
          </div>
        </div>
      ))}

      {/* Cart FAB */}
      <div className="fixed bottom-6 right-6 z-[80]">
        {totalItems > 0 && (
          <div className="absolute inset-0 bg-purple-500 rounded-full animate-pulse-ring opacity-50"></div>
        )}
        <button 
          ref={cartIconRef}
          onClick={() => setIsCartOpen(true)}
          className={`
            relative w-16 h-16 bg-emerald-950 text-white rounded-full shadow-2xl
            flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-90
            ${isBouncing ? 'scale-110 bg-purple-700' : ''}
          `}
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-emerald-950 shadow-lg animate-in zoom-in">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <footer className="mt-20 py-10 bg-emerald-950/20 text-center">
        <h3 className="text-xl font-serif font-black text-purple-900 mb-1">ALHO E SÓ</h3>
        <p className="text-emerald-950/50 text-[10px] uppercase tracking-widest font-bold">Artesanal • Puro • Natural</p>
      </footer>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;
