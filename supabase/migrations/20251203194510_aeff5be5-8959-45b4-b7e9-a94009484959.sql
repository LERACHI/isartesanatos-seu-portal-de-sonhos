-- Enum para status de pedidos
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled');

-- Tabela de produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de itens do carrinho
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id, size, color)
);

-- Tabela de pedidos
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status order_status NOT NULL DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_zip TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de itens do pedido
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  size TEXT,
  color TEXT
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products: público para leitura
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Cart items: apenas usuário dono
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to cart" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from cart" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Orders: apenas usuário dono
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: usuário pode ver itens dos próprios pedidos
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can create order items" ON public.order_items FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Triggers para updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Dados de exemplo
INSERT INTO public.products (name, description, price, category, sizes, colors, images, stock, featured) VALUES
('Macacão Ursinho', 'Macacão fofinho com estampa de ursinho, perfeito para bebês de 0-12 meses', 89.90, 'bebe', ARRAY['PP', 'P', 'M'], ARRAY['Azul', 'Rosa', 'Bege'], ARRAY['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400'], 50, true),
('Vestido Caipira Infantil', 'Vestido junino tradicional com babados e fita de cetim', 129.90, 'junina', ARRAY['2', '4', '6', '8'], ARRAY['Vermelho', 'Amarelo', 'Laranja'], ARRAY['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400'], 30, true),
('Camisa Xadrez Junina', 'Camisa xadrez clássica para festas juninas', 69.90, 'junina', ARRAY['P', 'M', 'G', 'GG'], ARRAY['Vermelho/Preto', 'Azul/Branco'], ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'], 40, false),
('Body Personagem', 'Body temático com estampa de personagem favorito', 59.90, 'tematico', ARRAY['PP', 'P', 'M', 'G'], ARRAY['Azul', 'Rosa', 'Amarelo'], ARRAY['https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400'], 25, true),
('Conjunto Fazendinha', 'Conjunto completo com tema de fazendinha', 149.90, 'tematico', ARRAY['1', '2', '3', '4'], ARRAY['Verde', 'Marrom'], ARRAY['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400'], 20, false),
('Salopete Jeans Baby', 'Salopete jeans com detalhes bordados', 99.90, 'bebe', ARRAY['PP', 'P', 'M'], ARRAY['Azul Claro', 'Azul Escuro'], ARRAY['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400'], 35, true),
('Chapéu de Palha Infantil', 'Chapéu de palha decorado para festa junina', 34.90, 'junina', ARRAY['Único'], ARRAY['Natural', 'Com Fita Vermelha'], ARRAY['https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=400'], 60, false),
('Fantasia Super-Herói', 'Fantasia completa de super-herói com capa', 119.90, 'tematico', ARRAY['2', '4', '6', '8', '10'], ARRAY['Azul/Vermelho', 'Vermelho/Dourado'], ARRAY['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'], 15, true);