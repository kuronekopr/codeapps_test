import React from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { TimeEntry, Project } from '../types';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (entry: TimeEntry) => void;
    onDelete: (id: string) => void;
    initialEntry?: TimeEntry;
    initialProjectId?: string;
    date: string;
    projects: Project[];
}

type FormData = {
    projectId: string;
    taskId: string;
    hours: number;
    description: string;
};

export const TimeEntryModal: React.FC<TimeEntryModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialEntry,
    initialProjectId,
    date,
    projects
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: initialEntry || {
            projectId: initialProjectId || projects[0]?.id || '',
            taskId: '',
            hours: 1,
            description: ''
        }
    });

    // Reset form when opening/changing entry
    React.useEffect(() => {
        if (isOpen) {
            reset(initialEntry || {
                projectId: initialProjectId || projects[0]?.id || '',
                taskId: '',
                hours: 1,
                description: ''
            });
        }
    }, [isOpen, initialEntry, initialProjectId, reset, projects]);

    const onSubmit = (data: FormData) => {
        const entry: TimeEntry = {
            id: initialEntry?.id || Math.random().toString(36).substr(2, 9),
            date: date,
            ...data
        };
        onSave(entry);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog static open={isOpen} onClose={onClose} className="relative z-50">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm" // Glass backdrop
                        aria-hidden="true"
                    />

                    {/* Container */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="w-full max-w-md bg-zinc-900 border border-white/20 rounded-2xl p-6 shadow-2xl relative"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/50 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <Dialog.Title className="text-xl font-bold text-white mb-6">
                                {initialEntry ? 'Edit Entry' : 'New Entry'} - {date}
                            </Dialog.Title>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Project */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-1">Project</label>
                                    <select
                                        {...register('projectId', { required: true })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        {projects.map(p => (
                                            <option key={p.id} value={p.id} className="bg-zinc-800 text-white">
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Task */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-1">Task</label>
                                    <input
                                        {...register('taskId', { required: true })}
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="e.g. Design review"
                                    />
                                </div>

                                {/* Hours */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-1">Hours</label>
                                    <input
                                        {...register('hours', { required: true, min: 0.25, max: 24 })}
                                        type="number"
                                        step="0.25"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    {errors.hours && <span className="text-red-400 text-xs">Invalid hours</span>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
                                    <textarea
                                        {...register('description')}
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="What did you work on?"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between pt-4">
                                    {initialEntry && (
                                        <button
                                            type="button"
                                            onClick={() => { onDelete(initialEntry.id); onClose(); }}
                                            className="text-red-400 hover:text-red-300 text-sm font-medium px-2 py-2"
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <div className="flex space-x-3 ml-auto">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 shadow-lg shadow-purple-500/20"
                                        >
                                            Save Time
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};
