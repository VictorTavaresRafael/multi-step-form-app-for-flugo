// src/types/collaborator.d.ts
import type { Timestamp } from "firebase/firestore";

export interface Collaborator {
  id?: string;
  name: string;
  email: string;
  department: string;
  status: 'Ativo' | 'Inativo';
  createdAt?: Timestamp | Date; // Adicionado para compatibilidade
}