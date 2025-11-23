import { TrendingUp, Shield, Download } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Get instant insights into your finances with live dashboards.",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "End-to-end encryption, 2FA, compliance with GDPR standards.",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      icon: Download,
      title: "Customizable Reports",
      description: "Export professional, audit-ready financial reports for tax or internal review.",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop" 
                    alt="Professional working" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=600&fit=crop" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Feature cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border border-border ${feature.bgColor} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${feature.color} bg-background/50`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
