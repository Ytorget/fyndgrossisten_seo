import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, TrendingUp, Clock, CheckCircle, Package } from "lucide-react";
import { CloudinaryBackgroundImage, CloudinaryImage } from "@/components/CloudinaryImage";
import { HeroBadge } from "@/components/HeroBadge";

export default function Fyndladan() {
  const benefits = [
    "Full garanti på ökad vinst och omsättning",
    "Minimalt arbete - konceptet sköter sig själv",
    "Kontinuerlig produktrotation",
    "Dedikerad support och uppföljning",
  ];

  // Removed otherConcepts as this page is now dedicated to Fyndlådan

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-section relative">
        <CloudinaryBackgroundImage
          publicId="fyndladan_bg"
          fallbackPath="/landing/hero/fyndlådan.png"
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-container relative z-10"> {/* Added z-10 to ensure content is above background */}
          <div className="hero-content-wrapper">
            <HeroBadge>Fyndlådan</HeroBadge>
            <h1 className="hero-title">
              Smarta lösningar för ökad försäljning
            </h1>
            <p className="hero-description">
              Självgående koncept som kräver minimalt arbete och maximerar lönsamheten
            </p>
          </div>
        </div>
      </section>

      {/* Main Concept: Fyndlådan */}
      <section className="py-20">
        <div className="hero-container">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative">
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <Star className="h-5 w-5" />
                Vårt flaggskepp
              </div>
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                <CloudinaryImage
                  publicId="home_fyndladan"
                  fallbackPath="/landing/fyndcase/transparent.png"
                  alt="Fyndlådan"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Fyndlådan</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Det självgående konceptet som ökar din omsättning
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Fyndlådan är vårt mest populära koncept - en färdig exponering med handplockade produkter 
                till oslagbara priser. Perfekt för kassan eller entréer. Produkterna roterar automatiskt 
                för att alltid hålla sortimentet fräscht och intressant för dina kunder.
              </p>
              
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to="/bli-aterforsaljare#form">
                <Button size="lg" className="bg-gradient-primary text-white hover:shadow-primary">
                  Starta med Fyndlådan idag
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Riskfritt</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Nöjd-kund-garanti</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Returrätt</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="hero-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vill du veta mer?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Kontakta oss idag så berättar vi mer om hur våra koncept kan öka din lönsamhet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kontakt">
              <Button size="lg" className="bg-gradient-primary text-white">
                Kontakta oss
              </Button>
            </Link>
            <Link to="/bli-aterforsaljare#form">
              <Button size="lg" variant="outline">
                Bli återförsäljare
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
