import React from 'react';
import { Button, Card, CardContent, CardHeader, Avatar, Typography, Chip, Box } from '@mui/material';
import { ChevronDown, Users } from 'lucide-react';
import type { Employee } from '@/types/employee';

interface EmployeeListProps {
  employees: Employee[];
  onAddEmployee: () => void;
}

export function EmployeeList({ employees, onAddEmployee }: EmployeeListProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Box display="flex" alignItems="center" gap={2} color="text.primary">
          <Users style={{ width: 22, height: 22 }} />
          <Typography variant="body1">Colaboradores</Typography>
          <ChevronDown style={{ width: 18, height: 18 }} />
        </Box>
        <Typography variant="h5" fontWeight={600}>Colaboradores</Typography>
        <Button variant="contained" color="success" onClick={onAddEmployee}>Novo Colaborador</Button>
      </Box>

      {/* Employee Table */}
      <Card>
        <CardHeader />
        <CardContent>
          {employees.length === 0 ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={10}>
              <Users style={{ width: 64, height: 64, color: '#bdbdbd', marginBottom: 24 }} />
              <Typography variant="h5" fontWeight={600} mb={2} color="text.primary">Nenhum colaborador cadastrado</Typography>
              <Typography color="text.secondary" mb={3} fontSize={18}>Comece adicionando seu primeiro colaborador ao sistema.</Typography>
              <Button variant="contained" color="success" size="large" onClick={onAddEmployee} sx={{ minWidth: 240, fontWeight: 500, fontSize: 18 }}>
                Adicionar Colaborador
              </Button>
            </Box>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2">Nome</th>
                  <th className="text-left px-4 py-2">Email</th>
                  <th className="text-left px-4 py-2">Departamento</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b">
                    <td className="px-4 py-2">
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: '#4caf50', color: '#fff', fontWeight: 600 }}>
                          {getInitials(employee.name)}
                        </Avatar>
                        <Typography fontWeight={500}>{employee.name}</Typography>
                      </Box>
                    </td>
                    <td className="px-4 py-2">
                      <Typography>{employee.email}</Typography>
                    </td>
                    <td className="px-4 py-2">
                      <Typography>{employee.department}</Typography>
                    </td>
                    <td className="px-4 py-2">
                      <Chip
                        label={employee.status === 'Ativo' ? 'Ativo' : 'Inativo'}
                        color={employee.status === 'Ativo' ? 'success' : 'error'}
                        variant={employee.status === 'Ativo' ? 'filled' : 'outlined'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}