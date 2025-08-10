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
    <Box p={{ xs: 1, sm: 2, md: 3 }}>
      {/* Header */}
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between" mb={{ xs: 2, sm: 4 }} gap={{ xs: 2, sm: 0 }}>
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }} color="text.primary" mb={{ xs: 1, sm: 0 }}>
          <Users style={{ width: 22, height: 22 }} />
          <Typography variant="body1" fontSize={{ xs: 16, sm: 18 }}>Colaboradores</Typography>
          <ChevronDown style={{ width: 18, height: 18 }} />
        </Box>
        <Typography variant="h5" fontWeight={600} fontSize={{ xs: 18, sm: 24 }}>Colaboradores</Typography>
        <Button variant="contained" color="success" onClick={onAddEmployee} sx={{ minWidth: { xs: '100%', sm: 160 }, fontSize: { xs: 14, sm: 16 } }}>Novo Colaborador</Button>
      </Box>

      {/* Employee Table */}
      <Card>
        <CardHeader />
        <CardContent>
          {employees.length === 0 ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={{ xs: 4, sm: 10 }}>
              <Users style={{ width: 48, height: 64, color: '#bdbdbd', marginBottom: 24 }} />
              <Typography variant="h5" fontWeight={600} mb={2} color="text.primary" fontSize={{ xs: 18, sm: 24 }}>Nenhum colaborador cadastrado</Typography>
              <Typography color="text.secondary" mb={3} fontSize={{ xs: 15, sm: 18 }}>Comece adicionando seu primeiro colaborador ao sistema.</Typography>
              <Button variant="contained" color="success" size="large" onClick={onAddEmployee} sx={{ minWidth: { xs: '100%', sm: 240 }, fontWeight: 500, fontSize: { xs: 15, sm: 18 } }}>
                Adicionar Colaborador
              </Button>
            </Box>
          ) : (
            <Box sx={{ overflowX: 'auto' }}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left px-2 py-2 text-xs sm:text-base">Nome</th>
                    <th className="text-left px-2 py-2 text-xs sm:text-base">Email</th>
                    <th className="text-left px-2 py-2 text-xs sm:text-base">Departamento</th>
                    <th className="text-left px-2 py-2 text-xs sm:text-base">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b">
                      <td className="px-2 py-2">
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 }, bgcolor: '#4caf50', color: '#fff', fontWeight: 600 }}>
                            {getInitials(employee.name)}
                          </Avatar>
                          <Typography fontWeight={500} fontSize={{ xs: 14, sm: 16 }}>{employee.name}</Typography>
                        </Box>
                      </td>
                      <td className="px-2 py-2">
                        <Typography fontSize={{ xs: 13, sm: 15 }}>{employee.email}</Typography>
                      </td>
                      <td className="px-2 py-2">
                        <Typography fontSize={{ xs: 13, sm: 15 }}>{employee.department}</Typography>
                      </td>
                      <td className="px-2 py-2">
                        <Chip
                          label={employee.status === 'Ativo' ? 'Ativo' : 'Inativo'}
                          color={employee.status === 'Ativo' ? 'success' : 'error'}
                          variant={employee.status === 'Ativo' ? 'filled' : 'outlined'}
                          sx={{ fontSize: { xs: 12, sm: 14 }, px: { xs: 1, sm: 2 } }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}