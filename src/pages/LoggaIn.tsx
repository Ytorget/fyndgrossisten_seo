import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Package, History, Receipt, BarChart, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signInWithPassword, setAuthToken, exchangeTokenForSession, type SignInInput } from "@/lib/auth";

// Error messages for different error codes passed via URL params
const ERROR_MESSAGES: Record<string, { title: string; description: string }> = {
  expired_token: {
    title: "Länken har löpt ut",
    description: "Din onboarding-länk är ogiltig eller har löpt ut. Kontakta support för att få en ny länk.",
  },
  auth_failed: {
    title: "Autentiseringsfel",
    description: "Kunde inte logga in med länken. Försök igen eller kontakta support.",
  },
};

export default function LoggaIn() {
  // Show error toast if redirected from onboarding with error
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    console.log('[LoggaIn] URL params on mount:', window.location.search, 'error:', error);

    if (error && ERROR_MESSAGES[error]) {
      const { title, description } = ERROR_MESSAGES[error];
      console.log('[LoggaIn] Showing error toast:', title, description);
      toast.error(title, { description, duration: 10000 });

      // Clean up URL to remove error param
      params.delete("error");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>();

  const mutation = useMutation({
    mutationFn: async (data: SignInInput) => {
      const result = await signInWithPassword({ input: data });

      if (result.success) {
        // Store the JWT token (token is merged at top level from metadataFields)
        const token = result.data.token;
        if (token) {
          setAuthToken(token);

          // Exchange JWT for session cookie so /app routes work
          const sessionCreated = await exchangeTokenForSession(token);
          if (!sessionCreated) {
            throw new Error("Kunde inte skapa session");
          }
        } else {
          console.error("No token in response data. Full result:", result);
          throw new Error("Ingen token mottagen från servern");
        }
        return result.data;
      } else {
        // Extract error messages with more detail
        const errs = (result as unknown as { errors?: Array<{ message?: string; field?: string }> }).errors ?? [];
        const errorMessages = errs.map((e) => {
          if (e?.message && e.message.includes("Authentication failed")) {
            return "Fel e-post eller lösenord. Kontrollera dina uppgifter och försök igen.";
          }
          if (e?.field) {
            return `${e.field}: ${e.message}`;
          }
          return e?.message ?? "Ett okänt fel uppstod";
        }).join("\n");
        
        throw new Error(errorMessages);
      }
    },
    onSuccess: () => {
      toast.success("Inloggad!", {
        description: "Du omdirigeras till din kundportal...",
      });
      // Redirect to return_to URL if provided, otherwise default to /app/
      // Note: trailing slash is required for Next.js static export with trailingSlash: true
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get("return_to") || "/app/";
      setTimeout(() => {
        window.location.href = returnTo;
      }, 1000);
    },
    onError: (error: Error) => {
      toast.error("Kunde inte logga in", {
        description: error.message,
      });
    },
  });

  const onSubmit = (data: SignInInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-background py-20 pt-32 md:pt-20">
      <div className="hero-container">
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          {/* Info */}
          <div className="hidden md:block">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Välkommen tillbaka!</h1>
              <p className="text-muted-foreground text-lg">
                Logga in på din kundportal för att:
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Lägga beställningar</h3>
                  <p className="text-sm text-muted-foreground">Snabb och enkel orderhantering</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Se hela sortimentet</h3>
                  <p className="text-sm text-muted-foreground">Tillgång till alla produkter och priser</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <History className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Följa dina ordrar</h3>
                  <p className="text-sm text-muted-foreground">Realtidsuppdateringar på dina leveranser</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Receipt className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Orderöversikt</h3>
                  <p className="text-sm text-muted-foreground">Översikt över dina ordrar</p>
                </div>
              </li>

              {/* Statistik & rapporter removed per request */}
            </ul>
          </div>

          {/* Login Form */}
          <Card className="p-8 border-border shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Logga in</h2>
              <p className="text-sm text-muted-foreground">
                Ange dina inloggningsuppgifter för att fortsätta
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
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Lösenord</Label>
                  <a
                    href="/glomt-losenord"
                    className="text-sm text-primary hover:underline"
                  >
                    Glömt lösenord?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Lösenord är obligatoriskt",
                  })}
                  className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loggar in...
                  </>
                ) : (
                  "Logga in"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Inte kund än?
              </p>
              <a href="/bli-aterforsaljare#form">
                <Button variant="outline" size="lg" className="w-full">
                  Bli återförsäljare
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
