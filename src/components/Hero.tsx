import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section className="relative min-h-screen bg-gradient-hero pt-16 pb-20">
      <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <a href="https://prebuiltui.com">
          <img src="/logo.svg" alt="Logo" />
        </a>

        <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
          <a href="#" className="hover:text-indigo-600 transition">Home</a>
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#testimonials" className="hover:text-indigo-600 transition">Testimonials</a>
          <a href="#cta" className="hover:text-indigo-600 transition">Contact</a>
        </div>

        <div className="flex gap-2">
          <a href="#" className="hidden md:block px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white">
            Get started
          </a>
          <a href="#" className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900" >
            Login
          </a>
        </div>

        <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
      </nav>
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
