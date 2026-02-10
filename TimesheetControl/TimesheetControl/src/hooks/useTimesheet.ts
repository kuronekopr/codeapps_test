import { useState } from 'react';
import { TimeEntry, Project, User } from '../types';

const MOCK_PROJECTS: Project[] = [
    { id: '1', name: 'Website Redesign', color: 'bg-blue-500' },
    { id: '2', name: 'Mobile App', color: 'bg-green-500' },
    { id: '3', name: 'Internal Tools', color: 'bg-purple-500' },
];

const MOCK_USER: User = {
    id: 'u1',
    name: 'Alex Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?u=u1',
};

const INITIAL_ENTRIES: TimeEntry[] = [
    { id: 'e1', projectId: '1', taskId: 'Design System', hours: 4, description: 'Working on typography', date: '2023-10-23' },
    { id: 'e2', projectId: '2', taskId: 'Login Flow', hours: 3, description: 'API integration', date: '2023-10-23' },
];

export const useTimesheet = () => {
    const [entries, setEntries] = useState<TimeEntry[]>(INITIAL_ENTRIES);
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date('2023-10-23')); // Fixed date for mock

    const addEntry = (entry: TimeEntry) => {
        setEntries([...entries, entry]);
    };

    const updateEntry = (updatedEntry: TimeEntry) => {
        setEntries(entries.map(e => e.id === updatedEntry.id ? updatedEntry : e));
    };

    const deleteEntry = (id: string) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    return {
        entries,
        projects: MOCK_PROJECTS,
        user: MOCK_USER,
        currentWeekStart,
        addEntry,
        updateEntry,
        deleteEntry,
        setCurrentWeekStart
    };
};
