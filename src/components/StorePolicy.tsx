import { ShoppingBag, ShieldCheck, Undo2, MessageCircle } from "lucide-react";

const StorePolicy = () => {
  return (
    <section id="politica" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-coral-light text-accent rounded-full text-sm font-body mb-4">
            Política da Loja
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Transparência do Pedido à Entrega
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Siga o passo a passo para comprar com segurança e confira nossas diretrizes de troca e devolução.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-8 bg-card rounded-3xl shadow-soft border border-border/60">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-body text-muted-foreground uppercase tracking-[0.18em]">
                  Como Comprar
                </p>
                <h3 className="font-display text-2xl font-semibold text-foreground">Passo a Passo</h3>
              </div>
            </div>

            <ol className="list-decimal list-inside space-y-3 text-muted-foreground font-body leading-relaxed">
              <li>Escolha a peça desejada e clique em comprar.</li>
              <li>Clique em adicionar informação e escreva a idade da criança ou tamanho desejado.</li>
              <li>Clique em continuar comprando se desejar outros produtos; caso contrário, confirme seu pedido.</li>
              <li>Entre com seu usuário e senha.</li>
              <li>Escolha opção de frete.</li>
              <li>Faça o pagamento.</li>
              <li>Aguarde o envio da encomenda; em cada produto tem o prazo de confecção.</li>
              <li>Ao receber o pedido, deixe sua avaliação.</li>
            </ol>

            <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-primary font-semibold font-body">Importante</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Iniciamos o prazo de confecção 1 dia útil após a confirmação do pagamento.</li>
                <li>Pagamentos via boleto são aprovados em até 3 dias úteis.</li>
              </ul>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl shadow-soft border border-border/60">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Undo2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm font-body text-muted-foreground uppercase tracking-[0.18em]">
                  Política de Devolução
                </p>
                <h3 className="font-display text-2xl font-semibold text-foreground">Trocas e Devoluções</h3>
              </div>
            </div>

            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              O prazo para troca ou devolução é de 3 dias a partir do recebimento. Verifique os produtos assim que chegarem.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4">
              Realizamos devolução apenas em casos de problemas de confecção. Aceitamos devolução somente com:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground font-body leading-relaxed">
              <li>Produtos com etiqueta fixada.</li>
              <li>Sem uso, odores, manchas ou alterações no tecido.</li>
              <li>Embalagem similar e protegida à enviada.</li>
            </ul>

            <div className="mt-5 p-4 rounded-2xl bg-rose-light/30 border border-border/60">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                O cliente paga o frete de devolução em caso de medidas enviadas incorretas. Assim que o produto chegar,
                analisaremos o estado; estando tudo certo, retornaremos o contato para devolução do valor.
              </p>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-secondary/40 border border-border/60">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Tire todas as dúvidas antes do pedido para enviarmos exatamente o que deseja. Em caso de retorno por dados
                de entrega incorretos, será necessário pagar um novo frete para reenvio.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-3 text-muted-foreground font-body">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <p className="text-center">
            Qualquer dúvida, fale conosco. Teremos o maior prazer em atender você!{" "}
            <a
              href="https://api.whatsapp.com/send?phone=5545999213366"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorePolicy;
