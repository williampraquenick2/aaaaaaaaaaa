
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // Individuais
  {
    id: 'alho-puro-500',
    name: 'Alho Puro',
    weight: '500g',
    price: 26.00,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'alho-puro-250',
    name: 'Alho Puro',
    weight: '250g',
    price: 15.00,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tempero-completo',
    name: 'Tempero Completo',
    weight: '250g',
    price: 17.00,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&q=80&w=400' // Beautiful tree/nature as requested
  },
  {
    id: 'alho-temperado',
    name: 'Alho Temperado',
    weight: '250g',
    price: 18.00,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tempero-bacon',
    name: 'Tempero de Bacon',
    weight: '250g',
    price: 19.00,
    category: 'individual',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=400'
  },
  // Especiais
  {
    id: 'ana-maria',
    name: 'Tempero Ana Maria',
    weight: '100g',
    price: 12.00,
    category: 'especial',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'edu-guedes',
    name: 'Tempero Edu Guedes',
    weight: '100g',
    price: 12.00,
    category: 'especial',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'paprica',
    name: 'Páprica Defumada',
    weight: '100g',
    price: 10.00,
    category: 'especial',
    image: 'https://images.unsplash.com/photo-150208259811b-9993333ad347?auto=format&fit=crop&q=80&w=400' // Another tree as requested
  },
  // Combos
  {
    id: 'combo-economico',
    name: 'Combo Econômico',
    description: '2 Alhos Puros 500g + 2 Temperos Secos',
    price: 60.00,
    category: 'combo',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=600'
  }
];

export const SHIPPING_FEE = 3.00;
export const WHATSAPP_NUMBER = '5500000000000';
