interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  daily_exercises: number[],
  target: number
): Result => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((hour) => hour > 0).length;
  const average =
    daily_exercises.reduce((acc, cur) => acc + cur, 0) / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;

  if (average >= target * 1.5) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (average + 0.5 >= target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "needs improvement";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// const days = process.argv.slice(2).map(Number);
// const target = days.shift();
// const result = calculateExercises(days, target);
// console.log(result);

export default calculateExercises;
