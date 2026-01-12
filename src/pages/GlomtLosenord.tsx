import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Mail, Loader2, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

interface ForgotPasswordInput {
  email: string;
}

export default function GlomtLosenord() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordInput>();

  const mutation = useMutation({
    mutationFn: async (data: ForgotPasswordInput) => {
      // Call the Ash RPC action for password reset
      const response = await fetch("/rpc/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include CSRF token from meta tag
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          resource: "User",
          action: "request_password_reset",
          input: {
            email: data.email,
          },
        }),
      });

      // Handle CSRF token expiration (403 error)
      if (response.status === 403) {
        // Reload the page to get a fresh CSRF token from Phoenix
        window.location.reload();
        throw new Error("Session uppdateras, vänligen försök igen...");
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Ett fel uppstod vid begäran");
      }

      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error: Error) => {
      toast.error("Kunde inte skicka återställningslänk", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-background py-20 pt-32 md:pt-20">
        <div className="hero-container max-w-md">
          <Card className="p-8 border-border shadow-lg">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">E-post skickad!</h2>
              <p className="text-sm text-muted-foreground">
                Vi har skickat instruktioner för återställning av lösenord till:
              </p>
              <p className="text-sm font-semibold mt-2">{getValues("email")}</p>
            </div>

            <Alert className="mb-6">
              <Mail className="h-4 w-4" />
              <AlertDescription>
                Om e-postadressen finns i vårt system kommer du att få en länk för att återställa ditt lösenord inom några minuter.
                Länken är giltig i 24 timmar.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>Ser du inte mailet?</strong> Kontrollera din skräppost/spam-mapp.
              </p>

              <a href="/logga-in" className="block">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Tillbaka till inloggning
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-background py-20 pt-32 md:pt-20">
      <div className="hero-container max-w-md">
        <Card className="p-8 border-border shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Glömt lösenord?</h2>
            <p className="text-sm text-muted-foreground">
              Ange din e-postadress så skickar vi dig en länk för att återställa ditt lösenord.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                placeholder="din@email.se"
                {...register("email", {
                  required: "E-post är obligatorisk",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ogiltig e-postadress",
                  },
                })}
                className={errors.email ? "border-destructive" : ""}
                disabled={mutation.isPending}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Skickar...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Skicka återställningslänk
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Kom ihåg ditt lösenord?
            </p>
            <a href="/logga-in">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tillbaka till inloggning
              </Button>
            </a>
          </div>

          <div className="mt-6">
            <Alert>
              <AlertDescription className="text-xs">
                <strong>Säkerhetsmeddelande:</strong> Av säkerhetsskäl visas samma meddelande oavsett om e-postadressen finns i systemet eller inte.
              </AlertDescription>
            </Alert>
          </div>
        </Card>
      </div>
    </div>
  );
}
