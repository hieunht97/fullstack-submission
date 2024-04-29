interface BMIResult {
  weight: number;
  height: number;
  bmi: string;
}

export const calculateBmi = (weight: number, height: number): BMIResult => {
  const stat = height / ((weight / 100) * (weight / 100));
  let result: string;
  if (stat < 18.5) {
    result = "Underweight (unhealthy weight)";
  } else if (stat > 18.5 && stat < 25) {
    result = "Normal (healthy weight)";
  } else {
    result = "Overweight (at risk)";
  }

  return {
    height,
    weight,
    bmi: result,
  };
};
