
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Star, MessageSquare, CheckCircle, Award, Clock, Shield } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary group-hover:text-white transition-colors" />,
      title: "Smart Matchmaking",
      description: "Our AI-powered matching algorithm connects you with the perfect learning partners based on your skills and interests."
    },
    {
      icon: <Star className="h-6 w-6 text-primary group-hover:text-white transition-colors" />,
      title: "Skill Verification",
      description: "Earn verification badges by passing skill assessments to stand out as a qualified mentor."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary group-hover:text-white transition-colors" />,
      title: "Seamless Scheduling",
      description: "Easily arrange and manage learning sessions with an integrated calendar system."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary group-hover:text-white transition-colors" />,
      title: "Secure Messaging",
      description: "Communicate directly with potential matches through our built-in messaging platform."
    }
  ];

  return (
    <section className="py-20" id="features">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Star className="inline-block h-4 w-4 mr-2" /> Premium Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features Designed for Learning</h2>
          <p className="text-muted-foreground">
            SkillSwap provides all the tools you need to find learning partners and exchange knowledge effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-primary/20 shadow-md hover:shadow-xl transition-shadow duration-300 group bg-gradient-to-br from-white to-accent/10 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors duration-300"></div>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
