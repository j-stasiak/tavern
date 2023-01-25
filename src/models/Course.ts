export interface Course {
  title: string;
  description: string;
  id: string;
  isActive?: boolean;
  steps: Step[];
  stepsAmount: number;
}

export interface Step {
  title: string;
  description: string;
  stepNumber: number;
  isActive?: boolean;
  expectedResult: string;
  id: string;
}
