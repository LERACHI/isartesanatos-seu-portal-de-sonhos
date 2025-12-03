import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";
import { useCart } from "./useCart";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  size: string | null;
  color: string | null;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export const useOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { clearCart, items: cartItems, cartTotal } = useCart();

  const ordersQuery = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          items:order_items(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });

  const createOrder = useMutation({
    mutationFn: async (shippingData: {
      address: string;
      city: string;
      state: string;
      zip: string;
      notes?: string;
      shippingCost?: number;
    }) => {
      if (!user) throw new Error("Usuário não autenticado");
      if (cartItems.length === 0) throw new Error("Carrinho vazio");

      const orderTotal = cartTotal + (shippingData.shippingCost || 0);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total: orderTotal,
          shipping_address: shippingData.address,
          shipping_city: shippingData.city,
          shipping_state: shippingData.state,
          shipping_zip: shippingData.zip,
          notes: shippingData.notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product?.name || "Produto",
        product_price: item.product?.price || 0,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    },
    onSuccess: () => {
      clearCart.mutate();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({ title: "Pedido realizado com sucesso!" });
    },
    onError: (error: Error) => {
      toast({ 
        title: "Erro ao finalizar pedido", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    createOrder,
  };
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  preparing: "Em Preparação",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export const orderStatusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
