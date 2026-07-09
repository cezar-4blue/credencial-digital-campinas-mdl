import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { Download, MapPin, Calendar } from "lucide-react";
import { LogoWorkshop } from "../assets/LogoWorkshop";

interface Props { nome: string; }

export function CredentialCard({ nome }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const kebabCaseName = nome.trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

  const saveAsImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: "#000000",
        style: { transform: 'none', boxShadow: 'none' }
      });
      const link = document.createElement("a");
      link.download = `credencial-${kebabCaseName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) { console.error("Erro ao gerar imagem:", error); }
  };

  return (
    <div className="w-full max-w-[340px] flex flex-col items-center gap-6 fade-in-up">
      <div ref={cardRef} className="glass-card w-full flex flex-col items-center justify-center p-8 relative shadow-2xl overflow-hidden" style={{ borderRadius: "2rem" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-primary/5 pointer-events-none"></div>

        <LogoWorkshop className="h-16 mb-4 object-contain z-10 w-[80%]" />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-6 opacity-50 z-10" />

        <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold mb-2 text-center z-10">
          Credencial do Participante
        </span>

        <h2 className="font-heading text-2xl font-black uppercase text-primary mb-8 text-center neon-text z-10">
          {nome}
        </h2>

        <div className="bg-white p-3 rounded-xl border-2 border-primary/40 mb-8 max-w-fit z-10">
          <QRCodeSVG
            value="https://cont.4blue.com.br/central-participantes-cam/"
            size={140} level="H" includeMargin={false}
          />
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-6 opacity-50 z-10" />

        <div className="flex flex-col gap-3 w-full items-center text-muted-foreground text-sm font-medium z-10">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Campinas/SP</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>30 de Julho — 9h às 21h</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <button onClick={saveAsImage} className="neon-button h-12 w-full flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Salvar como Imagem
        </button>
        <button onClick={() => window.location.reload()} className="text-xs text-muted-foreground hover:text-white transition-colors text-center mt-2 underline underline-offset-4">
          Gerar outra credencial
        </button>
      </div>
    </div>
  );
}
