import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  featured: boolean;
  created_at: string;
}

export const useProducts = (filters?: { category?: string; featured?: boolean }) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      let query = supabase.from("products").select("*");
      
      if (filters?.category) {
        query = query.eq("category", filters.category);
      }
      if (filters?.featured) {
        query = query.eq("featured", true);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Product | null;
    },
    enabled: !!id,
  });
};
