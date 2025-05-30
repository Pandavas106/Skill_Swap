import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MessageCircle, Video, Clock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/contexts/AuthContext";
// import { Tables } from "@/integrations/supabase/types"; // Import Supabase types

// Sample data (will be replaced)
const matchesData = [
  {
    id: "1",
    full_name: "Alex Johnson",
    avatar_url: "/avatars/01.png", // Replace with actual image path if available
    skills_teach: ["JavaScript", "React", "Node.js"],
    skills_learn: ["Python", "Machine Learning"],
    matchScore: 92,
    lastActive: "2 hours ago",
    status: "online",
  },
  {
    id: "2",
    full_name: "Jamie Smith",
    avatar_url: "/avatars/02.png", // Replace with actual image path if available
    skills_teach: ["UX Design", "Figma", "Adobe XD"],
    skills_learn: ["Frontend Development", "React"],
    matchScore: 87,
    lastActive: "1 day ago",
    status: "away",
  },
  {
    id: "3",
    full_name: "Taylor Davis",
    avatar_url: "/avatars/03.png", // Replace with actual image path if available
    skills_teach: ["Python", "Data Science", "SQL"],
    skills_learn: ["JavaScript", "React Native"],
    matchScore: 83,
    lastActive: "Just now",
    status: "online",
  },
  {
    id: "4",
    full_name: "Morgan Williams",
    avatar_url: "/avatars/04.png", // Replace with actual image path if available
    skills_teach: ["Marketing", "Content Creation"],
    skills_learn: ["SEO", "Social Media Strategy"],
    matchScore: 79,
    lastActive: "3 days ago",
    status: "offline",
  },
  {
    id: "5",
    full_name: "Riley Brown",
    avatar_url: "/avatars/05.png", // Replace with actual image path if available
    skills_teach: ["Graphic Design", "Illustration"],
    skills_learn: ["UI Design", "Animation"],
    matchScore: 75,
    lastActive: "5 hours ago",
    status: "online",
  },
];

// type MatchProfile = Tables<'profiles'> & { matchScore?: number }; // Augment profile type with matchScore

type SkillBadgeProps = {
  name: string;
  // level: string; // Assuming level isn't available for matched users in this fetch
  variant?: "sharing" | "learning";
}

// Updated SkillBadge props
const SkillBadge = ({ name, variant = "sharing" }: SkillBadgeProps) => {
  const isSharing = variant === "sharing";

  // Removing HoverCard logic and level display as we don't have level here
  return (
    <Badge
      variant="outline"
      className={cn(
        "transition-all duration-300 hover:scale-105 cursor-default",
        isSharing
          ? "bg-primary/10 hover:bg-primary/20" // Skills they teach (you can learn)
          : "bg-secondary/20 hover:bg-secondary/30" // Skills they want to learn (you can teach)
      )}
    >
      {name}
    </Badge>
  );
};

