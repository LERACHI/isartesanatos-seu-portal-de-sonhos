import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Isartesanatos - Ateliê Temático de Sonhos | Fantasias Juninas e Vestidos Temáticos</title>
        <meta 
          name="description" 
          content="Isartesanatos é um ateliê artesanal especializado em fantasias juninas e vestidos temáticos de alta qualidade. Mais de 12 anos criando peças exclusivas em Foz do Iguaçu. Entrega para todo Brasil." 
        />
        <meta name="keywords" content="fantasias juninas, vestidos temáticos, roupas caipiras, artesanato, Foz do Iguaçu, festa junina, vestido infantil" />
        <link rel="canonical" href="https://isartesanatos.com.br" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Isartesanatos - Ateliê Temático de Sonhos" />
        <meta property="og:description" content="Fantasias juninas e vestidos temáticos artesanais de alta qualidade. Feitos à mão com amor em Foz do Iguaçu." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Isartesanatos - Ateliê Temático de Sonhos" />
        <meta name="twitter:description" content="Fantasias juninas e vestidos temáticos artesanais de alta qualidade." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Categories />
          <About />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
