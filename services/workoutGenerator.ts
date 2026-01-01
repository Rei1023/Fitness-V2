import { EXERCISE_DB } from '../constants';
import { BodyPart, Exercise, ExerciseCategory, WorkoutPlan } from '../types';

export const generateWorkout = (selectedParts: BodyPart[], minutes: number): WorkoutPlan => {
  // Rule A: Warmup
  // Quantity = Number of selected parts
  // Priority: Match selected parts, else random
  const warmupCount = Math.max(selectedParts.length, 1);
  const potentialWarmups = EXERCISE_DB.filter(e => e.category === ExerciseCategory.WARMUP);
  const selectedWarmups: Exercise[] = [];
  
  // Sort by relevance to selected parts
  potentialWarmups.sort((a, b) => {
    const aMatch = a.bodyParts?.some(p => selectedParts.includes(p)) ? 1 : 0;
    const bMatch = b.bodyParts?.some(p => selectedParts.includes(p)) ? 1 : 0;
    return bMatch - aMatch;
  });

  // Pick top N
  for (let i = 0; i < warmupCount; i++) {
    // Wrap around if we run out of unique warmups
    selectedWarmups.push(potentialWarmups[i % potentialWarmups.length]);
  }

  // Rule B: Main Workout
  // Total Exercises = ceil((minutes - 10) / 7)
  const totalMainCount = Math.ceil((minutes - 10) / 7);
  
  // Allocate evenly across selected parts
  // We will distribute the totalMainCount among selectedParts
  const mainExercises: Exercise[] = [];
  
  // Determine how many exercises per part. 
  // We can't just divide, we need to distribute remainders.
  const baseCount = Math.floor(totalMainCount / selectedParts.length);
  const remainder = totalMainCount % selectedParts.length;
  
  // Ordering: AABB (Iterate through parts, add all exercises for that part)
  selectedParts.forEach((part, index) => {
    // First 'remainder' parts get +1 exercise
    const countForThisPart = baseCount + (index < remainder ? 1 : 0);
    
    if (countForThisPart > 0) {
      const available = EXERCISE_DB.filter(e => 
        e.category === ExerciseCategory.MAIN && e.bodyParts?.includes(part)
      );
      
      // Shuffle available
      const shuffled = available.sort(() => 0.5 - Math.random());
      
      // Add to main list
      mainExercises.push(...shuffled.slice(0, countForThisPart));
    }
  });

  // Rule C: Cooldown
  // 1. One General Cooldown (tagged 'ALL' or 'GENERAL')
  // 2. One Specific Cooldown per selected part
  const selectedCooldowns: Exercise[] = [];
  const potentialCooldowns = EXERCISE_DB.filter(e => e.category === ExerciseCategory.COOLDOWN);
  
  // C1: General
  const generalPool = potentialCooldowns.filter(c => c.bodyParts?.includes(BodyPart.ALL));
  if (generalPool.length > 0) {
     selectedCooldowns.push(generalPool[Math.floor(Math.random() * generalPool.length)]);
  } else {
     // Fallback to any cooldown if no general specific found
     selectedCooldowns.push(potentialCooldowns[0]);
  }

  // C2: Specific
  selectedParts.forEach(part => {
    // Try to find a cooldown for this part that isn't already selected
    const specific = potentialCooldowns.find(c => 
      c.bodyParts?.includes(part) && !selectedCooldowns.some(sc => sc.id === c.id)
    );
    
    if (specific) {
      selectedCooldowns.push(specific);
    } else {
      // If no specific unique one found, pick any unique one
      const random = potentialCooldowns.find(c => !selectedCooldowns.some(sc => sc.id === c.id));
      if (random) selectedCooldowns.push(random);
    }
  });

  return {
    id: Date.now().toString(),
    date: Date.now(),
    exercises: [...selectedWarmups, ...mainExercises, ...selectedCooldowns],
    totalDuration: minutes,
    completed: false,
    selectedParts
  };
};