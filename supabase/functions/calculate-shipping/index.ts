import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Shipping rates by region (origin: Paraná - PR)
const SHIPPING_RATES: Record<string, number> = {
  // Sul - mais barato (mesma região)
  PR: 15.90,
  SC: 18.90,
  RS: 22.90,
  // Sudeste
  SP: 25.90,
  RJ: 29.90,
  MG: 28.90,
  ES: 29.90,
  // Centro-Oeste
  MS: 32.90,
  MT: 35.90,
  GO: 32.90,
  DF: 32.90,
  // Nordeste
  BA: 39.90,
  SE: 42.90,
  AL: 42.90,
  PE: 42.90,
  PB: 45.90,
  RN: 45.90,
  CE: 45.90,
  PI: 48.90,
  MA: 48.90,
  // Norte
  TO: 42.90,
  PA: 52.90,
  AP: 55.90,
  AM: 58.90,
  RR: 58.90,
  AC: 58.90,
  RO: 52.90,
};

// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 299.90;

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cep, cartTotal } = await req.json();
    
    console.log(`Calculating shipping for CEP: ${cep}, Cart Total: ${cartTotal}`);

    if (!cep) {
      return new Response(
        JSON.stringify({ error: 'CEP é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean CEP (remove non-digits)
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      return new Response(
        JSON.stringify({ error: 'CEP inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch address from ViaCEP
    const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const addressData: ViaCEPResponse = await viaCepResponse.json();

    console.log('ViaCEP response:', addressData);

    if (addressData.erro) {
      return new Response(
        JSON.stringify({ error: 'CEP não encontrado' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const state = addressData.uf;
    const baseShippingRate = SHIPPING_RATES[state] || 45.90;
    
    // Check if eligible for free shipping
    const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
    const shippingCost = isFreeShipping ? 0 : baseShippingRate;

    // Estimated delivery days based on region
    let estimatedDays: string;
    if (['PR', 'SC', 'RS'].includes(state)) {
      estimatedDays = '3-5 dias úteis';
    } else if (['SP', 'RJ', 'MG', 'ES'].includes(state)) {
      estimatedDays = '5-7 dias úteis';
    } else if (['MS', 'MT', 'GO', 'DF'].includes(state)) {
      estimatedDays = '7-10 dias úteis';
    } else {
      estimatedDays = '10-15 dias úteis';
    }

    const response = {
      cep: cleanCep,
      address: {
        street: addressData.logradouro,
        neighborhood: addressData.bairro,
        city: addressData.localidade,
        state: addressData.uf,
      },
      shipping: {
        cost: shippingCost,
        isFreeShipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        estimatedDays,
        amountForFreeShipping: isFreeShipping ? 0 : FREE_SHIPPING_THRESHOLD - cartTotal,
      },
    };

    console.log('Shipping calculation result:', response);

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error calculating shipping:', error);
    return new Response(
      JSON.stringify({ error: 'Erro ao calcular frete' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
