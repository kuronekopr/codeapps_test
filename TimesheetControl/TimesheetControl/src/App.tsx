import React, { useState } from 'react';
import { Header } from './components/Header';
import { TimesheetGrid } from './components/TimesheetGrid';
import { TimeEntryModal } from './components/TimeEntryModal';
import { useTimesheet } from './hooks/useTimesheet';
import { TimeEntry } from './types';

export default function App() {
    const { entries, projects, user, currentWeekStart, addEntry, updateEntry, deleteEntry } = useTimesheet();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedEntry, setSelectedEntry] = useState<TimeEntry | undefined>(undefined);
    const [initialProjectId, setInitialProjectId] = useState<string | undefined>(undefined);

    const handleCellClick = (date: string, projectId?: string) => {
        setSelectedDate(date);
        setInitialProjectId(projectId);

        // Find precise entry if checking specific project cell
        const existingEntry = entries.find(e => e.date === date && e.projectId === projectId);
        setSelectedEntry(existingEntry);

        setIsModalOpen(true);
    };

    const handleSave = (entry: TimeEntry) => {
        if (selectedEntry) {
            updateEntry(entry);
        } else {
            addEntry(entry);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 overflow-hidden relative font-sans text-slate-100">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <div className="relative z-10 flex flex-col h-screen">
                <Header user={user} currentDate={currentWeekStart} />

                <main className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 py-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">This Week</h2>
                            <div className="text-sm text-white/60">
                                Total Hours: <span className="text-white font-bold">{entries.reduce((sum, e) => sum + e.hours, 0)}h</span>
                            </div>
                        </div>
                    </div>

                    <TimesheetGrid
                        entries={entries}
                        projects={projects}
                        currentWeekStart={currentWeekStart}
                        onCellClick={handleCellClick}
                    />
                </main>
            </div>

            <TimeEntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                onDelete={deleteEntry}
                initialEntry={selectedEntry}
                initialProjectId={initialProjectId}
                date={selectedDate}
                projects={projects}
            />
        </div>
    );
}
