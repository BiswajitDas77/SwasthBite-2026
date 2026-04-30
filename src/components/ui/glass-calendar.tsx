import * as React from "react";
import { Settings, Plus, Edit2, ChevronLeft, ChevronRight, X, Calendar as CalendarIcon } from "lucide-react";
import { format, addMonths, subMonths, isSameDay, isToday, getDate, getDaysInMonth, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils"; 

interface GlassCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
}

export const GlassCalendar = React.forwardRef<HTMLDivElement, GlassCalendarProps>(
  ({ className, selectedDate: propSelectedDate, onDateSelect, ...props }, ref) => {
    const [currentMonth, setCurrentMonth] = React.useState(propSelectedDate || new Date());
    const [selectedDate, setSelectedDate] = React.useState(propSelectedDate || new Date());
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [note, setNote] = React.useState("");
    const [notes, setNotes] = React.useState<Record<string, string>>({
        [format(new Date(), "yyyy-MM-dd")]: "Focus on High Protein today!"
    });

    const days = React.useMemo(() => {
      const start = startOfWeek(startOfMonth(currentMonth));
      const end = endOfWeek(endOfMonth(currentMonth));
      return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    const handleDateClick = (date: Date) => {
      setSelectedDate(date);
      onDateSelect?.(date);
    };

    const handleSaveNote = () => {
        setNotes(prev => ({ ...prev, [format(selectedDate, "yyyy-MM-dd")]: note }));
        setIsModalOpen(false);
        setNote("");
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-[40px] p-6 lg:p-8 shadow-2xl relative",
          "bg-[#0d0d14] border border-white/20",
          "text-white font-sans",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
                <p className="text-[0.6rem] font-black text-white/30 uppercase tracking-[0.2em]">Regional Market View</p>
                <h2 className="text-3xl font-black tracking-tighter">
                    {format(currentMonth, "MMMM")} <span className="text-white/20 font-light">{format(currentMonth, "yyyy")}</span>
                </h2>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <ChevronLeft size={18} />
                </button>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 mb-4">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-center text-[0.6rem] font-black text-white/20 uppercase">
                    {day}
                </div>
            ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => {
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const hasNote = notes[format(day, "yyyy-MM-dd")];
                
                return (
                    <button
                        key={i}
                        onClick={() => handleDateClick(day)}
                        className={cn(
                            "aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all",
                            !isCurrentMonth && "opacity-20",
                            isSelected ? "bg-white text-black font-black scale-105 shadow-xl" : "hover:bg-white/5 text-white/80"
                        )}
                    >
                        <span className="text-sm">{getDate(day)}</span>
                        {isToday(day) && !isSelected && (
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        )}
                        {hasNote && (
                            <div className={cn("w-1 h-1 rounded-full mt-1", isSelected ? "bg-black" : "bg-indigo-500")} />
                        )}
                    </button>
                );
            })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
            <button 
                onClick={() => {
                    setNote(notes[format(selectedDate, "yyyy-MM-dd")] || "");
                    setIsModalOpen(true);
                }}
                className="flex-1 py-4 bg-white/5 rounded-2xl text-[0.65rem] font-black tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/5"
            >
                <Edit2 size={14} /> {notes[format(selectedDate, "yyyy-MM-dd")] ? 'Edit Note' : 'Add Note'}
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 py-4 bg-white text-black rounded-2xl text-[0.65rem] font-black tracking-widest uppercase hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
            >
                <Plus size={14} /> New Event
            </button>
        </div>

        {/* Event Modal */}
        <AnimatePresence>
            {isModalOpen && (
                <div className="absolute inset-0 z-50 p-6 flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full bg-[#1a1a24] rounded-[32px] p-8 border border-white/10 shadow-2xl relative"
                    >
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">
                            <X size={20} />
                        </button>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                                <CalendarIcon size={20} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight">{format(selectedDate, "MMM dd, yyyy")}</h3>
                        </div>

                        <textarea 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Type your health note or event here..."
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 min-h-[120px] mb-6"
                        />

                        <button 
                            onClick={handleSaveNote}
                            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs tracking-widest uppercase shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
                        >
                            Save Event Details
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassCalendar.displayName = "GlassCalendar";
