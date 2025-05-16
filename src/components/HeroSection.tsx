
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Users, Calendar, BookOpen } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern -z-10"></div>
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Peer-to-peer skill exchange</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              Exchange <span className="text-gradient">Skills</span>,<br />
              Grow <span className="text-gradient">Together</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              A peer-to-peer platform where you can teach what you know and learn what you don't. No payments, just skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto group transition-all duration-300 hover:scale-105">
                  Join SkillSwap
                  <Users className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="outline" className="w-full sm:w-auto group hover:bg-accent/40 transition-all duration-300">
                  Explore Skills
                  <BookOpen className="ml-2 h-4 w-4 transition-transform group-hover:rotate-6" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="glass-card rounded-2xl p-6 shadow-xl animate-float hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 p-4 hover:bg-accent/20 rounded-lg transition-colors duration-200">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg font-semibold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold">Create Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    List skills you can teach and skills you want to learn
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-4 hover:bg-accent/20 rounded-lg transition-colors duration-200">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg font-semibold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold">Get Verified</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete skill assessments to earn verification badges
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-4 hover:bg-accent/20 rounded-lg transition-colors duration-200">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg font-semibold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold">Find Matches</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover people with complementary skill sets
                  </p>
                </div>
                <div className="flex flex-col gap-3 p-4 hover:bg-accent/20 rounded-lg transition-colors duration-200">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg font-semibold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold">Exchange Skills</h3>
                  <p className="text-sm text-muted-foreground">
                    Schedule sessions and grow together
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-accent z-[-1] animate-pulse"></div>
            <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-primary/20 z-[-1]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
