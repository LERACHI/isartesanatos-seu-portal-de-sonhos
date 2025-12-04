const stats = [
  { label: "Anos de Experiência", value: "12+" },
  { label: "Seguidores Instagram", value: "49k" },
  { label: "Produtos Disponíveis", value: "338" },
];

const TrustBanner = () => {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-background/90 backdrop-blur-lg rounded-3xl border border-border shadow-card p-8 md:p-10">
          <p className="font-display text-xl md:text-2xl text-foreground mb-8">
            Entregamos em todo o Brasil com peças sob medida, prazos claros e suporte direto no WhatsApp.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mb-6">
            {stats.map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-2">
                  <span className="font-display text-lg font-semibold text-primary">{item.value}</span>
                </div>
                <p className="text-sm font-body text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-secondary/60 border border-border">
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Tire suas dúvidas sobre medidas, prazos ou personalizações. Estamos aqui para ajudar a vestir seus sonhos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
