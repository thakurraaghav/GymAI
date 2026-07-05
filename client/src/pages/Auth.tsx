import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Dumbbell, ArrowRight, Zap, Brain, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authFn = isLogin ? api.login : api.register;
      const response = await authFn({ email, password });
      
      login(response.token, response.user);
      navigate("/profile");
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch relative">
      {/* Floating Global Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full text-zinc-300 hover:text-lime-400 hover:border-lime-400/50 hover:bg-zinc-800/80 transition-all shadow-lg text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Left Panel: Project Branding & Description */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-zinc-950 border-r border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-lime-400/10 via-transparent to-transparent" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-lime-400/5 rounded-full blur-[100px] animate-pulse-slow" />

        <div className="relative z-10">

          <Link to="/" className="flex items-center gap-3 mb-16 w-fit group">
            <div className="p-2 bg-lime-400/10 rounded-lg group-hover:bg-lime-400/20 transition-colors">
              <Dumbbell className="w-6 h-6 text-lime-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-100 group-hover:text-lime-400 transition-colors">GymAI</span>
          </Link>

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 animate-fade-in-up">
            Build your ultimate <br />
            <span className="text-lime-400">fitness plan</span> with AI.
          </h2>
          
          <p className="text-zinc-400 text-lg mb-12 max-w-md leading-relaxed animate-fade-in-up [animation-delay:150ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
            Say goodbye to cookie-cutter workouts. Our advanced AI engine analyzes your goals, experience, and schedule to build a hyper-personalized training regimen.
          </p>

          <div className="space-y-6 animate-fade-in-up [animation-delay:300ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <Brain className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-200">Smart Algorithms</h4>
                <p className="text-sm text-zinc-500">Adapts to your feedback</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <Zap className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-200">Instant Generation</h4>
                <p className="text-sm text-zinc-500">Zero wait time for new routines</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-zinc-600 animate-fade-in-up [animation-delay:450ms] opacity-0" style={{ animationFillMode: 'forwards' }}>
          © 2026 GymAI Planner. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-background">
        <div className="w-full max-w-md animate-fade-in-up">
          
          {/* Mobile Header (hidden on large screens) */}
          <div className="lg:hidden mb-10 flex flex-col items-center">
            
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-lime-400/10 rounded-lg group-hover:bg-lime-400/20 transition-colors">
                <Dumbbell className="w-6 h-6 text-lime-400" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-100 group-hover:text-lime-400 transition-colors">GymAI</span>
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-zinc-100">
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-zinc-400 text-sm lg:text-base">
              {isLogin ? "Enter your credentials to access your planner." : "Join us and start generating your perfect workouts."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/50 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm p-3 bg-red-400/10 border border-red-400/20 rounded-lg flex items-center gap-2">
                <span>⚠</span> {error}
              </div>
            )}

            <Button type="submit" className="w-full py-6 mt-4 shadow-[0_0_20px_rgba(163,230,53,0.15)] hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] transition-all flex justify-center items-center gap-2" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-zinc-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-lime-400 hover:text-lime-300 font-medium transition-colors hover:underline"
            >
              {isLogin ? "Sign up for free" : "Sign in"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
