import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button size="default" className="font-medium">
              Get started
            </Button>
            <Button variant="outline" size="default" className="font-medium">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
