"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartItemInput = Omit<CartItem, "quantity"> & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addProduct: (product: Product, quantity?: number) => void;
  addLines: (lines: CartItemInput[]) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  cartPulse: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addLines = useCallback((lines: CartItemInput[]) => {
    setItems((prev) => {
      const next = [...prev];
      for (const line of lines) {
        const existing = next.find((item) => item.id === line.id);
        if (existing) {
          existing.quantity += line.quantity;
        } else {
          next.push({ ...line });
        }
      }
      return next;
    });
    setCartPulse((n) => n + 1);
    setIsOpen(true);
  }, []);

  const addProduct = useCallback(
    (product: Product, quantity = 1) => {
      addLines([
        {
          id: product.slug,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        },
      ]);
    },
    [addLines],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((item) => item.id !== id);
      return prev.map((item) => (item.id === id ? { ...item, quantity } : item));
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addProduct,
      addLines,
      setQuantity,
      removeItem,
      cartPulse,
    }),
    [
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addProduct,
      addLines,
      setQuantity,
      removeItem,
      cartPulse,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