type StatusBadgeProps = {
  // Assuming status comes from elsewhere or is hardcoded for now
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
// Updated MatchCard props
const MatchCard = ({ match }: { match: { 
  id: string;
  skills_teach?: string[];
  skills_learn?: string[];
  avatar_url?: string;
  full_name?: string;
  matchScore?: number;
} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Provide default values for optional columns if null
  const skillsTeach = match.skills_teach || [];
  const skillsLearn = match.skills_learn || [];
  const avatarUrl = match.avatar_url || '/placeholder.svg';
  const fullName = match.full_name || 'No Name';
  const matchScore = match.matchScore || 0;

  const handleChatClick = () => {
    navigate(`/chat?user=${match.id}`);
  };

  // Assuming status and lastActive are not fetched, using placeholders
  const status = 'offline'; // Placeholder status
  const lastActive = 'unknown'; // Placeholder last active


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
          {matchScore}% Match {/* Display calculated matchScore */}
        </Badge>
      </div>

      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-background shadow-sm">
            <AvatarImage src={avatarUrl} alt={fullName} className="object-cover" />
            <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <StatusBadge status={status} />
        </div>

        <div>
          <h3 className="text-xl font-semibold">{fullName}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3 opacity-70" />
            {lastActive}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-3">
        <div className="animate-fade-in">
          <p className="text-sm font-medium mb-1.5 text-muted-foreground">Skills to share:</p>
          <div className="flex flex-wrap gap-1.5">
            {skillsTeach.map((skillName) => (
              <SkillBadge
                key={skillName} // Use skillName as key
                name={skillName}
                variant="sharing"
              />
            ))}
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <p className="text-sm font-medium mb-1.5 text-muted-foreground">Wants to learn:</p>
          <div className="flex flex-wrap gap-1.5">
            {skillsLearn.map((skillName) => (
              <SkillBadge
                key={skillName} // Use skillName as key
                name={skillName}
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
          onClick={handleChatClick}
        >
          <MessageCircle className="h-4 w-4" />
          <span>Chat Now</span>
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

// Function to find skill swap matches based on reciprocal overlap
// export async function findSkillSwapMatches(
// ... existing code ...
//     return [];
// }

const Matches = () => {
  // const { user } = useAuth();
  // const [mySkills, setMySkills] = useState<{ teach: string[], learn: string[] } | null>(null);
  // const [matches, setMatches] = useState<MatchProfile[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchAndSetMatches() {
  //     if (!user) {
  //       setLoading(false);
  //       setMySkills(null);
  //       setMatches([]);
  //       return;
  //     }

  //     setLoading(true);
  //     setError(null);

  //     try {
  //       // 1. Fetch current user's skills
  //       const { data: myProfileData, error: myProfileError } = await supabase
  //         .from('profiles')
  //         .select('skills_teach, skills_learn')
  //         .eq('id', user.id)
  //         .single();

  //       if (myProfileError) {
  //         throw myProfileError;
  //       }

  //       const teachSkills = myProfileData?.skills_teach || [];
  //       const learnSkills = myProfileData?.skills_learn || [];
  //       setMySkills({ teach: teachSkills, learn: learnSkills });

  //       // 2. Use the new findSkillSwapMatches function
  //       const fetchedMatches = await findSkillSwapMatches(user.id, teachSkills, learnSkills);

  //       // Calculate match score for each fetched match (optional, depending on desired display)
  //       const matchesWithScore = fetchedMatches.map(match => {
  //         const matchTeachSkills = match.skills_teach || [];
  //         const matchLearnSkills = match.skills_learn || [];

  //         const teachOverlap = matchTeachSkills.filter(skill => learnSkills.includes(skill));
  //         const learnOverlap = matchLearnSkills.filter(skill => teachSkills.includes(skill));

  //         const totalMySkills = teachSkills.length + learnSkills.length;
  //         let matchScore = 0;
  //         if (totalMySkills > 0) {
  //           matchScore = Math.round(((teachOverlap.length + learnOverlap.length) / totalMySkills) * 100);
  //         }

  //         return { ...match, matchScore };
  //       });

  //       setMatches(matchesWithScore);

  //     } catch (err: any) {
  //       console.error("Error fetching matches:", err);
  //       setError(err.message);
  //       setMatches([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchAndSetMatches();

  // }, [user]); // Re-run effect if user changes

  // if (loading) {
  //   return (
  //      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#28243c] via-[#322c54] to-[#3b2f5e]">
  //        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  //      </div>
  //    );
  // }

  // if (error) {
  //   return <div className="min-h-screen flex items-center justify-center text-rose-400">Error loading matches: {error}</div>;
  // }

  // if (!user) {
  //      return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Please log in to view matches.</div>;
  // }

  // Conditionally render based on whether mySkills has been loaded and if there are matches
  //  if (mySkills && mySkills.teach.length === 0 && mySkills.learn.length === 0) {
  //        return (
  //             <div className="min-h-screen flex items-center justify-center text-muted-foreground">
  //                <div className="text-center">
  //                     <h2 className="text-2xl font-bold mb-4">Complete Your Profile!</h2>
  //                     <p>Please add skills you can teach and want to learn to find matches.</p>
  //                </div>
  //            </div>
  //        );
  //   }

  //  if (matches.length === 0 && mySkills && (mySkills.teach.length > 0 || mySkills.learn.length > 0)) {
  //        return (
  //            <div className="min-h-screen flex items-center justify-center text-muted-foreground">
  //                <div className="text-center">
  //                     <h2 className="text-2xl font-bold mb-4">No matches found... yet!</h2>
  //                     <p>Try adding more skills to your profile to find people who can teach you or learn from you.</p>
  //                </div>
  //            </div>
  //        );
  //    }

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
