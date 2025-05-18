
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, BookOpen, BookText, Award, Clock, BarChart, TestTube } from "lucide-react";

// Sample test data
const availableTests = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control flow",
    questionCount: 30,
    estimatedTime: "25 min",
    level: "Beginner"
  },
  {
    id: 2,
    title: "React Development",
    description: "Assess your React skills including components, hooks, and state management",
    questionCount: 25,
    estimatedTime: "30 min",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "UX Design Principles",
    description: "Evaluate your understanding of user experience design concepts and best practices",
    questionCount: 20,
    estimatedTime: "20 min",
    level: "Beginner"
  },
  {
    id: 4,
    title: "Advanced Data Structures",
    description: "Challenge yourself with complex algorithms and data structure problems",
    questionCount: 15,
    estimatedTime: "40 min",
    level: "Advanced"
  }
];

const inProgressTests = [
  {
    id: 5,
    title: "Python for Data Science",
    description: "Learn essential Python libraries for data analysis and visualization",
    progress: 35,
    remainingQuestions: 18,
    totalQuestions: 25,
    lastAttempted: "2 days ago"
  }
];

const completedTests = [
  {
    id: 6,
    title: "HTML & CSS Basics",
    description: "Test your knowledge of web fundamentals",
    score: 92,
    completedOn: "May 15, 2025",
    badge: "Expert"
  },
  {
    id: 7,
    title: "SQL Database Design",
    description: "Demonstrate your SQL and database modeling skills",
    score: 78,
    completedOn: "May 10, 2025",
    badge: "Proficient"
  }
];

const Test = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Skill Assessment Tests</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take tests to verify your skills and showcase your expertise to potential skill matches
          </p>
        </div>

        <Tabs defaultValue="available">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="available">Available Tests</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableTests.map((test) => (
                <Card key={test.id} className="transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <TestTube className="h-5 w-5 text-primary" />
                        {test.title}
                      </CardTitle>
                      <Badge variant={
                        test.level === "Beginner" ? "outline" : 
                        test.level === "Intermediate" ? "secondary" : 
                        "default"
                      }>
                        {test.level}
                      </Badge>
                    </div>
                    <CardDescription>{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <BookText className="h-4 w-4 text-muted-foreground" />
                        <span>{test.questionCount} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{test.estimatedTime}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Test</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress">
            {inProgressTests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inProgressTests.map((test) => (
                  <Card key={test.id} className="transition-all duration-300 hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TestTube className="h-5 w-5 text-primary" />
                        {test.title}
                      </CardTitle>
                      <CardDescription>{test.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{test.progress}%</span>
                        </div>
                        <Progress value={test.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>{test.remainingQuestions} of {test.totalQuestions} remaining</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Last attempted {test.lastAttempted}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Continue Test</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No tests in progress</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any unfinished tests at the moment.
                </p>
                <Button variant="outline" onClick={() => document.querySelector('button[value="available"]')?.click()}>
                  Browse Available Tests
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedTests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedTests.map((test) => (
                  <Card key={test.id} className="transition-all duration-300 hover:shadow-md border-t-4 border-t-primary">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{test.title}</CardTitle>
                        <Badge className="bg-primary/20 text-primary border-primary">
                          {test.badge}
                        </Badge>
                      </div>
                      <CardDescription>{test.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Your Score</span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{test.score}%</span>
                          {test.score >= 80 && <CheckCircle className="h-5 w-5 text-green-500" />}
                        </div>
                      </div>
                      
                      <Progress 
                        value={test.score} 
                        className="h-2" 
                        indicatorClassName={
                          test.score >= 80 ? "bg-green-500" : 
                          test.score >= 60 ? "bg-amber-500" : "bg-red-500"
                        } 
                      />
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>Certificate Earned</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>Completed on {test.completedOn}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <BarChart className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button className="flex-1">
                        <TestTube className="mr-2 h-4 w-4" />
                        Retake Test
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No completed tests yet</h3>
                <p className="text-muted-foreground mb-6">
                  Complete tests to earn skill badges and showcase your expertise.
                </p>
                <Button variant="outline" onClick={() => document.querySelector('button[value="available"]')?.click()}>
                  Browse Available Tests
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Test;
