import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { useState, useEffect } from "react";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { ArrowRight, BrainCircuit, Activity, Calendar, Dumbbell, Stethoscope } from "lucide-react";
import type { UserProfile } from "../types";

const goalOptions = [
  { value: "bulk", label: "Build Muscle (Bulk)" },
  { value: "cut", label: "Lose Fat (Cut)" },
  { value: "recomp", label: "Body Recomposition" },
  { value: "strength", label: "Build Strength" },
  { value: "endurance", label: "Improve Endurance" },
];

const experienceOptions = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3+ years)" },
];

const daysOptions = [
  { value: "2", label: "2 days per week" },
  { value: "3", label: "3 days per week" },
  { value: "4", label: "4 days per week" },
  { value: "5", label: "5 days per week" },
  { value: "6", label: "6 days per week" },
];

const sessionOptions = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

const equipmentOptions = [
  { value: "full_gym", label: "Full Gym Access" },
  { value: "home", label: "Home Gym" },
  { value: "dumbbells", label: "Dumbbells Only" },
];

const splitOptions = [
  { value: "full_body", label: "Full Body" },
  { value: "upper_lower", label: "Upper/Lower Split" },
  { value: "ppl", label: "Push/Pull/Legs" },
  { value: "custom", label: "Let AI Decide" },
];

const loadingMessages = [
  "Analyzing your fitness profile...",
  "Calibrating volume and intensity...",
  "Selecting optimal exercises...",
  "Designing hyper-personalized splits...",
  "Finalizing your ultimate plan..."
];

