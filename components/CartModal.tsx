
import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { X, Trash2, ShoppingBag, Leaf, ChevronRight, Gift, CheckCircle2, ArrowLeft } from 'lucide-react';
import { SHIPPING_FEE, WHATSAPP_NUMBER, PRODUCTS } from '../constants';

interface CartModalProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({ items, isOpen, onClose, onRemove }) => {
  const [showUpsell, setShowUpsell] = useState(false);
  const [selectedUpsell, setSelectedUpsell] = useState<Product | null>(null);

  if (!isOpen) return null;

  const baseSubtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const upsellPrice = selectedUpsell ? selectedUpsell.price : 0;
  const subtotal = baseSubtotal + upsellPrice;
  
  const currentShipping = selectedUpsell ? 0 : SHIPPING_FEE;
  const total = subtotal + currentShipping;

  const upsellOptions = [
    PRODUCTS.find(p => p.id === 'tempero-completo'),
    PRODUCTS.find(p => p.id === 'alho-puro-500'),
    PRODUCTS.find(p => p.id === 'alho-puro-250'),
  ].filter(Boolean) as Product[];

  const handleSendMessage = (withUpsell: boolean = false) => {
    let orderList = items.map(item => `• ${item.quantity}x ${item.name} ${item.weight || ''} - R$ ${(item.price * item.quantity).toFixed(2)}`);
    
    let finalShipping = SHIPPING_FEE;
    let finalTotal = baseSubtotal + SHIPPING_FEE;

    if (withUpsell && selectedUpsell) {
      orderList.push(`• 1x ${selectedUpsell.name} ${selectedUpsell.weight || ''} (OFERTA) - R$ ${selectedUpsell.price.toFixed(2)}`);
      finalShipping = 0;
      finalTotal = baseSubtotal + selectedUpsell.price;
    }

    const message = `*PEDIDO ALHO E SÓ*%0A%0A` +
      orderList.join('%0A') +
      `%0A%0A*Resumo:*%0A` +
      `Subtotal: R$ ${(baseSubtotal + (withUpsell && selectedUpsell ? selectedUpsell.price : 0)).toFixed(2)}%0A` +
      `Frete: ${finalShipping === 0 ? 'GRÁTIS (Super Oferta!)' : `R$ ${finalShipping.toFixed(2)}`}%0A` +
      `*Total do Pedido: R$ ${finalTotal.toFixed(2)}*%0A%0A` +
      `_Colhido e preparado com carinho!_`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleClose = () => {
    setShowUpsell(false);
    setSelectedUpsell(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-emerald-950/40 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-[#f0f4f0] w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-emerald-900/10 bg-white">
          <div className="flex items-center gap-2">
            {showUpsell && (
              <button onClick={() => setShowUpsell(false)} className="p-1 text-emerald-800">
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-lg font-black text-emerald-950">
              {showUpsell ? 'Super Oferta' : 'Meu Carrinho'}
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 bg-emerald-100 text-emerald-800 rounded-full">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto px-4 py-4 scroll-hide">
          {!showUpsell ? (
            items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={32} className="text-emerald-800/20 mx-auto mb-3" />
                <p className="text-emerald-800/40 text-xs font-bold">Carrinho vazio</p>
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm border border-emerald-900/5">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-emerald-950 text-xs leading-tight">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-emerald-900/20 hover:text-rose-400">
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-1">
                        <p className="text-[10px] text-emerald-800/40">{item.quantity}x {item.weight}</p>
                        <span className="font-black text-purple-700 text-xs">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* UPSELL VIEW */
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-6 bg-purple-900 rounded-[1.5rem] border border-purple-800 shadow-xl text-center mb-4">
                <Gift size={32} className="text-white mx-auto mb-3" />
                <h3 className="text-white text-xl font-black mb-2">SUPER OFERTA!</h3>
                <p className="text-purple-200 text-xs mb-6">
                  Leve mais um item e ganhe <span className="text-white font-bold underline">FRETE GRÁTIS</span>!
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {upsellOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedUpsell(option)}
                      className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                        selectedUpsell?.id === option.id 
                          ? 'bg-white border-white' 
                          : 'bg-purple-800 border-purple-700'
                      }`}
                    >
                      <img src={option.image} alt={option.name} className="w-10 h-10 object-cover rounded-lg" />
                      <div className="text-left flex-grow">
                        <p className={`text-[10px] font-black ${selectedUpsell?.id === option.id ? 'text-purple-900' : 'text-white'}`}>
                          {option.name} {option.weight}
                        </p>
                        <span className={`text-xs font-black ${selectedUpsell?.id === option.id ? 'text-purple-700' : 'text-purple-300'}`}>
                          R$ {option.price.toFixed(2)}
                        </span>
                      </div>
                      {selectedUpsell?.id === option.id && <CheckCircle2 size={16} className="text-emerald-500" />}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handleSendMessage(false)}
                  className="mt-6 text-[10px] font-bold text-white/50 underline"
                >
                  Continuar apenas com meu pedido
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-emerald-900/5">
            {!showUpsell ? (
              <>
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[10px] text-emerald-950/40">
                    <span>Subtotal</span>
                    <span>R$ {baseSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-emerald-950/40">
                    <span>Frete</span>
                    <span>R$ {SHIPPING_FEE.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2 mt-1 border-t border-emerald-900/5">
                    <span className="text-emerald-950 font-black">Previsão Total</span>
                    <span className="text-xl font-black text-emerald-900">R$ {(baseSubtotal + SHIPPING_FEE).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowUpsell(true)}
                  className="w-full bg-purple-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2"
                >
                  <span>Continuar para Finalizar</span>
                  <ChevronRight size={18} />
                </button>
              </>
            ) : (
              <>
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-emerald-950 font-black">Total Final</span>
                      {selectedUpsell && <span className="text-[10px] text-emerald-500 font-bold">FRETE GRÁTIS!</span>}
                    </div>
                    <span className="text-2xl font-black text-purple-800">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleSendMessage(true)}
                  disabled={!selectedUpsell}
                  className={`w-full font-black py-4 rounded-xl flex items-center justify-center gap-2 ${
                    selectedUpsell ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-300'
                  }`}
                >
                  <span>ENVIAR PEDIDO PARA WHATSAPP</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
