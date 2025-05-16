
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 -z-10"></div>
          <div className="gradient-border p-12 md:p-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-8">
              Join SkillSwap today and connect with people who can help you grow while sharing your expertise with others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="min-w-32">
                  Get Started
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="min-w-32">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
