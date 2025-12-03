import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

const Favorites = () => {
  const { favorites, isLoading, removeFromFavorites } = useFavorites();
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4 text-center py-16">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="font-display text-2xl mb-4">Faça login para ver seus favoritos</h1>
            <Button asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Meus Favoritos | Isartesanatos</title>
        <meta name="description" content="Veja seus produtos favoritos salvos." />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Meus Favoritos
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Produtos que você salvou para ver depois
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg mb-4">
                Você ainda não tem favoritos
              </p>
              <Button asChild>
                <Link to="/produtos">Explorar Produtos</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
                >
                  <Link to={favorite.product_url || "#"} className="block">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={favorite.product_image || "/placeholder.svg"}
                        alt={favorite.product_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-4 flex items-center justify-between">
                    <Link to={favorite.product_url || "#"} className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
                        {favorite.product_name}
                      </h3>
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeFromFavorites.mutate(favorite.product_url || "")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Favorites;
