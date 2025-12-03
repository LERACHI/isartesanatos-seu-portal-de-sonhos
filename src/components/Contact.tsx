import { MessageCircle, Instagram, Facebook, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contato" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-turquoise-light text-turquoise rounded-full text-sm font-body mb-4">
              Contato
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Vamos Criar{" "}
              <span className="text-gradient">Juntos</span>?
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
              Tire suas dúvidas, faça um orçamento ou encomende sua peça exclusiva. 
              Estamos prontos para atendê-la!
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  Fale Diretamente pelo WhatsApp
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  Atendimento personalizado para tirar dúvidas sobre medidas, 
                  prazos e personalizações. Resposta rápida!
                </p>
                <Button variant="whatsapp" size="xl" className="w-full md:w-auto" asChild>
                  <a
                    href="https://api.whatsapp.com/send?phone=5545999213366&text=Olá! Vim pelo site e gostaria de saber mais sobre os produtos da Isartesanatos."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Iniciar Conversa
                  </a>
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground">Localização</p>
                    <p className="font-body text-sm text-muted-foreground">Foz do Iguaçu, Paraná</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground">Horário</p>
                    <p className="font-body text-sm text-muted-foreground">Seg a Sex: 9h às 18h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="font-body text-muted-foreground mb-6">
              Acompanhe nossas novidades nas redes sociais
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/isartesanatos/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 group"
              >
                <Instagram className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                <div className="text-left">
                  <p className="font-body font-medium text-foreground">Instagram</p>
                  <p className="font-body text-sm text-muted-foreground">49.5K seguidores</p>
                </div>
              </a>
              <a
                href="https://www.facebook.com/isartesanatos/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-card rounded-xl shadow-soft hover:shadow-card transition-all duration-300 group"
              >
                <Facebook className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                <div className="text-left">
                  <p className="font-body font-medium text-foreground">Facebook</p>
                  <p className="font-body text-sm text-muted-foreground">@isartesanatos</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
