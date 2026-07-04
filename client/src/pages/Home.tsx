import { Link, Navigate } from "react-router-dom";
import {
  Zap,
  Target,
  Calendar,
  ArrowRight,
  Sparkles,
  Clock,
  Dumbbell,
  Activity,
  CheckCircle2,
  ChevronRight,
  Star,
  BrainCircuit,
  Settings2,
  Trophy
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

const testimonials = [
  {
    name: "Alex M.",
    goal: "Built Muscle (Bulk)",
    text: "This AI completely changed my training. The upper/lower split it generated is perfect for my 4-day schedule. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah K.",
    goal: "Lost Fat (Cut)",
    text: "I was overwhelmed by all the conflicting fitness advice online. GymAI just gave me a clean, easy-to-follow plan that works.",
    rating: 5,
  },
  {
    name: "James T.",
    goal: "Body Recomposition",
    text: "The instant generation is crazy. I told it I only had access to dumbbells, and it built an incredible full-body routine in seconds.",
    rating: 5,
  }
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

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl 2xl:max-w-[1440px] mx-auto flex flex-col items-center justify-center w-full">
        <div className="text-center max-w-4xl 2xl:max-w-5xl mx-auto z-10 relative">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-sm mb-8 animate-fade-in-up shadow-[0_0_15px_rgba(163,230,53,0.1)] hover:shadow-[0_0_25px_rgba(163,230,53,0.2)] transition-shadow">
            <Zap className="w-4 h-4 text-lime-400" />
            <span className="text-sm text-zinc-300 font-medium">
              GymAI 2.0 is live
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 animate-fade-in-up [animation-delay:150ms] opacity-0 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-500" style={{ animationFillMode: 'forwards' }}>
            Your Perfect <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500 relative inline-block">
              Gym Plan
              <div className="absolute -bottom-2 left-0 w-full h-[8px] bg-lime-400/20 blur-sm rounded-full" />
            </span> 
            {" "}in Seconds
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 animate-fade-in-up [animation-delay:300ms] opacity-0 leading-relaxed" style={{ animationFillMode: 'forwards' }}>
            Stop guessing. Get a personalized training program built by AI,
            tailored to your goals, experience, and schedule.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:450ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
            <Link to="/auth" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 py-6 rounded-2xl shadow-[0_0_40px_rgba(163,230,53,0.3)] hover:shadow-[0_0_60px_rgba(163,230,53,0.5)] transition-all hover:-translate-y-1">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth" className="w-full sm:w-auto">
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

      {/* ----------------- PRODUCT SHOWCASE ----------------- */}
      <section className="relative px-6 max-w-5xl 2xl:max-w-7xl w-full mx-auto pb-24 z-20">
        <div className="animate-fade-in-up [animation-delay:600ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-2 rounded-[2rem] shadow-2xl shadow-lime-400/5">
            <div className="bg-zinc-950 rounded-[1.75rem] p-6 md:p-10 border border-zinc-800/50">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-8 border-b border-zinc-800/50 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100 mb-2">Your Training Plan</h3>
                  <p className="text-zinc-400 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-lime-400/10 text-lime-400 text-xs font-medium">
                      <Target className="w-3 h-3" /> Hypertrophy Focus
                    </span>
                    <span className="text-sm">• 4 Days/Week • Advanced</span>
                  </p>
                </div>
                <div className="flex gap-2">
                   <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                     <Calendar className="w-5 h-5 text-zinc-400" />
                   </div>
                   <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                     <Settings2 className="w-5 h-5 text-zinc-400" />
                   </div>
                </div>
              </div>

              {/* Mock Workout Day */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 bg-zinc-100 text-zinc-900 text-sm font-bold rounded-lg">Day 1</div>
                  <h4 className="text-xl font-bold text-zinc-100">Upper Body Power</h4>
                </div>

                {[
                  { name: "Barbell Bench Press", sets: "4 sets × 5-8 reps", rest: "120s rest" },
                  { name: "Weighted Pull-ups", sets: "4 sets × 6-8 reps", rest: "120s rest" },
                  { name: "Overhead Dumbbell Press", sets: "3 sets × 8-10 reps", rest: "90s rest" }
                ].map((exercise, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-lime-400/30 transition-colors">
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-zinc-200">{exercise.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-lime-400" /> {exercise.sets}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-400" /> {exercise.rest}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ----------------- HOW IT WORKS ----------------- */}
      <section className="py-24 px-6 bg-zinc-950/80 border-y border-zinc-900 relative">
        <div className="max-w-7xl 2xl:max-w-[1440px] w-full mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-100">How It Works</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">From answering a few simple questions to hitting the gym floor in under 60 seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-0" />
            
            {[
              { icon: Settings2, title: "1. Tell Us Your Goals", desc: "Select your objective, available equipment, and schedule." },
              { icon: BrainCircuit, title: "2. AI Analysis", desc: "Our advanced models crunch the data to optimize your volume and split." },
              { icon: Trophy, title: "3. Crush Your Workouts", desc: "Follow your personalized plan and watch your progress skyrocket." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-lime-400/50 group-hover:scale-105 transition-all duration-300">
                  <step.icon className="w-10 h-10 text-lime-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- FEATURES ----------------- */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl 2xl:max-w-[1440px] w-full mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {features.map((feature, i) => (
              <Card
                key={feature.title}
                variant="bordered"
                className="group p-8 rounded-3xl bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-900/80 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 group-hover:bg-lime-400/20 transition-all duration-300">
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

      {/* ----------------- TESTIMONIALS ----------------- */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-zinc-900">
        {/* Subtle ambient glow to prevent it from looking completely black */}
        <div className="absolute inset-0 bg-zinc-950/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-lime-400/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl 2xl:max-w-[1440px] w-full mx-auto relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-100">Don't just take our word for it</h2>
             <p className="text-zinc-400 text-lg">Thousands of lifters are upgrading their routines with GymAI.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <Card key={idx} variant="bordered" className="p-8 bg-zinc-900/60 backdrop-blur-sm border-zinc-800 hover:border-lime-400/30 transition-colors shadow-xl">
                <div className="flex gap-1 mb-6">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-lime-400 text-lime-400" />
                  ))}
                </div>
                <p className="text-zinc-300 italic mb-8 leading-relaxed">"{test.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center font-bold text-zinc-900 shadow-lg shadow-lime-400/20">
                    {test.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-100 text-sm">{test.name}</h4>
                    <span className="text-xs text-lime-400">{test.goal}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- FINAL CTA ----------------- */}
      <section className="py-32 px-6 relative overflow-hidden flex justify-center">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-lime-400/10 blur-[100px] rounded-full -z-10" />
        
        <div className="text-center max-w-3xl mx-auto relative z-10 border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-12 md:p-20 rounded-[3rem] shadow-2xl">
           <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">Ready to hit the gym?</h2>
           <p className="text-xl text-zinc-400 mb-10">Stop overthinking your routine. Let AI build the ultimate plan for your body.</p>
           
           <Link to="/auth">
             <Button size="lg" className="gap-2 text-lg px-10 py-7 rounded-2xl shadow-[0_0_40px_rgba(163,230,53,0.3)] hover:shadow-[0_0_60px_rgba(163,230,53,0.5)] transition-all hover:-translate-y-1">
                Generate Your Plan Now
                <ChevronRight className="w-5 h-5" />
             </Button>
           </Link>
        </div>
      </section>

    </div>
  );
}
