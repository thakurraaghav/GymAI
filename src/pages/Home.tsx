import { Link, Navigate } from "react-router-dom";
import {
  Zap,
  Target,
  Calendar,
  ArrowRight,
  Sparkles,
  Clock,
  Dumbbell,
  Activity
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Plans",
    description:
      "Get a training program tailored to your goals, experience, and schedule.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "Whether you want to build muscle, lose fat, or get stronger — we optimize for your goal.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Plans that fit your lifestyle. Train 2 days or 6 — we adapt to you.",
  },
  {
    icon: Clock,
    title: "Time-Efficient",
    description:
      "Every workout is designed to maximize results in your available time.",
  },
];

export default function Home() {
  const { user, isLoading } = useAuth();

  // Redirect authenticated users to profile
  if (!isLoading && user) {
    return <Navigate to="/profile" replace />;
  }
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden selection:bg-lime-400/30 selection:text-lime-200">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-lime-400/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[90vh]">
        <div className="text-center max-w-4xl mx-auto z-10 relative">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-sm mb-8 animate-fade-in-up shadow-[0_0_15px_rgba(163,230,53,0.1)] hover:shadow-[0_0_25px_rgba(163,230,53,0.2)] transition-shadow">
            <Zap className="w-4 h-4 text-lime-400" />
            <span className="text-sm text-zinc-300 font-medium">
              GymAI 2.0 is live
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 animate-fade-in-up [animation-delay:150ms] opacity-0 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-500">
            Your Perfect <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500 relative inline-block">
              Gym Plan
              <div className="absolute -bottom-2 left-0 w-full h-[8px] bg-lime-400/20 blur-sm rounded-full" />
            </span> 
            {" "}in Seconds
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 animate-fade-in-up [animation-delay:300ms] opacity-0 leading-relaxed">
            Stop guessing. Get a personalized training program built by AI,
            tailored to your goals, experience, and schedule.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:450ms] opacity-0">
            <Link to="/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 py-6 rounded-2xl shadow-[0_0_40px_rgba(163,230,53,0.3)] hover:shadow-[0_0_60px_rgba(163,230,53,0.5)] transition-all hover:-translate-y-1">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/onboarding" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-6 rounded-2xl text-lg bg-zinc-900 hover:bg-zinc-800 border-zinc-800">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Abstract UI Elements */}
        <div className="absolute top-1/4 left-10 md:left-20 animate-float [animation-delay:0ms] opacity-20 md:opacity-100 hidden lg:block">
          <Card variant="bordered" className="p-4 bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 shadow-2xl rounded-2xl flex items-center gap-4">
             <div className="p-3 bg-lime-400/10 rounded-xl">
               <Dumbbell className="w-6 h-6 text-lime-400" />
             </div>
             <div>
               <div className="text-xs text-zinc-500 mb-1">Workout Generated</div>
               <div className="text-sm font-medium">Upper Body Hypertrophy</div>
             </div>
          </Card>
        </div>

        <div className="absolute bottom-1/4 right-10 md:right-20 animate-float [animation-delay:1500ms] opacity-20 md:opacity-100 hidden lg:block">
          <Card variant="bordered" className="p-4 bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 shadow-2xl rounded-2xl flex items-center gap-4">
             <div className="p-3 bg-indigo-500/10 rounded-xl">
               <Activity className="w-6 h-6 text-indigo-400" />
             </div>
             <div>
               <div className="text-xs text-zinc-500 mb-1">AI Analysis Complete</div>
               <div className="text-sm font-medium text-indigo-200">Volume Optimized</div>
             </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative z-10 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up [animation-delay:200ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
              Why GymAI?
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We combine fitness expertise with advanced AI to create highly personalized programs that actually work for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card
                key={feature.title}
                variant="bordered"
                className={`group p-8 rounded-3xl bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-900/80 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up opacity-0`}
                style={{ animationDelay: `${400 + i * 150}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 group-hover:bg-lime-400/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-lime-400" />
                </div>
                <h3 className="font-semibold text-xl mb-3 text-zinc-100">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
