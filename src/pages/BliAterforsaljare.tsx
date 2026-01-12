import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Flame, TrendingUp, Package, Loader2, Wallet, Truck, Headphones } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createResellerRequest, buildCSRFHeaders, type CreateResellerRequestInput, type AshRpcError } from "@/lib/api";
import { isValidOrgNumber, formatOrgNumber } from "@/lib/utils";

export default function BliAterforsaljare() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateResellerRequestInput>();

  const orgNumberValue = watch("orgNumber", "");

  const handleOrgNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatOrgNumber(e.target.value);
    setValue("orgNumber", formatted, { shouldValidate: true });
  };

  const mutation = useMutation({
    mutationFn: async (data: CreateResellerRequestInput) => {
      const result = await createResellerRequest({
        input: data,
        fields: ["id", "companyName", "email", "status"],
        headers: buildCSRFHeaders(),
      });

      if (result.success) {
        return result.data;
      } else {
        // Check for CSRF error (403 Forbidden) and reload to get fresh token
        const isCsrfError = result.errors.some(
          (e: AshRpcError) => e.message === "Forbidden" || e.type === "network" && e.message?.includes("403")
        );
        if (isCsrfError) {
          window.location.reload();
          throw new Error("Session uppdateras, vänligen försök igen...");
        }

        const messages = result.errors.map((e: AshRpcError) => e.message).join(", ");
        throw new Error(messages);
      }
    },
    onSuccess: () => {
      toast.success("Tack! Vi kontaktar dig inom kort för att diskutera samarbete.", {
        description: "Du kommer få ett bekräftelsemail inom kort.",
      });
      reset();
    },
    onError: (error: Error) => {
      toast.error("Kunde inte skicka ansökan", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: CreateResellerRequestInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-container">
          <div className="hero-content-wrapper mt-20 md:mt-24">
            <h1 className="hero-title">
              Bli <span className="text-primary">återförsäljare</span>
            </h1>
            <p className="hero-description">
              Ansök idag och få tillgång till tusentals produkter till grossistpriser
            </p>
          </div>
        </div>
      </section>

      {/* Reseller Options */}
      <section className="py-20">
        <div className="hero-container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Flame className="h-4 w-4" />
                BÄSTSÄLJARE
              </div>
              <h3 className="text-2xl font-bold mb-3 mt-4">FYNDLÅDAN</h3>
              <p className="text-muted-foreground mb-6">
                Vårt bästsäljande koncept med full garanti på ökad vinst och omsättning
              </p>
              <a href="/fyndladan">
                <Button variant="outline" className="w-full">
                  Utforska Fyndlådan →
                </Button>
              </a>
            </Card>

            <Card className="p-6 border-border hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">EXPONERINGS KAMPANJER</h3>
              <p className="text-muted-foreground mb-6">
                Traditionell exponering, tandborstar, mobilsladdar etc
              </p>
              <a href="/sortiment">
                <Button variant="outline" className="w-full">
                  Utforska →
                </Button>
              </a>
            </Card>

            <Card className="p-6 border-border hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">FÖRBRUKNING</h3>
              <p className="text-muted-foreground mb-6">
                Allt som din butik behöver för att fungera
              </p>
              <a href="/sortiment">
                <Button variant="outline" className="w-full">
                  Utforska →
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="form" className="py-20 bg-muted/30">
        <div className="hero-container">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ansök om att bli återförsäljare
              </h2>
              <p className="text-muted-foreground text-sm">
                Fyll i formuläret så kontaktar vi dig inom 24 timmar
              </p>
            </div>

            <Card className="p-6 border-border">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Kontaktperson *</Label>
                    <Input
                      id="contactPerson"
                      {...register("contactPerson")}
                      placeholder="Förnamn Efternamn"
                    />
                    {errors.contactPerson && (
                      <p className="text-sm text-destructive">{errors.contactPerson.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Företagsnamn *</Label>
                    <Input
                      id="companyName"
                      {...register("companyName")}
                      placeholder="Ditt företag AB"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive">{errors.companyName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgNumber">Organisationsnummer *</Label>
                  <Input
                    id="orgNumber"
                    {...register("orgNumber", {
                      required: "Organisationsnummer krävs",
                      validate: (value) =>
                        isValidOrgNumber(value) || "Ogiltigt format. Ange XXXXXX-XXXX (t.ex. 556123-4567)"
                    })}
                    value={orgNumberValue}
                    onChange={handleOrgNumberChange}
                    placeholder="XXXXXX-XXXX"
                  />
                  {errors.orgNumber && (
                    <p className="text-sm text-destructive">{errors.orgNumber.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="din@epost.se"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="070-123 45 67"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Meddelande (valfritt)</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    placeholder="Beskriv kort din verksamhet och vad du är intresserad av..."
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary text-white hover:shadow-primary"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mutation.isPending ? "Skickar..." : "Skicka ansökan"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Genom att skicka ansökan godkänner du våra villkor
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="hero-container">
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-sm uppercase tracking-wide mb-4">Fördelar</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Varför välja Fynd Grossisten?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Höga marginaler</h3>
              <p className="text-muted-foreground">
                Nöjd-kund-garanti — full returrätt på hela sortimentet
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Snabba leveranser</h3>
              <p className="text-muted-foreground">
                Inom 1 arbetsdag
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personlig support</h3>
              <p className="text-muted-foreground">
                Dedikerad kontaktperson som hjälper dig
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
