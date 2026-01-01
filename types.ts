export enum BodyPart {
  LEGS = 'LEGS',
  CHEST = 'CHEST',
  BACK = 'BACK',
  SHOULDERS = 'SHOULDERS',
  CORE = 'CORE',
  FUNCTIONAL = 'FUNCTIONAL',
  ALL = 'ALL' // For General Cooldowns
}

export enum ExerciseCategory {
  WARMUP = 'warmup',
  MAIN = 'main',
  COOLDOWN = 'cooldown'
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  bodyParts?: BodyPart[]; // For main exercises
  duration?: number; // In seconds, default suggestion
  reps?: string;
  emoji: string;
}

export interface WorkoutPlan {
  id: string;
  date: number;
  exercises: Exercise[];
  totalDuration: number; // in minutes
  completed: boolean;
  selectedParts: BodyPart[];
}

export interface HistoryRecord {
  id: string;
  date: number;
  duration: number;
  parts: BodyPart[];
  completedRate: number; // 0-100
  exercises: Exercise[];
}

export enum ViewState {
  SETUP = 'SETUP',
  PLAN = 'PLAN',
  FOCUS = 'FOCUS',
  HISTORY = 'HISTORY'
}