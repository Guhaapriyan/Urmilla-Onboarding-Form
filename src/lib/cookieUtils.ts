import Cookies from 'js-cookie';

const FORM_DATA_KEY = 'candidate_form_data';
const CURRENT_STEP_KEY = 'candidate_current_step';

const COOKIE_OPTIONS = {
  expires: 3,
  secure: true,
  sameSite: 'strict' as const,
};

export const saveFormDataToCookie = (data: any) => {
  try {
    Cookies.set(FORM_DATA_KEY, JSON.stringify(data), COOKIE_OPTIONS);
  } catch (error) {
    console.error('Error saving form data to cookie:', error);
  }
};

export const loadFormDataFromCookie = (): any => {
  try {
    const data = Cookies.get(FORM_DATA_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading form data from cookie:', error);
    return {};
  }
};

export const saveCurrentStepToCookie = (step: number) => {
  try {
    Cookies.set(CURRENT_STEP_KEY, step.toString(), COOKIE_OPTIONS);
  } catch (error) {
    console.error('Error saving current step to cookie:', error);
  }
};

export const loadCurrentStepFromCookie = (): number => {
  try {
    const step = Cookies.get(CURRENT_STEP_KEY);
    return step ? parseInt(step, 10) : 0;
  } catch (error) {
    console.error('Error loading current step from cookie:', error);
    return 0;
  }
};

export const clearFormCookies = () => {
  try {
    Cookies.remove(FORM_DATA_KEY);
    Cookies.remove(CURRENT_STEP_KEY);
  } catch (error) {
    console.error('Error clearing form cookies:', error);
  }
};

export const clearCurrentStepData = (formData: any, currentStep: number, steppers: any[]) => {
  const currentStepFields = steppers[currentStep]?.fields?.map((field: any) => field.name) || [];
  const clearedData = { ...formData };

  currentStepFields.forEach((fieldName: string) => {
    delete clearedData[fieldName];
  });
  
  return clearedData;
};
