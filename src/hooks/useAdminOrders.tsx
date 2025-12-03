import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Order, OrderStatus } from "./useOrders";

export const useAdminOrders = () => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          items:order_items(*)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({ title: "Status do pedido atualizado!" });
    },
    onError: (error: Error) => {
      toast({ title: "Erro ao atualizar status", description: error.message, variant: "destructive" });
    },
  });

  // Statistics
  const stats = {
    total: ordersQuery.data?.length || 0,
    pending: ordersQuery.data?.filter(o => o.status === "pending").length || 0,
    confirmed: ordersQuery.data?.filter(o => o.status === "confirmed").length || 0,
    preparing: ordersQuery.data?.filter(o => o.status === "preparing").length || 0,
    shipped: ordersQuery.data?.filter(o => o.status === "shipped").length || 0,
    delivered: ordersQuery.data?.filter(o => o.status === "delivered").length || 0,
    cancelled: ordersQuery.data?.filter(o => o.status === "cancelled").length || 0,
    revenue: ordersQuery.data?.filter(o => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0) || 0,
  };

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    updateOrderStatus,
    stats,
  };
};
