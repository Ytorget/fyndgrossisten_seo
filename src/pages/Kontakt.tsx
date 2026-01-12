import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { CloudinaryBackgroundImage } from "@/components/CloudinaryImage";
import { HeroBadge } from "@/components/HeroBadge";

export default function Kontakt() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tack för ditt meddelande! Vi återkommer inom 24 timmar.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-section relative overflow-hidden">
        <CloudinaryBackgroundImage
          publicId="kontakt_bg_2"
          fallbackPath="/landing/hero/kontakt.png"
          className="absolute inset-0 bg-cover bg-[30%_top] md:bg-[25%_top] lg:bg-[20%_top]"
        />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-container relative z-10">
          <div className="hero-content-wrapper">
            <HeroBadge>Kontakt</HeroBadge>
            <h1 className="hero-title">
              Vi finns här för dig
            </h1>
            <p className="hero-description">
              Låt oss hjälpa dig att öka din försäljning
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="hero-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Skicka ett meddelande</h2>
              <p className="text-muted-foreground mb-8">
                Fyll i formuläret så återkommer vi inom 24 timmar
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Namn *</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Företag</Label>
                    <Input id="company" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-post *</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Ämne *</Label>
                  <Input id="subject" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Meddelande *</Label>
                  <Textarea id="message" rows={6} required />
                </div>

                <Button type="submit" size="lg" className="bg-gradient-primary text-white w-full hover:shadow-primary">
                  Skicka meddelande
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Kontaktuppgifter</h2>
              
              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-post</h3>
                    <p className="text-muted-foreground">info@fyndgrossisten.se</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-muted-foreground">08-525 129 23</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adress</h3>
                    <p className="text-muted-foreground">
                      Fynd Grossisten Stockholm AB<br />
                      Hamringevägen 1<br />
                      146 41 TULLINGE
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Öppettider</h3>
                    <p className="text-muted-foreground">
                      Måndag - Fredag: 09:00 - 18:00<br />
                      Lördag - Söndag: Stängt
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
