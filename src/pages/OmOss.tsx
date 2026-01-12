import { Card } from "@/components/ui/card";
import { Target, Heart, Zap, Award } from "lucide-react";
import { CloudinaryBackgroundImage } from "@/components/CloudinaryImage";
import { HeroBadge } from "@/components/HeroBadge";

export default function OmOss() {
  const values = [
    {
      icon: Target,
      title: "Vårt mål",
      description: "Att göra det enkelt och lönsamt att driva butik genom smarta produktlösningar",
    },
    {
      icon: Heart,
      title: "Våra värderingar",
      description: "Ärlighet, kvalitet och långsiktiga relationer med våra återförsäljare",
    },
    {
      icon: Zap,
      title: "Vår drivkraft",
      description: "Innovation och ständig förbättring av våra koncept och sortiment",
    },
    {
      icon: Award,
      title: "Vår erfarenhet",
      description: "Över 20 års erfarenhet av grossisthandel och produktutveckling",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-section relative overflow-hidden">
        <CloudinaryBackgroundImage
          publicId="om_oss_bg"
          fallbackPath="/landing/hero/about.png"
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-container relative z-10">
          <div className="hero-content-wrapper">
            <HeroBadge>Om Oss</HeroBadge>
            <h1 className="hero-title">
              Vårt uppdrag: Bra grej för billig slant
            </h1>
            <p className="hero-description">
              Ett svenskt familjeföretag som revolutionerar fyndhandeln
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="hero-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Vår historia</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Fynd Grossisten är ett svenskt grossistföretag som erbjuder ett brett sortiment av prisvärda 
                produkter till butiker över hela landet. Vi fokuserar på smarta, användbara och populära varor 
                inom hushåll, fritid, leksaker, säsong och förbrukning för detaljhandeln – alltid med målet att 
                ge våra samarbetspartner bra grejer till ett fyndpris.
              </p>
              <p>
                Genom direktimport från tillverkare kan vi hålla konkurrenskraftiga priser utan att tumma på 
                kvaliteten. Vi hanterar hela processen själva – från beställning till leverans – vilket ger 
                oss flexibilitet, snabb service och god kontroll över sortimentet.
              </p>
              <p>
                Vår affärsidé bygger på att erbjuda produkter som verkligen säljer. Vi tror på långsiktiga 
                relationer med våra samarbetspartner och arbetar kontinuerligt för att utveckla våra koncept och 
                sortiment baserat på marknadens behov.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="hero-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vad vi står för</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Våra värderingar guidar allt vi gör
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-6 border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="hero-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ett familjärt team</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fynd Grossisten drivs av ett dedikerat team med lång erfarenhet av grossisthandel. 
              Vi är stolta över att vara ett familjeföretag där personlig service och långsiktiga 
              relationer står i centrum.
            </p>
            <p className="text-lg text-muted-foreground">
              Varje medlem i vårt team brinner för att hjälpa våra återförsäljare att lyckas. 
              Vi är inte bara en leverantör - vi är din partner i framgång.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-white">
        <div className="hero-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vill du bli en del av vår resa?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Gå med i vårt nätverk av framgångsrika återförsäljare
          </p>
          <a href="/bli-aterforsaljare#form" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-primary transition-all hover:-translate-y-1">
            Bli återförsäljare
          </a>
        </div>
      </section>
    </div>
  );
}
