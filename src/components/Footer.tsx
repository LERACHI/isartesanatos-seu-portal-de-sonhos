import { Heart, Instagram, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Coleções", href: "#colecoes" },
    { name: "Sobre", href: "#sobre" },
    { name: "Avaliações", href: "#avaliacoes" },
    { name: "Contato", href: "#contato" },
  ];

  const shopLinks = [
    { name: "Loja no Elo7", href: "https://www.elo7.com.br/isartesanatos" },
    { name: "Fantasias Juninas", href: "https://www.elo7.com.br/lista/isartesanatos?segment=product&q=junina" },
    { name: "Vestidos Temáticos", href: "https://www.elo7.com.br/lista/isartesanatos?segment=product&q=vestido" },
    { name: "Avaliações", href: "https://www.elo7.com.br/isartesanatos/avaliacoes" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/isartesanatos/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/isartesanatos/", label: "Facebook" },
    { icon: MessageCircle, href: "https://api.whatsapp.com/send?phone=5545999213366", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="font-display text-2xl font-semibold mb-1">Isartesanatos</h3>
              <p className="font-body text-sm text-primary-foreground/60 tracking-widest uppercase">
                Ateliê Temático de Sonhos
              </p>
            </div>
            <p className="font-body text-primary-foreground/80 text-sm mb-6">
              Criando fantasias juninas e vestidos temáticos exclusivos desde 2011 
              em Foz do Iguaçu, Paraná.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Nossa Loja</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 font-body text-primary-foreground/70">
              <li>WhatsApp: (45) 99921-3366</li>
              <li>Foz do Iguaçu - PR</li>
              <li>Seg a Sex: 9h às 18h</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-primary-foreground/60">
              © {currentYear} Isartesanatos. Todos os direitos reservados.
            </p>
            <p className="font-body text-sm text-primary-foreground/60 flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> em Foz do Iguaçu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
