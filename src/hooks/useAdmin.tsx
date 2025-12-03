import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useAdmin = () => {
  const { user } = useAuth();

  const roleQuery = useQuery({
    queryKey: ["user-role", user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data?.role || null;
    },
    enabled: !!user,
  });

  const isAdmin = roleQuery.data === "admin";

  return {
    isAdmin,
    isLoading: roleQuery.isLoading,
    role: roleQuery.data,
  };
};
