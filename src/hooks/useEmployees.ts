// src/hooks/useEmployees.ts

import { useState, useEffect, useCallback } from 'react';
import type { Collaborator } from '@/types/collaborator'; // Usando nosso tipo unificado
import {
  getCollaborators,
  addCollaborator as addCollaboratorService,
  deleteCollaborator as deleteCollaboratorService,
  updateCollaborator as updateCollaboratorService
} from '@/firebase/collaboratorService'; // Ajuste o caminho se necessário

// Este tipo representa os dados que vêm do formulário
// Igual ao seu EmployeeFormData, mas usando nosso tipo
type CollaboratorFormData = Omit<Collaborator, 'id' | 'status' | 'createdAt'> & {
  activeOnCreate?: boolean;
};

export function useEmployees() {
  const [employees, setEmployees] = useState<Collaborator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para buscar os dados iniciais do Firebase
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const initialEmployees = await getCollaborators();
  // Garante que todos tenham id
  setEmployees(initialEmployees.filter(e => !!e.id));
      } catch (error) {
        console.error("Falha ao buscar colaboradores:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Adicionar um colaborador
  const addEmployee = useCallback(async (formData: CollaboratorFormData) => {
    const newCollaboratorData: Omit<Collaborator, 'id' | 'createdAt'> = {
      name: formData.name,
      email: formData.email,
      department: formData.department,
      status: formData.activeOnCreate ? 'Ativo' : 'Inativo',
    };

    try {
      const newId = await addCollaboratorService(newCollaboratorData);

      const newEmployee = {
        id: newId,
        ...newCollaboratorData,
        createdAt: new Date()
      };

      // Atualiza o estado local
      setEmployees(prev => [newEmployee, ...prev]);
      return newEmployee;
    } catch (error) {
      console.error("Falha ao adicionar colaborador:", error);
      // Em caso de erro, é uma boa prática lançar o erro novamente
      // para que o código que chamou a função saiba que algo deu errado.
      throw error;
    }
  }, []);

  // Remover um colaborador
  const removeEmployee = useCallback(async (id: string) => {
    try {
      await deleteCollaboratorService(id);
      // Remove da lista local para feedback instantâneo
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (error) {
      console.error("Falha ao remover colaborador:", error);
    }
  }, []);

  // Atualizar um colaborador
  const updateEmployee = useCallback(async (id: string, updates: Partial<Collaborator>) => {
    try {
      await updateCollaboratorService(id, updates);
      // Atualiza a lista local para feedback instantâneo
      setEmployees(prev =>
        prev.map(emp => (emp.id === id ? { ...emp, ...updates } : emp))
      );
    } catch (error) {
      console.error("Falha ao atualizar colaborador:", error);
    }
  }, []);

  return {
    employees,
    isLoading, // Adicionamos um estado de loading, que é útil para a UI
    addEmployee,
    removeEmployee,
    updateEmployee
  };
}