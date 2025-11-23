import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex -space-x-2">
              <Avatar className="w-9 h-9 border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">U1</AvatarFallback>
              </Avatar>
              <Avatar className="w-9 h-9 border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">U2</AvatarFallback>
              </Avatar>
              <Avatar className="w-9 h-9 border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">U3</AvatarFallback>
              </Avatar>
              <Avatar className="w-9 h-9 border-2 border-background">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">U4</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-star-yellow text-star-yellow" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Used by 10,000+ users</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Build stunning websites with{" "}
            <span className="text-brand-blue">PrebuiltUI</span> Components.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Explore a growing library of over 320+ beautifully crafted, customizable components.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button size="lg" className="gap-2 text-base px-8 font-medium">
              Get started
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 text-base px-8 font-medium">
              <Play className="w-4 h-4" />
              Try demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <p className="text-sm text-muted-foreground mb-6">
              Trusting by leading brands, including
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              <div className="text-2xl font-semibold text-muted-foreground">Instagram</div>
              <div className="text-2xl font-semibold text-muted-foreground">Framer</div>
              <div className="text-2xl font-semibold text-muted-foreground">Microsoft</div>
              <div className="text-2xl font-semibold text-muted-foreground">HUAWEI</div>
              <div className="text-2xl font-semibold text-muted-foreground">Walmart</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
