export type Step = {
  label: string;
  description: string | React.ReactNode;
};

export type StepperProps = {
  steps: Step[];
  currentIndex: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};
