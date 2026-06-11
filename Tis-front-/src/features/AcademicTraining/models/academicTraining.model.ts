export interface AcademicTraining {
  id?: string;
  institution: string;
  degree: string;
  level: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  certificateTest: File | null;
  certificateUrl?: string;
  isPublic?: boolean;
}
