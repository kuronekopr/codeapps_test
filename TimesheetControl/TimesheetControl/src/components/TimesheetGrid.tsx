import React from 'react';
import { TimeEntry, Project } from '../../types';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimesheetGridProps {
    entries: TimeEntry[];
    projects: Project[];
    currentWeekStart: Date;
    onCellClick: (date: string, projectId?: string) => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const TimesheetGrid: React.FC<TimesheetGridProps> = ({
    entries,
    projects,
    currentWeekStart,
    onCellClick
}) => {
    // Helper to get date string for column
    const getDateForDay = (dayIndex: number) => {
        const date = new Date(currentWeekStart);
        date.setDate(date.getDate() + dayIndex);
        return date.toISOString().split('T')[0];
    };

    const daysWithDates = DAYS.map((day, index) => ({
        name: day,
        date: getDateForDay(index)
    }));

    return (
        <div className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-8 gap-4">
                {/* Header Row */}
                <div className="col-span-1"></div> {/* Spacer for Project labels */}
                {daysWithDates.map((day) => (
                    <div key={day.date} className="text-center pb-4 border-b border-white/10">
                        <div className="text-sm text-white/60 mb-1">{day.name}</div>
                        <div className="text-lg font-bold text-white">
                            {day.date.split('-')[2]}
                        </div>
                    </div>
                ))}

                {/* Project Rows */}
                {projects.map((project) => (
                    <React.Fragment key={project.id}>
                        {/* Project Label */}
                        <div className="col-span-1 flex items-center py-2">
                            <div className={`w-3 h-3 rounded-full mr-3 ${project.color}`}></div>
                            <span className="text-sm font-medium text-white truncate">{project.name}</span>
                        </div>

                        {/* Days Cells */}
                        {daysWithDates.map((day) => {
                            const entry = entries.find(e => e.projectId === project.id && e.date === day.date);

                            return (
                                <motion.div
                                    key={`${project.id}-${day.date}`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onCellClick(day.date, project.id)}
                                    className={`
                    relative h-16 rounded-xl border border-white/5 transition-all cursor-pointer
                    ${entry
                                            ? 'bg-white/10 border-white/20 shadow-sm'
                                            : 'bg-white/5 hover:bg-white/10 border-transparent hover:border-white/10'
                                        }
                  `}
                                >
                                    {entry ? (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <span className="text-lg font-bold text-white">{entry.hours}h</span>
                                            {entry.description && (
                                                <span className="text-[10px] text-white/50 truncate w-full px-2 text-center">
                                                    {entry.description}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full opacity-0 hover:opacity-100 transition-opacity">
                                            <Plus size={16} className="text-white/40" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
