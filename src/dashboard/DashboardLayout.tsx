import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    BookOpen,
    Folder,
    User,
    ChevronRight,
    Menu,
    X,
    LogOut,
    ChevronLeft
} from 'lucide-react';

export default function DashBoardLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarMinimized, setSidebarMinimized] = useState(false);

    return (
        <div className="h-screen flex bg-gray-50">
            {/* Sidebar */}
            <DashboardNavbar
                isOpen={isSidebarOpen}
                isMinimized={isSidebarMinimized}
                onClose={() => setSidebarOpen(false)}
                onToggleMinimize={() => setSidebarMinimized(!isSidebarMinimized)}
            />

            {/* Main content area */}
            <div className={`flex flex-col flex-1 overflow-auto transition-all duration-300`}>
                <DashboardHeader
                    onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    isSidebarMinimized={isSidebarMinimized}
                />
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function DashboardHeader({ onToggleSidebar }: {
    onToggleSidebar: () => void;
    isSidebarMinimized: boolean;
}) {
    const location = useLocation();
    const segments = location.pathname.split('/').filter(Boolean);

    const crumbs: { label: string; to: string }[] = [{ label: 'Dashboard', to: '/dashboard' }];
    const base = '/dashboard';
    const startIndex = 1;

    for (let i = startIndex; i < segments.length; i++) {
        const segSlice = segments.slice(startIndex, i + 1).join('/');
        const to = base + (segSlice ? '/' + segSlice : '');
        crumbs.push({ label: prettyLabel(segments[i]), to });
    }

    return (
        <header className="sticky top-0 h-16 bg-white border-b border-gray-200/60 flex items-center justify-between px-6 z-10">
            <div className="flex items-center">
                {/* Mobile menu button (always visible on mobile) */}
                <button
                    onClick={onToggleSidebar}
                    className="md:hidden mr-3 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    aria-label="Toggle Sidebar"
                >
                    <Menu className="h-5 w-5 text-gray-600" />
                </button>


                {/* Breadcrumbs */}
                <nav className="text-sm flex items-center gap-2 text-gray-600">
                    {crumbs.map((c, idx) => (
                        <React.Fragment key={c.to + idx}>
                            <Link
                                to={c.to}
                                className={`transition-colors duration-200 ${idx === crumbs.length - 1 ? 'font-semibold text-gray-900' : 'hover:text-blue-600'}`}
                            >
                                {c.label}
                            </Link>
                            {idx !== crumbs.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
                        </React.Fragment>
                    ))}
                </nav>
            </div>

            {/* User profile link */}
            <Link to="/dashboard/profile" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                    <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden sm:inline font-medium">User Name</span>
            </Link>
        </header>
    );
}

function prettyLabel(s: string) {
    return s
        .replace(/-/g, ' ')
        .split(' ')
        .map(w => (w.length ? w[0].toUpperCase() + w.slice(1) : ''))
        .join(' ');
}

function DashboardNavbar({ isOpen, isMinimized, onClose, onToggleMinimize }: {
    isOpen: boolean;
    isMinimized: boolean;
    onClose: () => void;
    onToggleMinimize: () => void;
}) {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path: string) => {
        return currentPath === path;
    };

    const sidebarWidth = isMinimized ? 'w-16' : 'w-64';

    return (
        <>
            {/* Mobile overlay - lighter background */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-400 opacity-80 z-40 md:hidden"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={`fixed md:relative top-0 left-0 h-screen border-r border-gray-200/60 bg-white transform transition-all duration-300 z-50
                    ${sidebarWidth} 
                    ${isOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'} 
                    md:translate-x-0 md:shadow-none`}
            >
                {/* Logo/Brand */}
                <div className={`flex ${isMinimized ? 'justify-center' : 'justify-between items-center'} px-5 pt-5 pb-4`}>
                    {!isMinimized && (
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">LearnHub</h1>
                        </div>
                    )}
                    {/* Close button for mobile, minimize for desktop */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onToggleMinimize}
                            className="hidden md:flex p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            aria-label={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
                        >
                            <ChevronLeft className={`h-4 w-4 text-gray-600 ${isMinimized ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                            onClick={onClose}
                            className="md:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            aria-label="Close sidebar"
                        >
                            <X className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Full-width separator after brand name */}
                {!isMinimized && <div className="w-full h-px bg-gray-200 mb-4"></div>}

                <nav className="flex flex-col gap-1 px-3">
                    <Link
                        to="/dashboard/profile"
                        className={`group py-2.5 px-3 rounded-lg flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} transition-all duration-200 ${isActive('/dashboard/profile')
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                        onClick={() => window.innerWidth < 768 && onClose()}
                        title={isMinimized ? "Profile" : ""}
                    >
                        <div className={`p-1.5 rounded-md transition-colors duration-200 ${isActive('/dashboard/profile')
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                            }`}>
                            <User className="h-4 w-4" />
                        </div>
                        {!isMinimized && <span className="text-sm">Profile</span>}
                    </Link>

                    <Link
                        to="/dashboard/my-learning"
                        className={`group py-2.5 px-3 rounded-lg flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} transition-all duration-200 ${isActive('/dashboard/my-learning')
                            ? 'bg-green-50 text-green-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                        onClick={() => window.innerWidth < 768 && onClose()}
                        title={isMinimized ? "My Learning" : ""}
                    >
                        <div className={`p-1.5 rounded-md transition-colors duration-200 ${isActive('/dashboard/my-learning')
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-green-100 group-hover:text-green-600'
                            }`}>
                            <BookOpen className="h-4 w-4" />
                        </div>
                        {!isMinimized && <span className="text-sm">My Learning</span>}
                    </Link>

                    <Link
                        to="/dashboard/manage-content"
                        className={`group py-2.5 px-3 rounded-lg flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} transition-all duration-200 ${isActive('/dashboard/manage-content')
                            ? 'bg-amber-50 text-amber-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                        onClick={() => window.innerWidth < 768 && onClose()}
                        title={isMinimized ? "Manage Content" : ""}
                    >
                        <div className={`p-1.5 rounded-md transition-colors duration-200 ${isActive('/dashboard/manage-content')
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-amber-100 group-hover:text-amber-600'
                            }`}>
                            <Folder className="h-4 w-4" />
                        </div>
                        {!isMinimized && <span className="text-sm">Manage Content</span>}
                    </Link>

                    {/* Logout link */}
                    <Link
                        to="/logout"
                        className={`group py-2.5 px-3 rounded-lg flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} transition-all duration-200 ${isActive('/logout')
                            ? 'bg-red-50 text-red-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                        onClick={() => window.innerWidth < 768 && onClose()}
                        title={isMinimized ? "Logout" : ""}
                    >
                        <div className={`p-1.5 rounded-md transition-colors duration-200 ${isActive('/logout')
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-600'
                            }`}>
                            <LogOut className="h-4 w-4" />
                        </div>
                        {!isMinimized && <span className="text-sm">Logout</span>}
                    </Link>
                </nav>

                {/* Footer with copyright - only show when not minimized */}
                {!isMinimized && (
                    <div className="absolute bottom-4 left-5 right-5">
                        <p className="text-xs text-gray-400">© 2024 LearnHub. All rights reserved.</p>
                    </div>
                )}
            </aside>
        </>
    );
}

export function Profile() {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-600">
                    <ProfileInfo label="Full Name" value="John Doe" />
                    <ProfileInfo label="Phone Number" value="+1 (555) 123-4567" />
                    <ProfileInfo label="Email Address" value="john.doe@example.com" />
                    <ProfileInfo label="Join Date" value="January 15, 2024" />
                    <ProfileInfo label="Role" value="Student" />
                    <ProfileInfo label="Location" value="San Francisco, CA" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Learning Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard number="12" label="Courses Completed" className="bg-blue-50 text-blue-600" />
                    <StatCard number="156" label="Hours Learned" className="bg-green-50 text-green-600" />
                    <StatCard number="8" label="Certificates Earned" className="bg-yellow-50 text-yellow-600" />
                    <StatCard number="23" label="Day Streak" className="bg-purple-50 text-purple-600" />
                </div>
            </div>
        </div>
    );
}

// Reusable component for profile info fields
function ProfileInfo({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-gray-50 p-3 rounded-lg flex flex-col">
            <span className="text-xs font-medium text-gray-500">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
        </div>
    );
}

// Reusable component for statistic cards
function StatCard({ number, label, className }: { number: string; label: string; className: string }) {
    return (
        <div className={`p-4 rounded-lg flex flex-col items-start ${className}`}>
            <span className="text-3xl font-bold">{number}</span>
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}