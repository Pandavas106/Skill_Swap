
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MessageCircle, Video, Clock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Sample data
const matchesData = [
  {
    id: 1,
    name: "Alex Johnson",
    skills: [
      { name: "JavaScript", level: "Advanced" },
      { name: "React", level: "Intermediate" },
      { name: "Node.js", level: "Intermediate" }
    ],
    learningSkills: [
      { name: "Python", level: "Beginner" },
      { name: "Machine Learning", level: "Beginner" }
    ],
    matchScore: 92,
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg",
    status: "online"
  },
  {
    id: 2,
    name: "Jamie Smith",
    skills: [
      { name: "UX Design", level: "Advanced" },
      { name: "Figma", level: "Advanced" },
      { name: "Adobe XD", level: "Intermediate" }
    ],
    learningSkills: [
      { name: "Frontend Development", level: "Beginner" },
      { name: "React", level: "Beginner" }
    ],
    matchScore: 87,
    lastActive: "1 day ago",
    avatar: "/placeholder.svg",
    status: "away"
  },
  {
    id: 3,
    name: "Taylor Davis",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "Data Science", level: "Intermediate" },
      { name: "SQL", level: "Advanced" }
    ],
    learningSkills: [
      { name: "JavaScript", level: "Beginner" },
      { name: "React Native", level: "Beginner" }
    ],
    matchScore: 83,
    lastActive: "Just now",
    avatar: "/placeholder.svg",
    status: "online"
  },
  {
    id: 4,
    name: "Morgan Williams",
    skills: [
      { name: "Digital Marketing", level: "Advanced" },
      { name: "SEO", level: "Intermediate" },
      { name: "Content Writing", level: "Advanced" }
    ],
    learningSkills: [
      { name: "Graphic Design", level: "Beginner" },
      { name: "Social Media Management", level: "Intermediate" }
    ],
    matchScore: 79,
    lastActive: "3 days ago",
    avatar: "/placeholder.svg",
    status: "offline"
  },
  {
    id: 5,
    name: "Riley Brown",
    skills: [
      { name: "Photography", level: "Advanced" },
      { name: "Video Editing", level: "Intermediate" },
      { name: "Adobe Premiere", level: "Intermediate" }
    ],
    learningSkills: [
      { name: "3D Modeling", level: "Beginner" },
      { name: "Animation", level: "Beginner" }
    ],
    matchScore: 75,
    lastActive: "5 hours ago",
    avatar: "/placeholder.svg",
    status: "online"
  }
];

type SkillBadgeProps = {
  name: string;
  level: string;
  variant?: "sharing" | "learning";
}

const SkillBadge = ({ name, level, variant = "sharing" }: SkillBadgeProps) => {
  const isSharing = variant === "sharing";
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge 
          variant="outline"
          className={cn(
            "transition-all duration-300 hover:scale-105",
            isSharing 
              ? "bg-primary/10 hover:bg-primary/20" 
              : "bg-secondary/20 hover:bg-secondary/30",
            "cursor-default"
          )}
        >
          {name}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{name}</p>
          <div className="flex items-center gap-2">
            <span className={cn(
              "h-2 w-2 rounded-full",
              level === "Beginner" ? "bg-emerald-400" : 
              level === "Intermediate" ? "bg-blue-400" : "bg-violet-500"
            )} />
            <span className="text-xs text-muted-foreground">{level}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

type StatusBadgeProps = {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span 
      className={cn(
        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
        status === "online" ? "bg-green-500" : 
        status === "away" ? "bg-yellow-500" : "bg-muted"
      )}
    />
  );
};

const MatchCard = ({ match }: { match: typeof matchesData[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "transition-all duration-300 group backdrop-blur-sm",
        isHovered 
          ? "shadow-lg ring-1 ring-primary/20 translate-y-[-4px]" 
          : "hover:shadow-md",
        "overflow-hidden"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
        isHovered ? "opacity-10" : "opacity-0",
        "from-primary/20 to-accent/20"
      )} />
      
      <div className="absolute top-3 right-3 z-10">
        <Badge 
          className={cn(
            "bg-primary/80 text-primary-foreground font-medium",
            "shadow-sm transition-all duration-300",
          )}
        >
          {match.matchScore}% Match
        </Badge>
      </div>
      
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
            <AvatarImage src={match.avatar} alt={match.name} className="object-cover" />
            <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <StatusBadge status={match.status} />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold">{match.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3 opacity-70" />
            {match.lastActive}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-3">
        <div className="animate-fade-in">
          <p className="text-sm font-medium mb-1.5 text-muted-foreground">Skills to share:</p>
          <div className="flex flex-wrap gap-1.5">
            {match.skills.map((skill) => (
              <SkillBadge 
                key={skill.name} 
                name={skill.name} 
                level={skill.level}
                variant="sharing"
              />
            ))}
          </div>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <p className="text-sm font-medium mb-1.5 text-muted-foreground">Wants to learn:</p>
          <div className="flex flex-wrap gap-1.5">
            {match.learningSkills.map((skill) => (
              <SkillBadge 
                key={skill.name} 
                name={skill.name} 
                level={skill.level}
                variant="learning"
              />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 gap-2 flex-wrap">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-1 transition-all hover:bg-primary/10 hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Message</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-1 transition-all hover:bg-primary/10 hover:text-primary"
        >
          <Video className="h-4 w-4" />
          <span>Video Chat</span>
        </Button>
        
        <div className="flex gap-1.5 ml-auto">
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-auto px-2 h-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">Ignore</span>
          </Button>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-auto px-2 h-8 rounded-full text-green-500 hover:bg-green-500/10 hover:text-green-600"
          >
            <Check className="h-4 w-4 mr-1" />
            <span className="sr-only md:not-sr-only md:inline">Accept</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const Matches = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Your Skill Matches</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with people who have the skills you want to learn, and who want to learn what you already know.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchesData.map((match, index) => (
            <div 
              key={match.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matches;