export default function Onboarding() {
  const { saveProfile, generatePlan } = useAuth();
  const [formData, setFormData] = useState({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    preferredSplit: "upper_lower",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Cycle through loading messages
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  function updateForm(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleQuestionnaire(e: React.FormEvent) {
    e.preventDefault();

    const profile: Omit<UserProfile, "userId" | "updatedAt"> = {
      goal: formData.goal as UserProfile["goal"],
      experience: formData.experience as UserProfile["experience"],
      daysPerWeek: parseInt(formData.daysPerWeek),
      sessionLength: parseInt(formData.sessionLength),
      equipment: formData.equipment as UserProfile["equipment"],
      injuries: formData.injuries || undefined,
      preferredSplit: formData.preferredSplit as UserProfile["preferredSplit"],
    };
    try {
      setIsGenerating(true);
      await saveProfile(profile);
      await generatePlan();
      navigate("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
      setIsGenerating(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative overflow-hidden selection:bg-lime-400/30 selection:text-lime-200">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-400/5 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Step 1: Questionnaire */}
          {!isGenerating ? (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-100">
                  Configure Your <span className="text-lime-400">Engine</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                  Provide your specs, and our AI will engineer the perfect routine for your body.
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 flex items-center justify-center font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleQuestionnaire} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
                  {/* SECTION 1: THE BASICS */}
                  <Card variant="bordered" className="md:col-span-2 lg:col-span-2 p-8 bg-zinc-900/60 backdrop-blur-sm border-zinc-800/50 shadow-xl h-full">
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                     <Activity className="w-5 h-5 text-lime-400" />
                     <h2 className="text-xl font-bold text-zinc-100">The Basics</h2>
                  </div>
                  <div className="space-y-5">
                    <Select
                      id="goal"
                      label="What's your primary goal?"
                      options={goalOptions}
                      value={formData.goal}
                      onChange={(e) => updateForm("goal", e.target.value)}
                    />
                    <Select
                      id="experience"
                      label="Training experience"
                      options={experienceOptions}
                      value={formData.experience}
                      onChange={(e) => updateForm("experience", e.target.value)}
                    />
                  </div>
                </Card>

                  {/* SECTION 2: SCHEDULE */}
                  <Card variant="bordered" className="md:col-span-1 lg:col-span-1 p-8 bg-zinc-900/60 backdrop-blur-sm border-zinc-800/50 shadow-xl h-full flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                     <Calendar className="w-5 h-5 text-indigo-400" />
                     <h2 className="text-xl font-bold text-zinc-100">Schedule</h2>
                  </div>
                  <div className="space-y-5">
                    <Select
                      id="daysPerWeek"
                      label="Days per week"
                      options={daysOptions}
                      value={formData.daysPerWeek}
                      onChange={(e) => updateForm("daysPerWeek", e.target.value)}
                    />
                    <Select
                      id="sessionLength"
                      label="Session length"
                      options={sessionOptions}
                      value={formData.sessionLength}
                      onChange={(e) => updateForm("sessionLength", e.target.value)}
                    />
                  </div>
                </Card>

                  {/* SECTION 3: LOGISTICS */}
                  <Card variant="bordered" className="md:col-span-1 lg:col-span-1 p-8 bg-zinc-900/60 backdrop-blur-sm border-zinc-800/50 shadow-xl h-full flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                     <Dumbbell className="w-5 h-5 text-amber-400" />
                     <h2 className="text-xl font-bold text-zinc-100">Logistics</h2>
                  </div>
                  <div className="space-y-5">
                    <Select
                      id="equipment"
                      label="Equipment access"
                      options={equipmentOptions}
                      value={formData.equipment}
                      onChange={(e) => updateForm("equipment", e.target.value)}
                    />
                    <Select
                      id="preferredSplit"
                      label="Preferred training split"
                      options={splitOptions}
                      value={formData.preferredSplit}
                      onChange={(e) => updateForm("preferredSplit", e.target.value)}
                    />
                  </div>
                </Card>

                  {/* SECTION 4: MEDICAL */}
                  <Card variant="bordered" className="md:col-span-1 lg:col-span-2 p-8 bg-zinc-900/60 backdrop-blur-sm border-zinc-800/50 shadow-xl h-full">
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
                     <Stethoscope className="w-5 h-5 text-rose-400" />
                     <h2 className="text-xl font-bold text-zinc-100">Medical (Optional)</h2>
                  </div>
                  <Textarea
                    id="injuries"
                    label="Any injuries or limitations?"
                    placeholder="E.g., lower back issues, shoulder impingement..."
                    rows={4}
                    value={formData.injuries}
                    onChange={(e) => updateForm("injuries", e.target.value)}
                  />
                </Card>
              </div>

                {/* SUBMIT */}
                <div className="pt-4 flex justify-center">
                  <Button type="submit" size="lg" className="w-full md:w-auto px-12 py-6 text-lg rounded-2xl shadow-[0_0_30px_rgba(163,230,53,0.2)] hover:shadow-[0_0_50px_rgba(163,230,53,0.4)] transition-all gap-2 group">
                    <BrainCircuit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Engage AI Generation 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            // DYNAMIC LOADING STATE
            <div className="h-[60vh] flex flex-col items-center justify-center animate-fade-in-up">
              <div className="relative mb-12">
                 {/* Glowing rings */}
                 <div className="absolute inset-0 bg-lime-400/20 rounded-full blur-2xl animate-pulse-slow" />
                 <div className="w-24 h-24 rounded-full border border-lime-400/30 flex items-center justify-center relative bg-zinc-900/80 backdrop-blur-md shadow-[0_0_50px_rgba(163,230,53,0.2)]">
                   <BrainCircuit className="w-12 h-12 text-lime-400 animate-pulse" />
                 </div>
                 
                 {/* Orbiting element (simulated with rotation) */}
                 <div className="absolute -inset-4 border border-zinc-800 rounded-full border-t-lime-400/50 animate-spin" style={{ animationDuration: '3s' }} />
                 <div className="absolute -inset-8 border border-zinc-800/50 rounded-full border-b-indigo-400/30 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
              </div>

              <h2 className="text-3xl font-bold text-zinc-100 mb-4">Initializing Matrix</h2>
              <div className="h-8 flex items-center justify-center">
                 <p key={loadingMsgIndex} className="text-lime-400 text-lg font-medium animate-fade-in-up">
                   {loadingMessages[loadingMsgIndex]}
                 </p>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
