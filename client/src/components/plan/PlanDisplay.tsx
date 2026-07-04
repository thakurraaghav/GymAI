import { Dumbbell, Info, Flame, AlertCircle } from "lucide-react";
import type { DaySchedule, Exercise } from "../../types";
import { Card } from "../ui/Card";

function ExerciseRow({
  exercise,
  index,
}: {
  exercise: Exercise;
  index: number;
}) {
  return (
    <tr className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-start gap-4">
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-zinc-800/80 text-xs text-zinc-400 font-bold shrink-0">
            {index + 1}
          </span>
          <div>
            <p className="font-semibold text-zinc-200">{exercise.name}</p>
            {exercise.notes && (
              <p className="text-xs text-zinc-400 mt-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                {exercise.notes}
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="py-4 px-4 text-center whitespace-nowrap">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-lime-400/10 border border-lime-400/20">
           <span className="text-lime-400 font-bold">{exercise.sets}</span>
           <span className="text-zinc-500 text-xs">×</span>
           <span className="text-lime-400 font-bold">{exercise.reps}</span>
        </div>
      </td>

      <td className="py-4 px-4 text-center whitespace-nowrap">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800/50 text-zinc-300">
           {exercise.rest}
        </div>
      </td>

      <td className="py-4 px-6 text-center">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-bold border
            ${
              exercise.rpe >= 9
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                : exercise.rpe >= 7
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            }`}
        >
          {exercise.rpe >= 9 && <AlertCircle className="w-3 h-3" />}
          {exercise.rpe === 8 && <Flame className="w-3 h-3" />}
          RPE {exercise.rpe}
        </div>
      </td>
    </tr>
  );
}

function DayCard({ schedule }: { schedule: DaySchedule }) {
  // If no exercises, it's a rest day
  const isRestDay = schedule.exercises.length === 0;

  if (isRestDay) {
    return (
      <Card variant="bordered" className="overflow-hidden bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 relative">
         <div className="absolute top-0 left-0 w-1 h-full bg-zinc-600" />
         <div className="flex items-center justify-between p-6">
           <div>
             <h3 className="font-bold text-xl text-zinc-100">{schedule.day}</h3>
             <p className="text-sm font-medium text-zinc-400 uppercase tracking-wide mt-1">Rest & Recovery</p>
           </div>
         </div>
      </Card>
    );
  }

  return (
    <Card variant="bordered" className="overflow-hidden bg-zinc-900/40 backdrop-blur-md border-zinc-800/50 relative shadow-xl">
      <div className="absolute top-0 left-0 w-1 h-full bg-lime-400" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-zinc-800/50 gap-4">
        <div>
          <h3 className="font-bold text-xl text-zinc-100">{schedule.day}</h3>
          <p className="text-sm font-bold text-lime-400 uppercase tracking-wider mt-1">{schedule.focus}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md">
          <Dumbbell className="w-4 h-4 text-lime-400" />
          <span>{schedule.exercises.length} exercises</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-zinc-500 text-xs uppercase tracking-wider bg-zinc-900/50">
              <th className="text-left py-3 pl-6 pr-4 font-bold">Exercise</th>
              <th className="py-3 px-4 font-bold text-center">Volume</th>
              <th className="py-3 px-4 font-bold text-center">Rest</th>
              <th className="py-3 px-6 font-bold text-center">Intensity</th>
            </tr>
          </thead>

          <tbody>
            {schedule.exercises.map((exercise, key) => (
              <ExerciseRow key={key} exercise={exercise} index={key} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

interface PlanDisplayProps {
  weeklySchedule: DaySchedule[];
}

export function PlanDisplay({ weeklySchedule }: PlanDisplayProps) {
  return (
    <div className="space-y-6">
      {weeklySchedule.map((schedule, key) => (
        <DayCard key={key} schedule={schedule} />
      ))}
    </div>
  );
}
