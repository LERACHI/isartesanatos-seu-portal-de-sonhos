import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  size: string | null;
  color: string | null;
  created_at: string;
  product?: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
}

export const useCart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          product:products(id, name, price, images, stock)
        `)
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data as CartItem[];
    },
    enabled: !!user,
  });

  const addToCart = useMutation({
    mutationFn: async ({ productId, quantity, size, color }: { 
      productId: string; 
      quantity: number; 
      size?: string; 
      color?: string;
    }) => {
      if (!user) throw new Error("Usuário não autenticado");
      
      // Check product stock
      const { data: product } = await supabase
        .from("products")
        .select("stock, name")
        .eq("id", productId)
        .maybeSingle();
      
      if (!product) throw new Error("Produto não encontrado");
      
      // Check if item already exists
      const { data: existing } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .eq("size", size || null)
        .eq("color", color || null)
        .maybeSingle();
      
      const currentQuantity = existing?.quantity || 0;
      const newTotalQuantity = currentQuantity + quantity;
      
      if (newTotalQuantity > product.stock) {
        throw new Error(`Estoque insuficiente. Disponível: ${product.stock}, No carrinho: ${currentQuantity}`);
      }
      
      if (existing) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: newTotalQuantity })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cart_items")
          .insert({
            user_id: user.id,
            product_id: productId,
            quantity,
            size: size || null,
            color: color || null,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({ title: "Produto adicionado ao carrinho!" });
    },
    onError: (error: Error) => {
      toast({ title: error.message || "Erro ao adicionar ao carrinho", variant: "destructive" });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      if (quantity <= 0) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("id", itemId);
        if (error) throw error;
      } else {
        // Get the cart item to find the product
        const { data: cartItem } = await supabase
          .from("cart_items")
          .select("product_id")
          .eq("id", itemId)
          .maybeSingle();
        
        if (cartItem) {
          // Check product stock
          const { data: product } = await supabase
            .from("products")
            .select("stock")
            .eq("id", cartItem.product_id)
            .maybeSingle();
          
          if (product && quantity > product.stock) {
            throw new Error(`Estoque insuficiente. Disponível: ${product.stock}`);
          }
        }
        
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity })
          .eq("id", itemId);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast({ title: error.message || "Erro ao atualizar quantidade", variant: "destructive" });
    },
  });

  const removeFromCart = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({ title: "Item removido do carrinho" });
    },
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const cartTotal = cartQuery.data?.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0) || 0;

  const cartCount = cartQuery.data?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return {
    items: cartQuery.data || [],
    isLoading: cartQuery.isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  };
};
