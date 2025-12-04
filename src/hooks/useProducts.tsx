import { useQuery } from "@tanstack/react-query";

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

const staticProducts: Product[] = [
  {
    id: "par-de-lacos-com-boneca",
    name: "Par de Laços com Boneca",
    description:
      "Bicos de pato para meninas com aplique. Valor do par! Pode ser feito em outras combinações de cores. Feito sob encomenda. Produto pronto em até 35 dias úteis. Medidas (A x L x C): 20 x 20 x 20 cm. Peso: 100 g. Código do produto: 1D80F96. Publicado em: 28/12/2023.",
    price: 67.8,
    category: "tematico",
    sizes: ["Unico"],
    colors: ["Colorido"],
    images: ["/par-de-lacos-com-boneca.jpg"],
    stock: 25,
    featured: true,
    created_at: "2023-12-28T00:00:00Z",
  },
  {
    id: "kit-fralda-passeio-babitas-aviador",
    name: "Kit Fralda Passeio e Babitas Aviador - 4 Peças",
    description:
      "Kit com 3 babitas e 1 fralda de passeio. Feito sob encomenda. Produto pronto em até 15 dias úteis. Babita aprox. 30 x 40 cm; fralda de passeio aprox. 70 x 70 cm (pode variar por ser artesanal). Várias opções de cores e combinações. Confeccionamos tamanhos maiores e fraldas de ombro sob encomenda. A fralda pode ser usada para higiene, cheirinho, cobrir/proteger contra vento e sol, ou apoio à mamada. Código: 1C7E6D5. Publicado em: 16/07/2023.",
    price: 169.5,
    category: "bebe",
    sizes: ["Unico"],
    colors: ["Azul", "Personalizado"],
    images: ["/kit-babitas-aviador-4-pecas-bebe.jpg"],
    stock: 15,
    featured: true,
    created_at: "2023-07-16T00:00:00Z",
  },
  {
    id: "vestido-caipira-xadrez-7-12",
    name: "Vestido Caipira Xadrez Tam 7 a 12 Anos",
    description:
      "Vestidinho para festa junina. Confirmar se a estampa ainda está disponível; pode sofrer alteração. Podemos fazer em outras cores e combinações. XADREZ ESGOTADO! Feito sob encomenda. Produto pronto em até 35 dias úteis. Medidas (A x L x C): 20 x 20 x 20 cm. Peso: 1150 g. Código: 1F5D250. Publicado em: 29/12/2024.",
    price: 675,
    category: "junina",
    sizes: ["7", "8", "10", "12"],
    colors: ["Vermelho", "Personalizado"],
    images: ["/vestido-caipira-xadrez-tam-7-a-12-anos.jpg"],
    stock: 8,
    featured: true,
    created_at: "2024-12-29T00:00:00Z",
  },
  {
    id: "vestido-caipira-rock-7-12",
    name: "Vestido Caipira Rock Tam 7 a 12 Anos",
    description:
      "Vestidinho para festa junina. Confirmar se a estampa ainda está disponível; pode sofrer alteração. Podemos fazer em outras cores e combinações. Feito sob encomenda. Produto pronto em até 35 dias úteis. Medidas (A x L x C): 20 x 20 x 20 cm. Peso: 1250 g. Código: 1D8862A. Publicado em: 03/01/2024.",
    price: 600,
    category: "junina",
    sizes: ["7", "8", "10", "12"],
    colors: ["Vermelho", "Personalizado"],
    images: [
      "/vestido-caipira-rock-tam-7-a-12-anos-junina.jpg",
      "/vestido-caipira1-rock-tam-7-a-12-anos-maina.jpg",
      "/vestido-caipira2-rock-tam-7-a-12-anos-floral.jpg",
    ],
    stock: 6,
    featured: true,
    created_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "vestido-caipira-babados-rosa-2-6",
    name: "Vestido Caipira Babados Rosa Tam 2 a 6 Anos",
    description:
      "Vestidinho para festa junina. Confirmar se a estampa ainda está disponível; pode sofrer alteração. Podemos fazer em outras cores e combinações. Feito sob encomenda. Produto pronto em até 35 dias úteis. Medidas (A x L x C): 20 x 20 x 20 cm. Peso: 950 g. Código: 1D93E26. Publicado em: 11/01/2024.",
    price: 600,
    category: "junina",
    sizes: ["2", "4", "6"],
    colors: ["Rosa", "Personalizado"],
    images: [
      "/vestido3-caipira-babados-rosa-tam-2-a-6-anos-saojoao.jpg",
      "/vestido1-caipira-babados-rosa-tam-2-a-6-anos-caipira.jpg",
      "/vestido2-caipira-babados-rosa-tam-2-a-6-anos-junina.jpg",
    ],
    stock: 10,
    featured: true,
    created_at: "2024-01-11T00:00:00Z",
  },
  {
    id: "faixa-junina-chapeu",
    name: "Faixa Junina com Chapéu",
    description:
      "Faixa para meninas com chapeuzinho e fitas. Pode ser feito em outras cores. Ao finalizar a compra, informe a idade da bebê e as cores desejadas. Feito sob encomenda. Produto pronto em até 35 dias úteis.",
    price: 50.9,
    category: "junina",
    sizes: ["Unico"],
    colors: ["Colorido", "Personalizado"],
    images: ["/faixa-junina-julho.jpg"],
    stock: 20,
    featured: true,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "tiara-chapeu-medio",
    name: "Tiara com Chapéu Médio",
    description:
      "Tiara com chapéu caipira. Pode ser feita em outras cores. Feito sob encomenda. Produto pronto em até 35 dias úteis. Código: 1D80F1F. Publicado em: 28/12/2023. Medidas (A x L x C): 11 x 21 x 27 cm. Peso: 300 g.",
    price: 73.5,
    category: "junina",
    sizes: ["Unico"],
    colors: ["Colorido", "Personalizado"],
    images: ["/tiara-com-chapeu-medio-tiara.jpg"],
    stock: 18,
    featured: true,
    created_at: "2023-12-28T00:00:00Z",
  },
];

export const useProducts = (filters?: { category?: string; featured?: boolean }) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      let data = staticProducts;

      if (filters?.category) {
        data = data.filter((item) => item.category === filters.category);
      }
      if (filters?.featured) {
        data = data.filter((item) => item.featured);
      }

      return data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const product = staticProducts.find((item) => item.id === id);
      return product || null;
    },
    enabled: !!id,
  });
};
