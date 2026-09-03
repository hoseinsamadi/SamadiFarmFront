import ProductsPage from "../src/pages/ProductsPage";
import type { Product } from "../src/data/site";

interface ProductsRouteProps {
  onAdd?: (product: Product) => void;
  justAddedId?: string | null;
}

export default function ProductsRoute({ onAdd, justAddedId }: ProductsRouteProps) {
  return <ProductsPage onAdd={onAdd ?? (() => undefined)} justAddedId={justAddedId ?? null} />;
}
