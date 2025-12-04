import { ArrowRight, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Vestidos artesanais Isartesanatos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-20 h-20 border border-primary/20 rounded-full animate-float opacity-40" />
      <div className="absolute bottom-40 right-20 w-32 h-32 border border-coral/20 rounded-full animate-float delay-300 opacity-30" />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-rose-light/30 rounded-full blur-xl animate-pulse-soft" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-light/50 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-body text-foreground">
              547+ avaliações positivas no Elo7
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6 animate-slide-up">
            Onde os{" "}
            <span className="text-gradient">Sonhos</span>
            <br />
            Ganham Forma
          </h1>

          {/* Tagline */}
          <p className="font-display text-xl md:text-2xl text-primary italic mb-4 animate-slide-up delay-100">
            Ateliê Temático de Sonhos
          </p>

          {/* Description */}
          <p className="font-body text-lg text-muted-foreground max-w-2xl mb-8 animate-slide-up delay-200">
            Há mais de 10 anos criando fantasias juninas e vestidos temáticos
            exclusivos, feitos à mão com amor e dedicação em Foz do Iguaçu.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <a href="#colecoes">
                Ver Coleções
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a
                href="https://api.whatsapp.com/send?phone=5545999213366"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Heart className="w-5 h-5" />
                Encomendar Agora
              </a>
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
