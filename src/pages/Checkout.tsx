import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, cartTotal } = useCart();
  const { createOrder } = useOrders();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrder.mutateAsync(formData);
    navigate("/pedidos");
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="font-display text-2xl mb-4">
              Faça login para finalizar sua compra
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

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-background">
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="font-display text-2xl mb-4">
              Seu carrinho está vazio
            </h1>
            <Button asChild>
              <Link to="/produtos">Ver Produtos</Link>
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
        <title>Checkout | Isartesanatos</title>
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <Link
            to="/produtos"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Continuar comprando
          </Link>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Finalizar Pedido
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
                <h2 className="font-display text-xl font-semibold">
                  Endereço de Entrega
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço completo</Label>
                  <Input
                    id="address"
                    placeholder="Rua, número, complemento"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      placeholder="Sua cidade"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      placeholder="UF"
                      maxLength={2}
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          state: e.target.value.toUpperCase(),
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">CEP</Label>
                  <Input
                    id="zip"
                    placeholder="00000-000"
                    value={formData.zip}
                    onChange={(e) =>
                      setFormData({ ...formData, zip: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Instruções especiais para entrega..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={createOrder.isPending}
              >
                {createOrder.isPending ? "Processando..." : "Confirmar Pedido"}
              </Button>
            </form>

            {/* Order Summary */}
            <div className="bg-card rounded-xl p-6 shadow-card h-fit space-y-4">
              <h2 className="font-display text-xl font-semibold">
                Resumo do Pedido
              </h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product?.images[0] || "/placeholder.svg"}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qtd: {item.quantity}
                        {item.size && ` • ${item.size}`}
                        {item.color && ` • ${item.color}`}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {formatPrice(
                          (item.product?.price || 0) * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Frete</span>
                  <span>A calcular</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;
