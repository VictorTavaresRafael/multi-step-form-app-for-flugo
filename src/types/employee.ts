export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  status: 'Ativo' | 'Inativo';
  avatar?: string;
  createdAt: Date;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  department: string;
  activeOnCreate: boolean;
}

export type FormStep = 'basic' | 'professional';