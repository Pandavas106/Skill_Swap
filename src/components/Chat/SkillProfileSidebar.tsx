import React, { useState } from 'react';
import { Bookmark, FileText, Link, Square, CheckSquare, Brain, Pin, ListTodo, CalendarDays, User, Star } from 'lucide-react';

const SkillProfileSidebar = () => {
  // Placeholder state for notes
  const [notes, setNotes] = useState('This is a shared space for notes regarding our skill exchange sessions. We can add tips, goals, resources, or anything else relevant here.');

  // Placeholder data
  const skillProfile = {
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg', // Placeholder avatar
    name: 'Alex Johnson', // Placeholder name
    description: 'Passionate about MERN stack development and eager to learn new design principles.', // Placeholder description
    canTeach: 'React.js',
    wantsToLearn: 'UI Design',
    rating: '4.8',
    sessions: 12,
    skillLevel: 'Intermediate', // Placeholder skill level
  };

  const pinnedResources = [
    { id: '1', type: 'file', label: 'Async JS Cheatsheet', icon: <FileText className="h-4 w-4 text-blue-500" /> },
    { id: '2', type: 'link', label: 'Tailwind CSS Docs', icon: <Link className="h-4 w-4 text-green-500" /> },
  ];

  const [todoItems, setTodoItems] = useState([
    { id: '1', label: 'Watch async JS video', completed: false },
    { id: '2', label: 'Review design feedback', completed: true },
     { id: '3', label: 'Practice Tailwind classes', completed: false },
  ]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleTodoToggle = (id: string) => {
    setTodoItems(todoItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Placeholder for adding new items - no functionality yet
  const handleAddTask = () => { console.log('Add Task clicked'); /* Implement later */ };
  const handleAddResource = () => { console.log('Add Resource clicked'); /* Implement later */ };


  return (
    <div className="p-6 flex flex-col overflow-y-auto space-y-6 bg-gray-50 dark:bg-gray-800">

      {/* Skill Profile Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-5 border border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-foreground"><Brain className="h-6 w-6 text-purple-600" /> Skill Profile</h3>
        <div className="flex items-center gap-5 mb-6">
           <img src={skillProfile.avatar} alt={skillProfile.name} className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-primary/50 dark:border-primary/70" />
            <div className="flex-1">
              <p className="font-bold text-xl text-foreground mb-1">{skillProfile.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{skillProfile.description}</p>
            </div>
        </div>
        <div className="space-y-3 text-sm text-foreground">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-purple-200 text-purple-900 dark:bg-purple-700 dark:text-purple-100 rounded-full text-xs font-semibold min-w-[100px] text-center">Can Teach:</span>
            <span>{skillProfile.canTeach}</span>
          </div>
          <div className="flex items-center gap-3">
             <span className="px-3 py-1.5 bg-blue-200 text-blue-900 dark:bg-blue-700 dark:text-blue-100 rounded-full text-xs font-semibold min-w-[100px] text-center">Wants to Learn:</span>
             <span>{skillProfile.wantsToLearn}</span>
          </div>
           <div className="flex items-center gap-3 mt-4">
             <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
             <span className="font-semibold">Rating:</span>
             <span>{skillProfile.rating} / 5 <span className="text-muted-foreground">({skillProfile.sessions} sessions)</span></span>
          </div>
           <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-foreground rounded-full text-xs font-semibold">Skill Level: {skillProfile.skillLevel}</span>
          </div>
        </div>
      </div>

      {/* Notes & Tasks Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-5 flex-1 flex flex-col border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-5 flex items-center gap-3 text-foreground"><FileText className="h-6 w-6 text-blue-600" /> Shared Notes & Resources</h3>
        <textarea
          className="w-full p-4 rounded-lg bg-accent/30 dark:bg-accent/40 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm resize-none flex-1 mb-5 placeholder:text-muted-foreground"
          value={notes}
          onChange={handleNoteChange}
          placeholder="Write shared notes here..."
          rows={6}
        />

        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground"><Pin className="h-5 w-5 text-green-600" /> Pinned Resources</h4>
        <div className="space-y-3 text-sm mb-6">
          {pinnedResources.map(resource => (
            <div key={resource.id} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              {resource.icon}
              <span className="flex-1 truncate">{resource.label}</span>
            </div>
          ))}
           {/* Placeholder Add Resource Button */}
           <button onClick={handleAddResource} className="flex items-center gap-2 text-primary hover:underline text-sm mt-3"><Bookmark className="h-4 w-4" /> Add Resource</button>
        </div>

        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground"><ListTodo className="h-5 w-5 text-red-600" /> Tasks</h4>
         <div className="space-y-3 text-sm mb-6">
           {todoItems.map(item => (
             <div key={item.id} className="flex items-center gap-3">
               <button onClick={() => handleTodoToggle(item.id)} className="p-1 rounded-md hover:bg-accent/50 transition-colors flex-shrink-0">
                 {item.completed ? <CheckSquare className="h-5 w-5 text-green-600" /> : <Square className="h-5 w-5 text-muted-foreground" />}
               </button>
               <span className={item.completed ? 'line-through text-muted-foreground/70' : 'text-foreground'}>{item.label}</span>
             </div>
           ))}
           {/* Placeholder Add Task Button */}
           <button onClick={handleAddTask} className="flex items-center gap-2 text-primary hover:underline text-sm mt-3"><Square className="h-4 w-4" /> Add Task</button>
         </div>
         {/* Placeholder Next Session Info */}
         <div className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-orange-500"/>
            <span>Next session: Today, 4:00 PM</span>
         </div>
      </div>

      {/* Availability Section (Optional) */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-5 border border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-foreground"><CalendarDays className="h-6 w-6 text-orange-600" /> Availability</h3>
        <div className="text-sm text-muted-foreground space-y-2">
           {/* Placeholder for availability data */}
           <p>Today: 4:00 PM - 5:00 PM</p>
           <p>Tomorrow: 10:00 AM - 11:00 AM</p>
           {/* More detailed calendar visual could go here */}
        </div>
      </div>

    </div>
  );
};

export default SkillProfileSidebar; 