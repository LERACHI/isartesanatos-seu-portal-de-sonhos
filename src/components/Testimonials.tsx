import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Clara S.",
    location: "São Paulo, SP",
    rating: 5,
    text: "Vestido lindo demais! Acabamento perfeito, minha filha ficou uma princesa. Super recomendo a Isa!",
    product: "Vestido Caipira Luxo",
  },
  {
    id: 2,
    name: "Ana Paula R.",
    location: "Curitiba, PR",
    rating: 5,
    text: "Qualidade impecável! Já é a terceira vez que compro e sempre supera as expectativas. Entrega rápida e bem embalado.",
    product: "Fantasia Junina Completa",
  },
  {
    id: 3,
    name: "Fernanda L.",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "O vestido chegou mais lindo que na foto! Cada detalhe mostra o cuidado e carinho. Minha bebê arrasou na festa!",
    product: "Vestido Temático Princesa",
  },
  {
    id: 4,
    name: "Juliana M.",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "Atendimento maravilhoso, tirou todas as dúvidas sobre medidas. O resultado ficou perfeito! Obrigada Isa!",
    product: "Roupa Caipira Masculina",
  },
];

const Testimonials = () => {
  return (
    <section id="avaliacoes" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold-light text-gold rounded-full text-sm font-body mb-4">
            Avaliações
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            O Que Dizem Nossos Clientes
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Mais de 547 avaliações positivas no Elo7. A satisfação de cada cliente 
            é nossa maior recompensa.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-gold fill-gold" />
            ))}
          </div>
          <p className="font-display text-5xl font-semibold text-foreground">4.9</p>
          <p className="font-body text-muted-foreground">Média de avaliações</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="font-body text-foreground mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Product Badge */}
              <span className="inline-block px-3 py-1 bg-rose-light text-primary rounded-full text-xs font-body mb-4">
                {testimonial.product}
              </span>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <p className="font-body font-medium text-foreground">{testimonial.name}</p>
                <p className="font-body text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://www.elo7.com.br/isartesanatos/avaliacoes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-primary hover:text-accent transition-colors duration-300"
          >
            Ver todas as 547 avaliações
            <Star className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
