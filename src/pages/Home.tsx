import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Package, Users, CheckCircle, Shield, X, ChevronLeft, ChevronRight, Clock, Truck, Award, BarChart3, Star, Quote, Zap, Target, ShoppingBag } from "lucide-react";
import { useSession } from "@/hooks/useSession";
import { CloudinaryBackgroundImage, CloudinaryImage } from "@/components/CloudinaryImage";
import { HeroBadge } from "@/components/HeroBadge";

const testimonials = [
  { publicId: 'hero_testimonial_1', fallback: '/landing/testimonials/ica_sms.png', name: 'ICA Skogås' },
  { publicId: 'hero_testimonial_2', fallback: '/landing/testimonials/ica_sms1.png', name: 'ICA Brandbergen' },
  { publicId: 'hero_testimonial_3', fallback: '/landing/testimonials/ica_sms3.png', name: 'ICA Kvantum Mirum Norrköping' }
];

export default function Home() {
  const { isLoggedIn } = useSession();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const partnerLogos = [
    { publicId: 'food_world_logo', fallback: '/landing/partners/food_world.png', alt: 'Food World' },
    { publicId: 'hemkop_logo', fallback: '/landing/partners/hemkop.png', alt: 'Hemköp' },
    { publicId: 'tempo_logo', fallback: '/landing/partners/tempo.webp', alt: 'Tempo' },
    { publicId: 'matrebellerna_logo', fallback: '/landing/partners/matrebellerna.png', alt: 'Matrebellerna' },
    { publicId: 'ica_logo', fallback: '/landing/partners/ica.png', alt: 'ICA' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <CloudinaryBackgroundImage
          publicId="home_hero"
          fallbackPath="/landing/hero/home.png"
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        
        <div className="hero-container relative z-10">
          <div className="hero-content-wrapper mt-20 md:mt-24 lg:mt-32">
              <HeroBadge>Fynd Grossisten</HeroBadge>
              <h1 className="hero-title animate-fade-in-up">
                Går inget annat <span className="text-primary">än att vinna!</span>
              </h1>
              <p className="hero-description animate-fade-in-up delay-100">
                Bli återförsäljare och få tillgång till tusentals produkter till konkurrenskraftiga priser. Enkel beställning, snabb leverans – helt utan risk.
              </p>

            <div className="hero-cta-group animate-fade-in-up delay-200">
              {isLoggedIn ? (
                  <a href="/app/" className="cta-button-primary group">
                    Gå till din dashboard
                    <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <>
                    <Link to="/bli-aterforsaljare#form">
                      <Button size="lg" className="bg-gradient-primary text-white hover:shadow-primary transition-all hover:-translate-y-0.5">
                        Bli återförsäljare idag
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/sortiment">
                      <Button size="lg" variant="outline" className="bg-white/20 border-white/40 text-white hover:bg-white/30">
                        Se vårt sortiment
                      </Button>
                    </Link>
                  </>
                )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-8 animate-fade-in-up delay-300">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Truck className="w-4 h-4 text-primary" />
                <span className="font-semibold text-white">ALLTID FRI FRAKT</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>50+ butiker</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>150+ produkter</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Sedan 2024</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar borttagen enligt instruktion */}

      {/* Partners Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-muted-foreground text-sm uppercase tracking-wide mb-4">Våra kunder</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Pålitliga samarbeten i hela Sverige</h2>
            <p className="text-muted-foreground text-base md:text-lg">Vi levererar till ledande butiker och kedjor</p>
          </div>
        </div>

        {/* Full-width marquee outside container */}
        <div className="relative py-6 md:py-8">
          <div className="absolute top-0 left-0 w-12 md:w-24 lg:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-12 md:w-24 lg:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          <div className="marquee marquee--partners">
            <div className="marquee__content">
              {partnerLogos.map((logo, i) => (
                <div key={i} className="flex-shrink-0 w-48 h-24 md:w-64 md:h-32 lg:w-72 lg:h-36 bg-white rounded-2xl shadow-md flex items-center justify-center border border-border/30 px-6 md:px-8">
                  <CloudinaryImage
                    publicId={logo.publicId}
                    fallbackPath={logo.fallback}
                    alt={logo.alt}
                    className="h-12 md:h-16 lg:h-20 w-auto max-w-[80%] object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="marquee__content" aria-hidden="true">
              {partnerLogos.map((logo, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 w-48 h-24 md:w-64 md:h-32 lg:w-72 lg:h-36 bg-white rounded-2xl shadow-md flex items-center justify-center border border-border/30 px-6 md:px-8">
                  <CloudinaryImage
                    publicId={logo.publicId}
                    fallbackPath={logo.fallback}
                    alt={logo.alt}
                    className="h-12 md:h-16 lg:h-20 w-auto max-w-[80%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-white/60 text-sm md:text-base">Butiker</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">150+</div>
              <div className="text-white/60 text-sm md:text-base">Produkter</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-white/60 text-sm md:text-base">Nöjdhetsgaranti</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1-3</div>
              <div className="text-white/60 text-sm md:text-base">Dagars leverans</div>
            </div>
          </div>
        </div>
      </section>

      {/* About/Concept Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-primary text-sm uppercase tracking-wide font-medium mb-4">Bästsäljare</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Butikens mest lönsamma kvadratmeter
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Vi placerar en färdigfylld pall i din butik – full med högkvalitativa vardagsprodukter & leksaker, allt för 20 kronor styck.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Ingen startkostnad</h4>
                    <p className="text-muted-foreground">Kom igång helt kostnadsfritt</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Bredda sortimentet</h4>
                    <p className="text-muted-foreground">Bredda sortimentet med 100+ artiklar på bekostnaden av 1 kvm – helt riskfritt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Självgående system</h4>
                    <p className="text-muted-foreground">Minimal tidsinvestering från er sida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Riskfritt</h4>
                    <p className="text-muted-foreground">Alltid full returrätt</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/fyndladan">
                  <Button size="lg" className="bg-gradient-primary text-white hover:shadow-lg transition-shadow w-full sm:w-auto">
                    Läs mer om konceptet
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/bli-aterforsaljare#form">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Bli återförsäljare
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative order-1 md:order-2">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl"></div>
                <div className="absolute inset-4 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl flex items-center justify-center">
                  <CloudinaryImage
                    publicId="home_fyndladan"
                    fallbackPath="/landing/fyndcase/transparent.png"
                    alt="Fyndlådan"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-muted-foreground text-sm uppercase tracking-wide mb-4">Fördelar</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Därför väljer butiker oss</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vi gör det enkelt att öka er försäljning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover-lift bg-white border-border/50 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Självgående koncept</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vår fyndlåda sköter sig själv – du får merförsäljning utan extra arbete.
              </p>
            </Card>
            <Card className="p-8 hover-lift bg-white border-border/50 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Riskfritt</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vi tar hela risken, du behåller vinsten – ett koncept som bara går med vinst.
              </p>
            </Card>
            <Card className="p-8 hover-lift bg-white border-border/50 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Maxad säljyta</h3>
              <p className="text-muted-foreground leading-relaxed">
                Svara aldrig mer "nej" på frågan om vara finns i butik.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-wide font-medium mb-4">Kom igång</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tre steg till ökad försäljning</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ingen komplicerad process – börja tjäna pengar redan inom en vecka
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            {/* Timeline connector (hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent top-1/2 -translate-y-16" />

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      1
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Skicka in ansökan</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fyll i ett enkelt formulär med dina uppgifter. Vi återkommer inom 24 timmar med ett erbjudande.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      2
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Vi levererar till er</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vi kör ut en komplett, färdigfylld pall direkt till er butik. Ni behöver inte göra något.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="bg-gradient-to-br from-primary/5 to-white rounded-2xl p-8 border border-primary/20 shadow-sm hover:shadow-lg transition-all h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      3
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Börja tjäna pengar</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Era kunder älskar 20-kronorskonceptet. Ni säljer, vi påfyllar – helt automatiskt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/bli-aterforsaljare#form">
              <Button size="lg" className="bg-gradient-primary text-white hover:shadow-lg transition-all text-lg px-8">
                Starta din ansökan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-muted-foreground text-sm mt-4">Ingen bindningstid • Full returrätt</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-wide font-medium mb-4">Kundröster</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Våra kunder rekommenderar oss</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Läs vad andra butiker säger om att samarbeta med Fynd Grossisten
            </p>
          </div>

          {/* Quote testimonials */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="p-6 bg-white border-border/50 relative">
              <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "Det har varit kö runt pallen i över 30 minuter – produkterna flyger verkligen iväg! Vi behöver påfyllning redan till nästa vecka."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">T</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Tahsin</div>
                  <div className="text-muted-foreground text-xs">ICA Kvantum Mirum Galleria</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-border/50 relative">
              <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "500 sålda igår. All påfyllnad är redan ute, vi kommer behöva mer inom kort. Skicka gärna en dubbelt så stor order så vi kan bygga en hel binge med reklam."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">J</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Jon</div>
                  <div className="text-muted-foreground text-xs">ICA Brandbergen</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border-border/50 relative">
              <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "Första två dagarna gick över förväntan – cirka 200 sålda direkt. Fram till igår har vi sålt 721 enheter. Grymt bra drag!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">P</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Patrik</div>
                  <div className="text-muted-foreground text-xs">ICA Skogås</div>
                </div>
              </div>
            </Card>
          </div>

          {/* SMS testimonials */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-sm">Äkta meddelanden från våra samarbetspartners</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer text-left group"
              >
                <div className="p-3">
                  <div className="overflow-hidden rounded-lg bg-muted/30 aspect-[3/4]">
                    <CloudinaryImage
                      publicId={testimonial.publicId}
                      fallbackPath={testimonial.fallback}
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      transformation="w_400,h_533,c_fill,q_auto,f_auto"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-white flex items-center gap-2 md:gap-3">
                  <CloudinaryImage
                    publicId="ica_logo"
                    fallbackPath="/landing/partners/ica.png"
                    alt="ICA"
                    className="h-5 md:h-6 w-auto flex-shrink-0"
                  />
                  <span className="font-semibold text-xs md:text-sm leading-tight">{testimonial.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Previous button */}
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Image */}
              <div
                className="max-w-lg w-full max-h-[85vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                  <CloudinaryImage
                    publicId={testimonials[currentIndex].publicId}
                    fallbackPath={testimonials[currentIndex].fallback}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    transformation="w_800,q_auto,f_auto"
                  />
                  <div className="px-4 py-3 bg-white flex items-center gap-3">
                    <CloudinaryImage
                      publicId="ica_logo"
                      fallbackPath="/landing/partners/ica.png"
                      alt="ICA"
                      className="h-6 w-auto flex-shrink-0"
                    />
                    <span className="font-semibold text-sm">{testimonials[currentIndex].name}</span>
                  </div>
                </div>

                {/* Dots indicator */}
                <div className="flex gap-2 mt-4">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Next button */}
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Left content */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-primary font-medium mb-4 uppercase tracking-wide text-sm">Kom igång idag</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Redo att öka er försäljning?
                </h2>
                <p className="text-lg text-white/70 mb-8 leading-relaxed">
                  Ansök idag och få din första leverans inom en vecka.
                  Inga dolda avgifter, ingen bindningstid.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
                  <Link to="/bli-aterforsaljare#form">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white transition-all text-lg px-8 w-full sm:w-auto">
                      Starta din ansökan
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/kontakt">
                    <Button size="lg" variant="outline" className="bg-white text-black hover:bg-white/90 border-white w-full sm:w-auto">
                      Kontakta oss
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Ingen bindningstid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Ingen startkostnad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Full returrätt</span>
                  </div>
                </div>
              </div>

              {/* Right stats card */}
              <div className="w-full md:w-auto">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">50+</div>
                      <div className="text-sm text-white/60">Butiker</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">150+</div>
                      <div className="text-sm text-white/60">Produkter</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">1-3</div>
                      <div className="text-sm text-white/60">Dagars leverans</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">100%</div>
                      <div className="text-sm text-white/60">Nöjdhetsgaranti</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
