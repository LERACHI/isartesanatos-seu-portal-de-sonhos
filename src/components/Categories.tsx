import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
const categoryBebe = withBase("kit-babitas-aviador-4-pecas-bebe.jpg");
const categoryJunina = withBase("vestido-caipira-xadrez-tam-7-a-12-anos.jpg");
const categoryTematico = withBase("vestido-tematico.jpg");

const categories = [
  {
    id: 1,
    name: "Fantasias Juninas",
    description: "Vestidos caipiras tradicionais com acabamento premium, feitos à mão com tecidos xadrez, rendas e fitas.",
    image: categoryJunina,
    category: "junina",
  },
  {
    id: 2,
    name: "Vestidos Temáticos",
    description: "Princesas, personagens e temas especiais. Cada peça é uma obra de arte para momentos inesquecíveis.",
    image: categoryTematico,
    category: "tematico",
  },
  {
    id: 3,
    name: "Linha Bebê",
    description: "Peças delicadas e confortáveis para os pequenos, com tecidos suaves e detalhes encantadores.",
    image: categoryBebe,
    category: "bebe",
  },
];

const Categories = () => {
  return (
    <section id="colecoes" className="py-24 bg-gradient-hero scroll-mt-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-body mb-4">
            Nossas Coleções
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Arte em Cada Detalhe
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Explore nossas categorias de produtos artesanais, cada peça feita com 
            dedicação e carinho especialmente para você.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/produtos?categoria=${category.category}`}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="font-body text-sm text-primary-foreground/80 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 font-body text-primary hover:text-accent transition-colors duration-300"
          >
            Ver todos os produtos
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
