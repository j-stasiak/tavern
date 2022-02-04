export interface Course {
  id: string;
  title: string;
  description: string;
  stepsAmount: number;
  isActive: boolean;
  steps: Step[];
}

interface Step {
  id: string;
  title: string;
  description: string;
  stepNumber: number;
  isActive: boolean;
}
