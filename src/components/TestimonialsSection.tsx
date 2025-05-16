
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
  className?: string;
}

function Testimonial({ content, author, role, avatar, className }: TestimonialProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-6 flex flex-col h-full">
        <blockquote className="text-lg font-medium mb-4 flex-1">
          "{content}"
        </blockquote>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      content: "SkillSwap helped me improve my programming skills by teaching Spanish to a senior developer. It's the most efficient learning method I've tried.",
      author: "Alex Johnson",
      role: "Computer Science Student",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      content: "As a designer wanting to learn data analysis, I found the perfect match on SkillSwap. I taught UX principles while learning Python. Win-win!",
      author: "Maria Garcia",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      content: "The verification system ensures that you're learning from people who actually know their stuff. That quality assurance is invaluable.",
      author: "David Kim",
      role: "Marketing Professional",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground">
            Join thousands of students and professionals who are already growing through skill exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              className={index === 1 ? "md:translate-y-8" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
