import React from 'react';
import { Calendar, User as UserIcon, Bell } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
    user: User;
    currentDate: Date;
}

export const Header: React.FC<HeaderProps> = ({ user, currentDate }) => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 text-white">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg shadow-lg">
                    <Calendar size={24} className="text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">Weekly Timesheet</h1>
            </div>

            <div className="flex items-center space-x-4">
                <div className="hidden md:flex flex-col items-end mr-4">
                    <span className="text-sm font-medium">{currentDate.toLocaleDateString()}</span>
                    <span className="text-xs text-white/60">Week 43</span>
                </div>

                <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-white/60">Developer</div>
                    </div>
                    <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-white/20 shadow-sm"
                    />
                </div>
            </div>
        </header>
    );
};
