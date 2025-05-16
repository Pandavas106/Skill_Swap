
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Mock data for skill listings
const skillListings = [
  {
    id: 1,
    user: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.9,
      verified: true
    },
    offering: {
      skill: "UX Design",
      level: "Advanced",
      category: "Design"
    },
    seeking: {
      skills: ["Python", "Data Analysis"]
    },
    mode: "Both",
    location: "San Francisco, CA"
  },
  {
    id: 2,
    user: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.7,
      verified: true
    },
    offering: {
      skill: "JavaScript",
      level: "Advanced",
      category: "Programming"
    },
    seeking: {
      skills: ["Digital Marketing", "Content Writing"]
    },
    mode: "Online",
    location: "Remote"
  },
  {
    id: 3,
    user: {
      name: "Sophia Williams",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.8,
      verified: false
    },
    offering: {
      skill: "Spanish Language",
      level: "Intermediate",
      category: "Languages"
    },
    seeking: {
      skills: ["English Grammar", "Essay Writing"]
    },
    mode: "In-Person",
    location: "Boston, MA"
  },
  {
    id: 4,
    user: {
      name: "Raj Patel",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5.0,
      verified: true
    },
    offering: {
      skill: "Financial Modeling",
      level: "Advanced",
      category: "Finance"
    },
    seeking: {
      skills: ["Mobile App Development", "UI/UX Design"]
    },
    mode: "Online",
    location: "Remote"
  },
  {
    id: 5,
    user: {
      name: "Olivia Martinez",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.6,
      verified: true
    },
    offering: {
      skill: "Guitar Lessons",
      level: "Beginner",
      category: "Music"
    },
    seeking: {
      skills: ["Photography", "Video Editing"]
    },
    mode: "Both",
    location: "Chicago, IL"
  },
  {
    id: 6,
    user: {
      name: "Liam Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4.5,
      verified: false
    },
    offering: {
      skill: "Data Science",
      level: "Intermediate",
      category: "Technology"
    },
    seeking: {
      skills: ["Public Speaking", "Presentation Skills"]
    },
    mode: "Online",
    location: "Remote"
  }
];

// Skill categories for filter
const categories = [
  "All Categories",
  "Technology",
  "Design",
  "Languages",
  "Music",
  "Art",
  "Business",
  "Finance",
  "Marketing",
  "Health & Fitness",
  "Academic"
];

// Levels for filter
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

// Modes for filter
const modes = ["All Modes", "Online", "In-Person", "Both"];

const SkillCard = ({ listing }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={listing.user.avatar} alt={listing.user.name} />
            <AvatarFallback>{listing.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{listing.user.name}</p>
              {listing.user.verified && (
                <Badge variant="outline" className="h-5 text-xs border-primary/30 text-primary">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(listing.user.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                <span className="ml-1">{listing.user.rating}</span>
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Teaching</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-skill-beginner">{listing.offering.skill}</Badge>
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                {listing.offering.level}
              </Badge>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Learning</p>
            <div className="flex flex-wrap gap-2">
              {listing.seeking.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              <span>{listing.mode}</span>
            </div>
          </div>
          
          <Button className="w-full mt-4">Request Swap</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedMode, setSelectedMode] = useState("All Modes");

  // Filter listings based on search and filters
  const filteredListings = skillListings.filter((listing) => {
    const matchesSearch =
      listing.offering.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All Categories" ||
      listing.offering.category === selectedCategory;
    
    const matchesLevel =
      selectedLevel === "All Levels" ||
      listing.offering.level === selectedLevel;
    
    const matchesMode =
      selectedMode === "All Modes" ||
      listing.mode === selectedMode;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesMode;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Skill Marketplace</h1>
            <p className="text-muted-foreground">
              Browse through the skills offered by our community members and find your perfect match
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">All Skills</TabsTrigger>
                <TabsTrigger value="verified">Verified Only</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search skills or users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="category" className="text-sm">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="level" className="text-sm">Skill Level</Label>
                <Select
                  value={selectedLevel}
                  onValueChange={setSelectedLevel}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="mode" className="text-sm">Teaching Mode</Label>
                <Select
                  value={selectedMode}
                  onValueChange={setSelectedMode}
                >
                  <SelectTrigger id="mode">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {modes.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <SkillCard key={listing.id} listing={listing} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="verified">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings
                  .filter((listing) => listing.user.verified)
                  .map((listing) => (
                    <SkillCard key={listing.id} listing={listing} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommended">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings
                  .filter((listing) => listing.user.rating >= 4.8)
                  .map((listing) => (
                    <SkillCard key={listing.id} listing={listing} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
