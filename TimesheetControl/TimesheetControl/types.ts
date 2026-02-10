export interface TimeEntry {
    id: string;
    projectId: string;
    taskId: string;
    hours: number;
    description: string;
    date: string; // YYYY-MM-DD
}

export interface Project {
    id: string;
    name: string;
    color: string;
}

export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
}
