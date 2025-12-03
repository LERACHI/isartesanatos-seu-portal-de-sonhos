import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export interface Favorite {
  id: string;
  user_id: string;
  product_name: string;
  product_image: string | null;
  product_url: string | null;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Favorite[];
    },
    enabled: !!user,
  });

  const addToFavorites = useMutation({
    mutationFn: async ({ productId, productName, productImage }: { 
      productId: string; 
      productName: string;
      productImage?: string;
    }) => {
      if (!user) throw new Error("Usuário não autenticado");
      
      const { error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          product_name: productName,
          product_image: productImage || null,
          product_url: `/produtos/${productId}`,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast({ title: "Adicionado aos favoritos!" });
    },
    onError: () => {
      toast({ title: "Erro ao adicionar aos favoritos", variant: "destructive" });
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: async (productUrl: string) => {
      if (!user) throw new Error("Usuário não autenticado");
      
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_url", productUrl);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast({ title: "Removido dos favoritos" });
    },
    onError: () => {
      toast({ title: "Erro ao remover dos favoritos", variant: "destructive" });
    },
  });

  const isFavorite = (productId: string) => {
    return favoritesQuery.data?.some(fav => fav.product_url === `/produtos/${productId}`) || false;
  };

  const toggleFavorite = async (productId: string, productName: string, productImage?: string) => {
    if (!user) {
      toast({ title: "Faça login para favoritar", variant: "destructive" });
      return;
    }
    
    if (isFavorite(productId)) {
      removeFromFavorites.mutate(`/produtos/${productId}`);
    } else {
      addToFavorites.mutate({ productId, productName, productImage });
    }
  };

  return {
    favorites: favoritesQuery.data || [],
    isLoading: favoritesQuery.isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favoritesQuery.data?.length || 0,
  };
};
