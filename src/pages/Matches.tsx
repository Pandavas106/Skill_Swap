
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Video, Clock, Check, X } from "lucide-react";

// Sample data
const matchesData = [
  {
    id: 1,
    name: "Alex Johnson",
    skills: ["JavaScript", "React", "Node.js"],
    learningSkills: ["Python", "Machine Learning"],
    matchScore: 92,
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Jamie Smith",
    skills: ["UX Design", "Figma", "Adobe XD"],
    learningSkills: ["Frontend Development", "React"],
    matchScore: 87,
    lastActive: "1 day ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Taylor Davis",
    skills: ["Python", "Data Science", "SQL"],
    learningSkills: ["JavaScript", "React Native"],
    matchScore: 83,
    lastActive: "Just now",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Morgan Williams",
    skills: ["Digital Marketing", "SEO", "Content Writing"],
    learningSkills: ["Graphic Design", "Social Media Management"],
    matchScore: 79,
    lastActive: "3 days ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Riley Brown",
    skills: ["Photography", "Video Editing", "Adobe Premiere"],
    learningSkills: ["3D Modeling", "Animation"],
    matchScore: 75,
    lastActive: "5 hours ago",
    avatar: "/placeholder.svg"
  }
];

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
          {matchesData.map((match) => (
            <Card key={match.id} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-12 w-12">
                  <img src={match.avatar} alt={match.name} className="object-cover" />
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{match.name}</CardTitle>
                  <CardDescription>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {match.lastActive}
                    </span>
                  </CardDescription>
                </div>
                <Badge className="ml-auto" variant="secondary">
                  {match.matchScore}% Match
                </Badge>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="mb-3">
                  <p className="text-sm font-semibold mb-1 text-muted-foreground">Skills to share:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-primary/10">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1 text-muted-foreground">Wants to learn:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.learningSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-secondary/10">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4 gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-1">
                  <Video className="h-4 w-4" />
                  Video Chat
                </Button>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0">
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0">
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matches;
