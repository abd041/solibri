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
import type { CartItem, CartItemInput } from "@/lib/cart";
import { isQtyControlled } from "@/lib/cart";

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

function mergeLines(prev: CartItem[], lines: CartItemInput[]) {
  const next = prev.map((item) => ({ ...item }));
  for (const line of lines) {
    const existing = next.find((item) => item.id === line.id);
    if (existing) {
      existing.quantity += line.quantity;
    } else {
      next.push({ ...line });
    }
  }
  return next;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addLines = useCallback((lines: CartItemInput[]) => {
    if (lines.length === 0) return;
    setItems((prev) => mergeLines(prev, lines));
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
          format: product.format,
          role: "primary",
        },
      ]);
    },
    [addLines],
  );

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (!target || !isQtyControlled(target)) return prev;
      const qty = Math.min(99, quantity);
      if (qty <= 0) {
        if (target.kitId) return prev.filter((item) => item.kitId !== target.kitId);
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) => {
        if (target.kitId ? item.kitId === target.kitId : item.id === id) {
          return { ...item, quantity: qty };
        }
        return item;
      });
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (!target) return prev;
      if (target.kitId) return prev.filter((item) => item.kitId !== target.kitId);
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const itemCount = useMemo(
    () => items.filter((item) => item.role === "primary").reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
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
