
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoIcon, MessageSquare, Clock, Calendar as CalendarIcon, X } from "lucide-react";

// Sample schedule data
const upcomingEvents = [
  {
    id: 1,
    title: "JavaScript Basics",
    type: "teaching",
    participant: "Alex Johnson",
    date: "May 20, 2025",
    time: "10:00 AM - 11:30 AM",
    avatar: "/placeholder.svg",
    sessionType: "video"
  },
  {
    id: 2,
    title: "UX Design Principles",
    type: "learning",
    participant: "Jamie Smith",
    date: "May 21, 2025",
    time: "2:00 PM - 3:30 PM",
    avatar: "/placeholder.svg",
    sessionType: "video"
  },
  {
    id: 3,
    title: "React Component Design",
    type: "teaching",
    participant: "Morgan Williams",
    date: "May 23, 2025",
    time: "11:00 AM - 12:30 PM",
    avatar: "/placeholder.svg",
    sessionType: "in-person"
  }
];

const pastEvents = [
  {
    id: 4,
    title: "Python Data Structures",
    type: "learning",
    participant: "Taylor Davis",
    date: "May 15, 2025",
    time: "3:00 PM - 4:30 PM",
    avatar: "/placeholder.svg",
    sessionType: "video"
  },
  {
    id: 5,
    title: "Digital Marketing Strategies",
    type: "learning",
    participant: "Riley Brown",
    date: "May 12, 2025",
    time: "1:00 PM - 2:30 PM",
    avatar: "/placeholder.svg",
    sessionType: "video"
  }
];

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3">Your Learning Schedule</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your upcoming and past skill exchange sessions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view or schedule sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md"
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule New Session
              </Button>
            </CardFooter>
          </Card>

          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                <TabsTrigger value="past">Past Sessions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className={`h-1 ${event.type === "teaching" ? "bg-primary" : "bg-secondary"}`}></div>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <img src={event.avatar} alt={event.participant} className="object-cover" />
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="flex items-center justify-between">
                          {event.title}
                          <Badge variant={event.type === "teaching" ? "default" : "secondary"}>
                            {event.type === "teaching" ? "Teaching" : "Learning"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>with {event.participant}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm mb-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 opacity-70" />
                        <span>{event.time}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2 border-t bg-muted/40 px-6 py-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      {event.sessionType === "video" ? (
                        <Button size="sm" className="flex-1">
                          <VideoIcon className="mr-2 h-4 w-4" />
                          Join Session
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-4">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden opacity-80">
                    <div className={`h-1 ${event.type === "teaching" ? "bg-primary" : "bg-secondary"}`}></div>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <img src={event.avatar} alt={event.participant} className="object-cover" />
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="flex items-center justify-between">
                          {event.title}
                          <Badge variant={event.type === "teaching" ? "default" : "secondary"} className="opacity-70">
                            {event.type === "teaching" ? "Teaching" : "Learning"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>with {event.participant}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm mb-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 opacity-70" />
                        <span>{event.time}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2 border-t bg-muted/40 px-6 py-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Reschedule
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
