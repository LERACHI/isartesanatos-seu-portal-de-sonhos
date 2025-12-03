import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id || "");
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Faça login para adicionar ao carrinho",
        variant: "destructive",
      });
      return;
    }
    if (product && product.stock <= 0) {
      toast({ title: "Produto esgotado", variant: "destructive" });
      return;
    }
    if (product && quantity > product.stock) {
      toast({ title: `Apenas ${product.stock} unidades disponíveis`, variant: "destructive" });
      return;
    }
    if (!selectedSize && product?.sizes.length) {
      toast({ title: "Selecione um tamanho", variant: "destructive" });
      return;
    }
    if (!selectedColor && product?.colors.length) {
      toast({ title: "Selecione uma cor", variant: "destructive" });
      return;
    }
    addToCart.mutate({
      productId: product!.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product.id, product.name, product.images[0]);
    }
  };

  const favorite = product ? isFavorite(product.id) : false;

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <Skeleton className="aspect-square rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="font-display text-2xl mb-4">Produto não encontrado</h1>
            <Button asChild>
              <Link to="/produtos">Ver todos os produtos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const categoryLabels: Record<string, string> = {
    bebe: "Bebê",
    junina: "Festa Junina",
    tematico: "Temático",
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | Isartesanatos</title>
        <meta name="description" content={product.description || ""} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <Link
            to="/produtos"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para produtos
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        selectedImage === i
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {categoryLabels[product.category] || product.category}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-2">
                  {product.name}
                </h1>
              </div>

              <p className="font-display text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tamanho
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Cor</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input hover:border-primary"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantidade
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-medium">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.stock} em estoque
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={addToCart.isPending || product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock === 0 ? "Esgotado" : "Adicionar ao Carrinho"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleToggleFavorite}
                  className={favorite ? "text-destructive border-destructive" : ""}
                >
                  <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetail;
