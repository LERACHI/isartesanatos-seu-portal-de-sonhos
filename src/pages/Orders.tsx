import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Package, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useOrders, orderStatusLabels, orderStatusColors } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

const Orders = () => {
  const { user } = useAuth();
  const { orders, isLoading } = useOrders();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="font-display text-2xl mb-4">
              Faça login para ver seus pedidos
            </h1>
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
        <title>Meus Pedidos | Isartesanatos</title>
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Meus Pedidos
          </h1>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Você ainda não fez nenhum pedido
              </p>
              <Button asChild>
                <Link to="/produtos">Ver Produtos</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-xl p-6 shadow-card"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Pedido #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        orderStatusColors[order.status]
                      }`}
                    >
                      {orderStatusLabels[order.status]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {order.items?.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="bg-muted rounded-lg p-2 text-sm"
                      >
                        <span className="font-medium">{item.product_name}</span>
                        <span className="text-muted-foreground">
                          {" "}
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                    {order.items && order.items.length > 4 && (
                      <div className="bg-muted rounded-lg p-2 text-sm text-muted-foreground">
                        +{order.items.length - 4} mais
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {order.shipping_city}, {order.shipping_state}
                      </p>
                    </div>
                    <p className="font-display text-xl font-bold text-primary">
                      {formatPrice(order.total)}
                    </p>
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

export default Orders;
