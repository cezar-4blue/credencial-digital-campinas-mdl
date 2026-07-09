import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  nomeCompleto: z.string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo"),
  ddd: z.string().min(1, "Campo obrigatório"),
  whatsapp: z.string()
    .min(8, "Número de WhatsApp inválido")
    .regex(/^[\d\s-()]+$/, "Apenas números, espaços, parênteses e traços permitidos"),
  faturamento: z.string()
    .min(1, "Por favor, selecione o seu faturamento")
    .refine(val => val !== "Selecione uma das opções", {
      message: "Por favor, selecione uma opção de faturamento válida"
    }),
});

export type CredentialFormData = z.infer<typeof schema>;

interface Props {
  onSuccess: (data: CredentialFormData) => void;
  utmParams?: {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
  };
}

export function CredentialForm({ onSuccess, utmParams }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<CredentialFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ddd: "+55",
      whatsapp: "",
      nomeCompleto: "",
      email: "",
      faturamento: "Selecione uma das opções"
    }
  });

  const selectedDdd = watch("ddd");
  
  const getPlaceholder = (ddd: string) => {
    switch(ddd) {
      case "+1": return "(555) 000-0000";
      case "+351": return "900 000 000";
      case "+55": default: return "(11) 99999-9999";
    }
  };

  const onSubmit = async (data: CredentialFormData) => {
    setIsSubmitting(true);
    try {
      const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzg9ju64wdK2DPCtpOT_LV25jj0BDs3w6RV-Brr6CPe-u7wEfXxtZJE8VMhzshZURjrYg/exec";
      
      const payload = {
        nome: data.nomeCompleto,
        email: data.email,
        whatsapp: `${data.ddd} ${data.whatsapp}`,
        faturamento: data.faturamento,
        timestamp: new Date().toISOString(),
        utm_source: utmParams?.utm_source || "",
        utm_medium: utmParams?.utm_medium || "",
        utm_campaign: utmParams?.utm_campaign || "",
        utm_term: utmParams?.utm_term || "",
        utm_content: utmParams?.utm_content || "",
      };

      console.log("Enviando dados para o webhook:", payload);

      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      toast.success("Credencial gerada com sucesso!");
      onSuccess(data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar credencial. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full fade-in-up">
      <div className="space-y-2 text-left">
        <Label htmlFor="nomeCompleto" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Nome Completo</Label>
        <Input 
          id="nomeCompleto" 
          placeholder="Seu nome completo" 
          {...register("nomeCompleto")}
          className="h-12 rounded-lg bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary"
        />
        {errors.nomeCompleto && <span className="text-xs text-destructive">{errors.nomeCompleto.message}</span>}
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">E-mail</Label>
        <Input 
          id="email" 
          type="email"
          placeholder="seu@email.com.br" 
          {...register("email")}
          className="h-12 rounded-lg bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary"
        />
        {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
      </div>

      <div className="space-y-2 text-left">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">WhatsApp</Label>
        <div className="flex gap-3">
          <Controller 
            control={control}
            name="ddd"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-24 h-12 rounded-lg bg-secondary border-border focus:ring-primary">
                  <SelectValue placeholder="DDI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+55">🇧🇷 +55</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+351">🇵🇹 +351</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <div className="flex-1 space-y-1">
            <Input 
              id="whatsapp" 
              placeholder={getPlaceholder(selectedDdd)}
              {...register("whatsapp")}
              className="h-12 rounded-lg bg-secondary border-border focus-visible:ring-primary focus-visible:border-primary w-full"
            />
          </div>
        </div>
        {errors.whatsapp && <span className="text-xs text-destructive block mt-1">{errors.whatsapp.message}</span>}
        {errors.ddd && <span className="text-xs text-destructive block mt-1">{errors.ddd.message}</span>}
      </div>

      <div className="space-y-2 text-left">
        <Label htmlFor="faturamento" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Qual o seu Faturamento?</Label>
        <Controller 
          control={control}
          name="faturamento"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full h-12 rounded-lg bg-secondary border-border focus:ring-primary text-left justify-between">
                <SelectValue placeholder="Selecione o seu faturamento" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-primary/20 text-foreground max-h-60 overflow-y-auto">
                <SelectItem value="Selecione uma das opções" className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer py-2 px-3 text-muted-foreground italic">Selecione uma das opções</SelectItem>
                <SelectItem value="Até 30mil/mês" className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer py-2 px-3">Até 30mil/mês</SelectItem>
                <SelectItem value="30 a 60mil/mês" className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer py-2 px-3">30 a 60mil/mês</SelectItem>
                <SelectItem value="60 a 100mil/mês" className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer py-2 px-3">60 a 100mil/mês</SelectItem>
                <SelectItem value="100 a 300mil/mês" className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer py-2 px-3">100 a 300mil/mês</SelectItem>
                <SelectItem value="300 a 500mil/mês" className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer py-2 px-3">300 a 500mil/mês</SelectItem>
                <SelectItem value="Acima de 500mil/mês" className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer py-2 px-3">Acima de 500mil/mês</SelectItem>
                <SelectItem value="Não sei informar o faturamento" className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary cursor-pointer py-2 px-3">Não sei informar o faturamento</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.faturamento && <span className="text-xs text-destructive block mt-1">{errors.faturamento.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="neon-button w-full h-14 rounded-lg mt-4"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Gerando...
          </>
        ) : (
          "Gerar Minha Credencial"
        )}
      </button>
    </form>
  );
}
