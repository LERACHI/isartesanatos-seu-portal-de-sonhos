import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ShippingResult {
  cep: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  shipping: {
    cost: number;
    isFreeShipping: boolean;
    freeShippingThreshold: number;
    estimatedDays: string;
    amountForFreeShipping: number;
  };
}

export const useShipping = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingResult, setShippingResult] = useState<ShippingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateShipping = async (cep: string, cartTotal: number) => {
    setIsCalculating(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('calculate-shipping', {
        body: { cep, cartTotal },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Erro ao calcular frete');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setShippingResult(data);
      return data as ShippingResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao calcular frete';
      setError(message);
      setShippingResult(null);
      return null;
    } finally {
      setIsCalculating(false);
    }
  };

  const clearShipping = () => {
    setShippingResult(null);
    setError(null);
  };

  return {
    calculateShipping,
    clearShipping,
    isCalculating,
    shippingResult,
    shippingCost: shippingResult?.shipping.cost ?? 0,
    error,
  };
};
