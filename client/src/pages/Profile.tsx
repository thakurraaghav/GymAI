import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import {
  Calendar,
  Dumbbell,
  RefreshCcw,
  Target,
  TrendingUp,
  BrainCircuit,
  Zap
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { PlanDisplay } from "../components/plan/PlanDisplay";

export default function Profile() {
  const { user, isLoading, plan, generatePlan, planHistory, fetchPlanHistory, loadPlan } = useAuth();

  useEffect(() => {
    fetchPlanHistory();
  }, [fetchPlanHistory]);

  if (!plan) {
    return <Navigate to="/onboarding" replace />;
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-background -z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-lime-400/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto w-full">
        
        {/* COMMAND CENTER HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-lime-400/10 border border-lime-400/20 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" />
              Active Protocol
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-zinc-100 tracking-tight">
              Command Center
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-zinc-400 text-lg">
                Generated {formatDate(plan.createdAt)}
              </p>
              {planHistory && planHistory.length > 1 && (
                <select
                  className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-md px-2 py-1 outline-none focus:border-lime-400/50 cursor-pointer"
                  value={plan.id}
                  onChange={(e) => {
                    const selected = planHistory.find(p => p.id === e.target.value);
                    if (selected) loadPlan(selected);
                  }}
                >
                  {planHistory.map((p) => (
                    <option key={p.id} value={p.id}>Version {p.version}.0</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <Button
            size="lg"
            variant="secondary"
            className="gap-2 bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 backdrop-blur-md shadow-xl"
            onClick={async () => await generatePlan()}
          >
            <RefreshCcw className="w-4 h-4" />
            Recalibrate Plan
          </Button>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up [animation-delay:100ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
          <Card variant="bordered" className="flex items-center gap-4 p-5 bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-900/80 hover:border-lime-400/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center group-hover:bg-lime-400/20 group-hover:scale-110 transition-all">
              <Target className="w-6 h-6 text-lime-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Goal</p>
              <p className="font-bold text-zinc-100 capitalize">{plan.overview.goal}</p>
            </div>
          </Card>
          
          <Card variant="bordered" className="flex items-center gap-4 p-5 bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-900/80 hover:border-indigo-400/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all">
              <Calendar className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Frequency</p>
              <p className="font-bold text-zinc-100">{plan.overview.frequency}</p>
            </div>
          </Card>

          <Card variant="bordered" className="flex items-center gap-4 p-5 bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-900/80 hover:border-amber-400/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:scale-110 transition-all">
              <Dumbbell className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Split</p>
              <p className="font-bold text-zinc-100 capitalize">{plan.overview.split.replace('_', ' ')}</p>
            </div>
          </Card>

          <Card variant="bordered" className="flex items-center gap-4 p-5 bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-900/80 hover:border-emerald-400/30 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">Version</p>
              <p className="font-bold text-zinc-100">v{plan.version}.0</p>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: SCHEDULE */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up [animation-delay:200ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
            <div>
               <h2 className="text-2xl font-bold mb-6 text-zinc-100 flex items-center gap-3">
                 Weekly Schedule
               </h2>
               <PlanDisplay weeklySchedule={plan.weeklySchedule} />
            </div>
          </div>

          {/* RIGHT COLUMN: AI INTELLIGENCE */}
          <div className="space-y-6 animate-fade-in-up [animation-delay:300ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
            
            <h2 className="text-xl font-bold mb-4 text-zinc-100 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-lime-400" />
              AI Intelligence
            </h2>

            {/* Plan Notes */}
            <Card variant="bordered" className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-lime-400" />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-zinc-100">Program Logic</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {plan.overview.notes}
                </p>
              </div>
            </Card>

            {/* Progression Strategy */}
            <Card variant="bordered" className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400" />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-3 text-zinc-100">Progression Strategy</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {plan.progression}
                </p>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
