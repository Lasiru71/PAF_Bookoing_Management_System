// StudentDashboardPage — Premium dashboard view for students
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import {
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus,
  BookOpen,
  ArrowRight,
  TrendingUp,
  XCircle,
  Layers,
  Search
} from "lucide-react";
import { ROUTES } from "../utils/constants";

const STATUS_STYLE = {
  CONFIRMED: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    color: "emerald"
  },
  PENDING: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <Clock className="h-3.5 w-3.5" />,
    color: "amber"
  },
  CANCELLED: {
    badge: "bg-red-100 text-red-600 border-red-200",
    icon: <XCircle className="h-3.5 w-3.5" />,
    color: "red"
  },
  IN_PROGRESS: {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    color: "blue"
  },
};

const SAMPLE_BOOKINGS = [
  { id: "BK-2026-001", resource: "Main Auditorium", location: "Block A, Floor 1", date: "2026-04-14", time: "09:00 – 12:00", status: "CONFIRMED", type: "Event Hall" },
  { id: "BK-2026-002", resource: "Creative Lab B", location: "Block C, Floor 2", date: "2026-04-12", time: "14:00 – 16:00", status: "PENDING", type: "Laboratory" },
  { id: "BK-2026-003", resource: "Conference Room 3", location: "Block B, Floor 3", date: "2026-04-10", time: "10:00 – 11:30", status: "IN_PROGRESS", type: "Meeting Room" },
];

const StudentDashboardPage = () => {
  const { auth } = useAuth();
  const displayName = auth?.fullName || auth?.email || "Student";

  const stats = [
    { label: "Total Bookings", value: "12", icon: Layers, gradient: "from-blue-600 to-indigo-700", glow: "shadow-blue-500/30" },
    { label: "Confirmed", value: "8", icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", glow: "shadow-emerald-500/30" },
    { label: "Pending", value: "3", icon: Clock, gradient: "from-amber-500 to-orange-500", glow: "shadow-amber-500/30" },
    { label: "Cancelled", value: "1", icon: XCircle, gradient: "from-red-500 to-rose-600", glow: "shadow-red-500/30" }
  ];

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 lg:p-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-none">Overview</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Welcome back, {displayName} 👋</p>
          </div>
          <div className="flex items-center gap-3">
             <Link to={ROUTES.RESOURCES} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                <Search className="h-3.5 w-3.5" /> Browse Resources
             </Link>
             <Link to={ROUTES.RESOURCES} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                <Plus className="h-3.5 w-3.5" /> New Booking
             </Link>
          </div>
        </div>

        {/* 4 Colored Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
          {[
            { label: "Total Bookings", value: "12", change: "+2 this week", trend: "+2.0%", icon: Layers, gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", glow: "0 8px 30px rgba(59,130,246,0.35)" },
            { label: "Confirmed", value: "8", change: "Ready for use", trend: "+1 new", icon: CheckCircle, gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)", glow: "0 8px 30px rgba(16,185,129,0.35)" },
            { label: "Pending", value: "3", change: "Awaiting approval", trend: "Stable", icon: Clock, gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", glow: "0 8px 30px rgba(139,92,246,0.35)" },
            { label: "Cancelled", value: "1", change: "No actions needed", trend: "0 issues", icon: XCircle, gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)", glow: "0 8px 30px rgba(245,158,11,0.35)" },
          ].map((s) => (
            <div
              key={s.label}
              className="relative rounded-2xl p-5 overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-default"
              style={{ background: s.gradient, boxShadow: s.glow }}
            >
              <div className="absolute -top-5 -right-5 h-24 w-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-white/5" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-11 w-11 rounded-xl bg-white/25 flex items-center justify-center shadow-md">
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold bg-white/25 text-white px-2.5 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {s.trend}
                  </span>
                </div>
                <p className="text-3xl font-black text-white tracking-tight leading-none mb-1">{s.value}</p>
                <p className="text-sm font-bold text-white/80">{s.label}</p>
                <p className="text-xs text-white/55 mt-1">{s.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Dark Cards Like Admin */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          
          {/* Recent Bookings */}
          <div className="bg-[#0f172a] rounded-3xl border border-slate-800 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col">
            <div className="px-7 py-6 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-black text-white">Recent Bookings</h2>
                <p className="text-xs text-slate-400 mt-1">Your latest campus resource reservations</p>
              </div>
              <div className="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0">
                <CalendarDays className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            
            <div className="p-7 space-y-4 flex-1">
              {SAMPLE_BOOKINGS.map((booking) => {
                const style = STATUS_STYLE[booking.status];
                // For dark theme adaptation, we use slightly different badge backgrounds than the bright main theme.
                // But we can stick to a sleek dark list item.
                return (
                  <div key={booking.id} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
                        <BookOpen className="h-5 w-5 text-slate-300" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white mb-0.5">{booking.resource}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{booking.type} • {booking.id}</p>
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                           <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {booking.date}</span>
                           <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${style.badge.replace('bg-','bg-opacity-20 bg-').replace('border-','border-opacity-30 border-')}`}>
                        {booking.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="px-7 py-5 border-t border-slate-800 bg-slate-900/50 mt-auto">
               <Link to={ROUTES.MY_BOOKINGS} className="flex items-center justify-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                 View full history <ArrowRight className="h-4 w-4" />
               </Link>
            </div>
          </div>

          {/* Activity / Quick Actions */}
          <div className="space-y-7 flex flex-col">
          
            {/* Dark Promotional Card */}
            <div className="bg-[#1e293b] rounded-3xl border border-slate-800 shadow-xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-24 bg-indigo-500/10 rounded-bl-[100px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
              <div className="p-7 relative z-10 w-full">
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                     <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                     </span>
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Next Upcoming</span>
                   </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-1">Main Auditorium</h3>
                <p className="text-slate-400 text-sm font-semibold mb-6 flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Block A, Floor 1</p>

                <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-4 flex justify-between items-center text-sm font-bold text-slate-300 mb-6 group-hover:border-slate-600 transition-colors">
                   <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-indigo-400"/> Tomorrow</span>
                   <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-indigo-400"/> 09:00 AM</span>
                </div>

                <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-sm shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                  View Details
                </button>
              </div>
            </div>

            {/* Quick Actions (Dark Theme) */}
            <div className="bg-[#0f172a] rounded-3xl border border-slate-800 shadow-xl p-7 flex-1">
              <h2 className="text-lg font-black text-white mb-1">Quick Actions</h2>
              <p className="text-xs text-slate-400 mb-5">Frequently used campus tools</p>
              
              <div className="space-y-3">
                {[
                  { label: "My Bookings History", icon: CalendarDays, to: ROUTES.MY_BOOKINGS, ext: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
                  { label: "Account Profile", icon: TrendingUp, to: ROUTES.STUDENT_PROFILE, ext: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                  { label: "Help & Support", icon: AlertCircle, to: ROUTES.CONTACT, ext: "text-amber-400 bg-amber-500/10 border-amber-500/20" }
                ].map((action, idx) => (
                  <Link key={idx} to={action.to} className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-800 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-700 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${action.ext} group-hover:scale-110 transition-transform duration-300`}>
                         <action.icon className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-bold text-slate-300 text-sm group-hover:text-white transition-colors">{action.label}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 group-hover:border-slate-500 group-hover:bg-slate-700 transition-colors">
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:rotate-45" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboardPage;
