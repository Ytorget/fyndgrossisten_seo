import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-4 text-2xl font-semibold">Sidan kunde inte hittas</p>
        <p className="mb-8 text-muted-foreground">Sidan du letar efter verkar inte finnas.</p>
        <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-primary transition-all hover:-translate-y-1">
          Tillbaka till startsidan
        </a>
      </div>
    </div>
  );
};

export default NotFound;
