import { useState, useEffect } from "react";
import { CredentialForm, CredentialFormData } from "./components/CredentialForm";
import { CredentialCard } from "./components/CredentialCard";
import { Toaster } from "@/components/ui/sonner";
import { LogoWorkshop } from "./assets/LogoWorkshop";

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

export default function App() {
  const [formData, setFormData] = useState<CredentialFormData | null>(null);
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || ""
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <div className="bg-glow"></div>
      <main className="w-full max-w-6xl px-8 flex flex-col md:flex-row gap-12 items-center justify-center z-10">
        {!formData ? (
          <div className="w-full max-w-md flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2 items-center">
              <LogoWorkshop className="h-[139px] w-fit object-contain mb-4 drop-shadow-lg mx-auto" />
              <h1 className="text-4xl font-heading font-bold uppercase leading-tight mt-2 text-center">
                Gere sua <br /><span className="neon-text">Credencial Digital</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md text-center">
                Preencha seus dados para gerar sua credencial de acesso exclusiva ao evento presencial em Campinas (30/07).
              </p>
            </div>
            <CredentialForm onSuccess={(data) => setFormData(data)} utmParams={utmParams} />
          </div>
        ) : (
          <div className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-700">
            <CredentialCard nome={formData.nomeCompleto} />
          </div>
        )}
      </main>
      <Toaster theme="dark" position="top-center" />
    </div>
  );
}
