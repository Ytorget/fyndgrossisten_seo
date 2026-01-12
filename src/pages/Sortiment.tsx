import { Card } from "@/components/ui/card";
import { ShoppingCart, Trash2, Sparkles, Gift, Sun, Package } from "lucide-react";
import { CloudinaryBackgroundImage } from "@/components/CloudinaryImage";
import { HeroBadge } from "@/components/HeroBadge";

export default function Sortiment() {
  const categories = [
    {
      icon: ShoppingCart,
      title: "Förbrukning för verksamhet",
      description: "Det din butik behöver för att fungera smidigt,",
    },
    {
      icon: Trash2,
      title: "Traditionell exponering",
      description: "Komplett sortiment för exponering",
    },
    {
      icon: Sparkles,
      title: "Hushåll & Hem",
      description: "Praktiska produkter för hemmet",
      examples: ["Köksredskap", "Förvaringslösningar", "Textilier", "Dekoration"],
    },
    {
      icon: Gift,
      title: "Leksaker",
      description: "Populära leksaker för alla åldrar",
      examples: ["Utomhusleksaker", "Pusselspel", "Kreativa produkter", "Säsongsartiklar"],
    },
    {
      icon: Sun,
      title: "Säsongsvaror",
      description: "Rätt produkter för varje årstid",
      examples: ["Sommar & Fritid", "Jul & Högtider", "Trädgård", "Grillsäsong"],
    },
    {
      icon: Package,
      title: "Kampanjartiklar",
      description: "Lönsamma kampanjer och erbjudanden",
      examples: ["Exponeringsmaterial", "Perioderbjudanden", "Storsäljare", "Nya produkter"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-section relative overflow-hidden">
        <CloudinaryBackgroundImage
          publicId="sortiment_bg"
          fallbackPath="/landing/hero/sortiment.png"
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-container relative z-10">
          <div className="hero-content-wrapper">
            <HeroBadge>Vårt Sortiment</HeroBadge>
            <h1 className="hero-title">
              Handplockade produkter för alla behov
            </h1>
            <p className="hero-description">
              Brett sortiment inom hushåll, fritid, leksaker, säsong och förbrukning
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="hero-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="p-6 hover-lift border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="hero-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vill du se hela sortimentet?
          </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bli återförsäljare idag och få tillgång till vårt kompletta sortiment med 150+ produkter
          </p>
          <a href="/bli-aterforsaljare#form" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-primary transition-all hover:-translate-y-1">
            Bli återförsäljare nu
          </a>
        </div>
      </section>
    </div>
  );
}
