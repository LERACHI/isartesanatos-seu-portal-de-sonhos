import { Scissors, Heart, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Scissors,
    title: "100% Artesanal",
    description: "Cada peça é cortada, costurada e finalizada à mão com atenção aos mínimos detalhes.",
  },
  {
    icon: Heart,
    title: "Feito com Amor",
    description: "Criações que carregam carinho e dedicação em cada ponto e acabamento.",
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Materiais selecionados e técnicas refinadas para peças que duram e encantam.",
  },
  {
    icon: Clock,
    title: "Desde 2011",
    description: "Mais de uma década de experiência criando sonhos para famílias de todo o Brasil.",
  },
];

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-coral-light text-accent rounded-full text-sm font-body mb-4">
              Nossa História
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Um Ateliê de{" "}
              <span className="text-gradient">Sonhos</span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground text-lg">
              <p>
                A <strong className="text-foreground">Isartesanatos</strong> nasceu em Foz do Iguaçu 
                com uma missão: transformar tecidos em sonhos. O que começou como uma paixão 
                pelo artesanato se tornou referência em fantasias juninas e vestidos temáticos 
                de alta qualidade.
              </p>
              <p>
                Cada peça que sai do nosso ateliê carrega a essência do trabalho manual 
                brasileiro, com acabamentos impecáveis que justificam o investimento em 
                uma roupa que será lembrada para sempre.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              <div>
                <span className="font-display text-4xl font-semibold text-primary">12+</span>
                <p className="font-body text-sm text-muted-foreground mt-1">Anos de<br />Experiência</p>
              </div>
              <div>
                <span className="font-display text-4xl font-semibold text-primary">5K+</span>
                <p className="font-body text-sm text-muted-foreground mt-1">Peças<br />Vendidas</p>
              </div>
              <div>
                <span className="font-display text-4xl font-semibold text-primary">99%</span>
                <p className="font-body text-sm text-muted-foreground mt-1">Clientes<br />Satisfeitos</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
