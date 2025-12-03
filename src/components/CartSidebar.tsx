import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartSidebar = ({ open, onOpenChange }: CartSidebarProps) => {
  const { items, updateQuantity, removeFromCart, cartTotal, isLoading } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Carrinho
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link to="/produtos">Ver Produtos</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <img
                    src={item.product?.images[0] || "/placeholder.svg"}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {item.product?.name}
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {item.size && <span>Tam: {item.size}</span>}
                      {item.size && item.color && <span> • </span>}
                      {item.color && <span>Cor: {item.color}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity.mutate({
                              itemId: item.id,
                              quantity: item.quantity - 1,
                            })
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity.mutate({
                              itemId: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive"
                        onClick={() => removeFromCart.mutate(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="font-semibold text-primary mt-1">
                      {formatPrice((item.product?.price || 0) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium">Total</span>
                <span className="font-display text-2xl font-bold text-primary">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <Button
                className="w-full"
                size="lg"
                asChild
                onClick={() => onOpenChange(false)}
              >
                <Link to="/checkout">Finalizar Compra</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onOpenChange(false)}
                asChild
              >
                <Link to="/produtos">Continuar Comprando</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
