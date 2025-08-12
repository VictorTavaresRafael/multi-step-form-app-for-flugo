import React, { useState } from 'react';
import  EmployeeList  from '@/components/EmployeeList';
import Drawer from '@/components/Drawer';
import  EmployeeForm  from '@/components/EmployeeForm';
import { useEmployees } from '@/hooks/useEmployees';
import { Snackbar, Alert, Grid } from '@mui/material';
import type { EmployeeFormData } from '@/types/employee';

type View = 'list' | 'form';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const { employees, addEmployee } = useEmployees();
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success'|'error'}>({open: false, message: '', severity: 'success'});

  const handleAddEmployee = () => {
    setCurrentView('form');
  };
  
  const handleFormSubmit = async (formData: EmployeeFormData) => {
    try {
      const newEmployee = await addEmployee(formData);
      setSnackbar({open: true, message: `Colaborador ${newEmployee.name} adicionado com sucesso!`, severity: 'success'});
      setCurrentView('list');
    } catch (error) {
      setSnackbar({open: true, message: 'Erro ao adicionar colaborador. Por favor, tente novamente.', severity: 'error'});
    }
  };

  const handleFormCancel = () => {
    setCurrentView('list');
  };

  return (
    <Grid container spacing={2} direction="column" style={{ minHeight: '100vh', background: '#fafafa' }}>
      <Grid size={12} >
        {currentView === 'list' ? (
          <EmployeeList 
            employees={employees as any}
            onAddEmployee={handleAddEmployee}
          />
        ) : (
          <EmployeeForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({...s, open: false}))} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Alert onClose={() => setSnackbar(s => ({...s, open: false}))} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        </Grid>
    </Grid>
  );
};

export default Index;