import React from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Step {
  id: number;
  title: string;
  completed?: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number; // 0-based index
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  const getMobileSteps = () => {
    const next = currentStep < steps.length - 1 ? currentStep + 1 : null;
    const visibleSteps = [];
    visibleSteps.push({ ...steps[currentStep], position: 'current' });
    if (next !== null) visibleSteps.push({ ...steps[next], position: 'next' });
    return visibleSteps;
  };

  const getMediumSteps = () => {
    const totalVisible = 6;
    const sideSteps = Math.floor((totalVisible - 1) / 2);
    let startIndex = Math.max(0, currentStep - sideSteps);
    let endIndex = Math.min(steps.length - 1, currentStep + sideSteps);
    if (endIndex - startIndex + 1 < totalVisible) {
      if (startIndex === 0) {
        endIndex = Math.min(steps.length - 1, startIndex + totalVisible - 1);
      } else if (endIndex === steps.length - 1) {
        startIndex = Math.max(0, endIndex - totalVisible + 1);
      }
    }
    return steps.slice(startIndex, endIndex + 1);
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  const StepCircle = ({ step, status, isMobile = false }: {
    step: Step;
    status: string;
    isMobile?: boolean;
  }) => (
    <div className={cn(
      "flex flex-col items-center space-y-1",
      isMobile && "flex-1",
      "w-24" // reduced width
    )}>
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ]",
        status === 'completed' && "bg-[#313475] border-[#313475] text-white",
        status === 'active' && "bg-[#313475] border-[#313475] text-white shadow",
        status === 'pending' && "bg-white border-gray-400 text-gray-500"
      )}>
        {status === 'completed' ? (
          <Check className="w-4 h-4" />
        ) : (
          <span className="text-xs font-semibold">{step.id}</span>
        )}
      </div>

      <div className="text-center w-full">
        <p
          title={step.title}
          className={cn(
            "text-xs font-medium leading-tight w-full dark:text-white",
            status === 'active'
              ? "text-[#313475] whitespace-normal"
              : "truncate text-ellipsis overflow-hidden",
            status === 'completed' && "text-gray-800",
            status === 'pending' && "text-gray-500"
          )}
        >
          {step.title}
        </p>
      </div>
    </div>
  );

  const ConnectorLine = ({ completed }: { completed: boolean }) => (
    <div className={cn(
      "flex-1 h-0.5 mx-1 transition-colors duration-200",
      completed ? "bg-[#313475]" : "bg-gray-300"
    )} />
  );

  return (
    <div className={cn("w-full overflow-x-hidden", className)}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2 dark:text-white">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#313475] h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden lg:flex items-center justify-between flex-wrap gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <StepCircle step={step} status={getStepStatus(index)} />
            {index < steps.length - 1 && (
              <ConnectorLine completed={index < currentStep} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Medium Stepper */}
      <div className="hidden md:flex lg:hidden items-center justify-between flex-wrap gap-2">
        {getMediumSteps().map((step, index) => {
          const realIndex = steps.findIndex(s => s.id === step.id);
          return (
            <React.Fragment key={step.id}>
              <StepCircle step={step} status={getStepStatus(realIndex)} />
              {index < getMediumSteps().length - 1 && (
                <ConnectorLine completed={realIndex < currentStep} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          {getMobileSteps().map((step, index) => {
            const realIndex = steps.findIndex(s => s.id === step.id);
            return (
              <React.Fragment key={step?.id}>
                <StepCircle step={step} status={getStepStatus(realIndex)} isMobile />
                {index < getMobileSteps().length - 1 && (
                  <ConnectorLine completed={realIndex < currentStep} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Navigation Info */}
        {/* <div className="flex items-center justify-center mt-4 space-x-2"> */}
          {/* {currentStep > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <ChevronLeft className="w-3 h-3 mr-1" />
              {currentStep} more behind
            </div>
          )}
          {currentStep < steps.length - 1 && (
            <div className="flex items-center text-xs text-gray-500">
              {steps.length - currentStep - 1} more to go
              <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          )} */}
        {/* </div> */}
      </div>
    </div>
  );
}
