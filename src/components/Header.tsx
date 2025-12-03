import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Instagram, Facebook, MessageCircle, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Coleções", href: "#colecoes" },
    { name: "Sobre", href: "#sobre" },
    { name: "Avaliações", href: "#avaliacoes" },
    { name: "Contato", href: "#contato" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/isartesanatos/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/isartesanatos/", label: "Facebook" },
    { icon: MessageCircle, href: "https://api.whatsapp.com/send?phone=5545999213366", label: "WhatsApp" },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#inicio" className="flex flex-col items-start">
            <span className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-wide">
              Isartesanatos
            </span>
            <span className="text-xs text-muted-foreground font-body tracking-widest uppercase">
              Ateliê Temático de Sonhos
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Social & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Auth Button */}
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      <span className="max-w-[100px] truncate">
                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="text-muted-foreground text-xs">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">
                    <User className="w-4 h-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
              )
            )}

            <Button variant="whatsapp" size="sm" asChild>
              <a
                href="https://api.whatsapp.com/send?phone=5545999213366"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Fale Conosco
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-body text-lg text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Auth */}
            {!loading && (
              <div className="mt-4 pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Olá, {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Entrar / Criar conta
                    </Link>
                  </Button>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <Button variant="whatsapp" className="w-full mt-4" asChild>
              <a
                href="https://api.whatsapp.com/send?phone=5545999213366"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Fale Conosco
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
