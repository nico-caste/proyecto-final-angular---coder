export interface InscriptionHistory {
  id: string;
  studentId: string;
  courseId: string;
  studentName: string;
  courseName: string;
  date: Date;
  type: 'INSCRIPTION';
}