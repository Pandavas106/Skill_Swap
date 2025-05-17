
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      toast({
        title: "Account created successfully!",
        description: "Welcome to SkillSwap. Let's set up your profile.",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="relative flex-grow flex flex-col justify-center items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-purple-600 to-indigo-800 z-0">
          {/* Skill-related background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating skills bubbles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full flex items-center justify-center text-xs font-medium text-white bg-white/10 backdrop-blur-sm border border-white/20 animate-float"
                style={{
                  width: Math.random() * 60 + 40 + "px",
                  height: Math.random() * 60 + 40 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.7 + 0.3,
                  animationDuration: Math.random() * 10 + 5 + "s",
                  animationDelay: Math.random() * 5 + "s"
                }}
              >
                {["HTML", "CSS", "JS", "React", "UI/UX", "Design", "Python", "Node", "Java", "Writing", "Art", "Music", "Photo", "Video", "Data"][i % 15]}
              </div>
            ))}
          </div>
          
          {/* Connection lines representing skill connections */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <line x1="10%" y1="30%" x2="30%" y2="60%" stroke="url(#skill-gradient)" strokeWidth="1" />
            <line x1="30%" y1="60%" x2="50%" y2="20%" stroke="url(#skill-gradient)" strokeWidth="1" />
            <line x1="50%" y1="20%" x2="70%" y2="40%" stroke="url(#skill-gradient)" strokeWidth="1" />
            <line x1="70%" y1="40%" x2="90%" y2="10%" stroke="url(#skill-gradient)" strokeWidth="1" />
            <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="url(#skill-gradient)" strokeWidth="1" />
            <line x1="40%" y1="60%" x2="60%" y2="80%" stroke="url(#skill-gradient)" strokeWidth="1" />
            <line x1="60%" y1="80%" x2="80%" y2="70%" stroke="url(#skill-gradient)" strokeWidth="1" />
          </svg>
          
          {/* Overlay gradient for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/70"></div>
        </div>
        
        {/* Signup Card */}
        <div className="flex w-full max-w-5xl mx-auto relative z-10 px-4">
          {/* Left Column with Image and Tagline */}
          <Card className="hidden md:flex flex-col justify-between p-8 flex-1 bg-indigo-950/50 backdrop-blur-md border-indigo-500/20 text-white">
            <div className="mb-auto">
              <h2 className="text-2xl font-bold font-playfair mb-2">SkillSwap</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-indigo-300 rounded-full mb-6"></div>
            </div>
            
            <div className="space-y-6 max-w-sm">
              <h3 className="text-3xl font-playfair leading-tight">
                Connect, Learn, and Grow Together
              </h3>
              <p className="text-indigo-100/90">
                Join our community of skill enthusiasts where you can exchange knowledge and master new abilities.
              </p>
              
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>
          </Card>
          
          {/* Right Column with Signup Form */}
          <Card className="flex-1 backdrop-blur-md bg-white/10 border-white/30 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
              <CardDescription className="text-purple-100">
                Enter your information to get started with SkillSwap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/30 border-white/30 text-white placeholder:text-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/30 border-white/30 text-white placeholder:text-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/30 border-white/30 text-white placeholder:text-purple-200"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    required 
                    className="border-white/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none text-white"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-purple-300 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-purple-300 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-purple-100">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/20" disabled={isLoading}>
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/20" disabled={isLoading}>
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center pb-6">
              <div className="text-sm text-purple-100">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-white underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
