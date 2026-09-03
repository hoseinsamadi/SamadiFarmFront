import type { AppProps } from "next/app";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import CartDrawer, { type CartEntry } from "../src/components/CartDrawer";
import { IconCheck } from "../src/components/icons";
import { toFa, useReveal } from "../src/hooks/useReveal";
import type { Product } from "../src/data/site";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleRouteChange = () => window.scrollTo(0, 0);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  useReveal([router.pathname]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!justAddedId) return;
    const timer = window.setTimeout(() => setJustAddedId(null), 1500);
    return () => window.clearTimeout(timer);
  }, [justAddedId]);

  const add = useCallback((product: Product) => {
    setEntries((prev) => {
      const existing = prev.find((entry) => entry.product.id === product.id);
      if (existing) {
        return prev.map((entry) =>
          entry.product.id === product.id ? { ...entry, qty: entry.qty + 1 } : entry
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setJustAddedId(product.id);
    setToast(`«${product.name}» به سبد اضافه شد`);
  }, []);

  const inc = (id: string) =>
    setEntries((prev) => prev.map((entry) =>
      entry.product.id === id ? { ...entry, qty: entry.qty + 1 } : entry
    ));

  const dec = (id: string) =>
    setEntries((prev) => prev
      .map((entry) => entry.product.id === id ? { ...entry, qty: entry.qty - 1 } : entry)
      .filter((entry) => entry.qty > 0)
    );

  const remove = (id: string) =>
    setEntries((prev) => prev.filter((entry) => entry.product.id !== id));

  const count = entries.reduce((sum, entry) => sum + entry.qty, 0);
  const total = entries.reduce((sum, entry) => sum + entry.qty * entry.product.price, 0);

  return (
    <div className="page">
      <Header cartCount={count} onOpenCart={() => setCartOpen(true)} />
      <main>
        <div key={router.asPath} className="page-in">
          <Component {...pageProps} onAdd={add} justAddedId={justAddedId} />
        </div>
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        entries={entries}
        total={total}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
        onCheckout={() => setEntries([])}
      />
      <div className={`toast${toast ? " is-show" : ""}`} role="status">
        {toast && <><IconCheck size={18} />{toast}</>}
      </div>
    </div>
  );
}
