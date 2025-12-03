import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ 
        title: "Faça login para adicionar ao carrinho",
        variant: "destructive"
      });
      return;
    }
    addToCart.mutate({
      productId: product.id,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const categoryLabels: Record<string, string> = {
    bebe: "Bebê",
    junina: "Festa Junina",
    tematico: "Temático",
  };

  return (
    <Link
      to={`/produtos/${product.id}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
            Destaque
          </span>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-md"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-full">
            Últimas {product.stock} peças
          </span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {categoryLabels[product.category] || product.category}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, i) => (
              <span
                key={i}
                className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
