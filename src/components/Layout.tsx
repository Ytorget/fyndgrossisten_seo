import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "@/hooks/useSession";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useSession();

  const handleLogout = async () => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken || '',
        },
        credentials: 'include',
      });
      
      window.location.href = '/logga-in';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/sortiment", label: "Sortiment" },
    { to: "/fyndladan", label: "Fyndlådan" },
    { to: "/om-oss", label: "Om oss" },
    { to: "/kontakt", label: "Kontakt" },
  ];

  // Pages with light backgrounds should always have opaque header
  const isLightBackgroundPage = location.pathname === '/logga-in' || location.pathname === '/glomt-losenord';

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isLightBackgroundPage
            ? "bg-dark/95 backdrop-blur-lg shadow-lg"
            : "bg-gradient-to-b from-dark/70 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/landing/logo.png" alt="Fynd Grossisten" className="h-16 w-auto" />
              <h1 className="text-2xl font-bold text-white bg-clip-text">
                Fynd Grossisten
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/90 hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
              {isLoggedIn ? (
                    <>
                      <a href="/app/">
                        <Button className="bg-gradient-primary text-white hover:shadow-primary transition-all hover:-translate-y-0.5">
                          Gå till din dashboard
                        </Button>
                      </a>
                      <Button 
                        variant="outline" 
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        onClick={handleLogout}
                      >
                        Logga ut
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/bli-aterforsaljare#form">
                        <Button className="bg-gradient-primary text-white hover:shadow-primary transition-all hover:-translate-y-0.5">
                          Bli återförsäljare
                        </Button>
                      </Link>
                      <Link to="/logga-in">
                        <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                          Logga in
                        </Button>
                      </Link>
                    </>
                  )}
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark text-white">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {isLoggedIn ? (
                        <>
                          <a href="/app/" onClick={() => setMobileOpen(false)}>
                            <Button className="w-full bg-gradient-primary text-white">
                              Gå till din dashboard
                            </Button>
                          </a>
                          <Button 
                            variant="outline" 
                            className="w-full bg-white/10 border-white/30 text-white"
                            onClick={() => {
                              setMobileOpen(false);
                              handleLogout();
                            }}
                          >
                            Logga ut
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link to="/bli-aterforsaljare#form" onClick={() => setMobileOpen(false)}>
                            <Button className="w-full bg-gradient-primary text-white">
                              Bli återförsäljare
                            </Button>
                          </Link>
                          <Link to="/logga-in" onClick={() => setMobileOpen(false)}>
                            <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white">
                              Logga in
                            </Button>
                          </Link>
                        </>
                      )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Fynd Grossisten</h3>
              <p className="text-white/70 mb-4">
                Sveriges ledande grossist för lågprisvaror till återförsäljare.
              </p>
              <p className="text-white/50 text-sm">
                Org.nr: 559427-0083
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Snabblänkar</h4>
              <ul className="space-y-3 text-white/70">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href="mailto:info@fyndgrossisten.se" className="hover:text-primary transition-colors">
                    info@fyndgrossisten.se
                  </a>
                </li>
                <li>
                  <a href="tel:+46852512923" className="hover:text-primary transition-colors">
                    08-525 129 23
                  </a>
                </li>
                <li className="text-white/50 text-sm pt-2">
                  Mån-fre: 08:00-17:00
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bli återförsäljare</h4>
              <p className="text-white/70 mb-4 text-sm">
                Ansök idag och få tillgång till vårt kompletta sortiment.
              </p>
              <Link to="/bli-aterforsaljare#form" className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Ansök nu
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Fynd Grossisten AB. Alla rättigheter förbehållna.
            </p>
            <div className="flex gap-6 text-white/50 text-sm">
              <Link to="/integritetspolicy" className="hover:text-white transition-colors">
                Integritetspolicy
              </Link>
              <Link to="/villkor" className="hover:text-white transition-colors">
                Allmänna villkor
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
