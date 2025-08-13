import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import Drawer from "./Drawer";
import Header from './Header';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { Employee } from '@/types/employee';

interface EmployeeListProps {
  employees: Employee[];
  onAddEmployee: () => void;
}

export default function EmployeeList({ employees, onAddEmployee }: EmployeeListProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Alterna entre asc e desc
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortColumn) return 0;

    const valA = String(a[sortColumn as keyof Employee] || '').toLowerCase();
    const valB = String(b[sortColumn as keyof Employee] || '').toLowerCase();

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      sx={{ minHeight: '100vh', background: '#fafafa', display: { xs: 'block', md: 'flex' } }}
    >
      {/* Espaço para o Drawer ou Header */}
      <Grid
        size={{ md: 2, sm: 12 }}
      >
        {/* Header apenas em telas pequenas/médias */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Header />
        </Box>

        {/* Drawer apenas em telas grandes */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Drawer />
        </Box>
      </Grid>

      {/* Conteúdo principal */}
      <Grid size={{ xs: 12, md: 9, sm: 12 }} sx={{ ml: { xs: 0, md: 10 } }}>
        <Grid container spacing={2} direction="column" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          {/* Cabeçalho da Seção de Conteúdo */}
          <Grid size={12} sx={{ p: 2, display: 'flex', justifyContent: 'end' }}>
            <Avatar
              sx={{
                display: { xs: 'none', sm: 'flex' },
                bgcolor: 'green',
                color: '#fff',
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                fontSize: { xs: 16, sm: 18 }
              }}
            >
              <AccountCircleIcon style={{ width: 20, height: 20 }} />
            </Avatar>
          </Grid>
          <Grid size={12} display={{ xs: 'block', sm: 'flex' }} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ p: 2, }}>
            <Typography variant="h5" fontWeight={600} textAlign={"center"} mb={{ xs: 2, sm: 0 }} color='black'>
              Colaboradores
            </Typography>
            <Button
              variant="contained"
              onClick={onAddEmployee}
              sx={{ width: { xs: '100%', sm: 'auto', backgroundColor: '#2E7D32' } }}
            >
              Novo Colaborador
            </Button>
          </Grid>
          <Card sx={{ mr: 2, width: { xs: '100%', sm: 'auto' } }}>
            <CardContent sx={{ p: 0, borderRadius: 4 }}>
              {employees.length === 0 ? (
                <Grid
                  container
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  py={{ xs: 4, sm: 8 }}
                >
                  <GroupsIcon style={{ width: 48, height: 64, color: '#bdbdbd', marginBottom: '24px' }} />
                  <Typography variant="h6" fontWeight={500} mb={1}>
                    Nenhum colaborador cadastrado
                  </Typography>
                  <Typography color="text.secondary" mb={3} textAlign="center">
                    Comece adicionando seu primeiro colaborador ao sistema.
                  </Typography>
                </Grid>
              ) : (
                <Grid size={12} sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', padding: 10 }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>
                        <th
                          onClick={() => handleSort('name')}
                          style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280', cursor: 'pointer', userSelect: 'none' }}
                        >
                          Nome
                          <span style={{ marginLeft: 6 }}>
                            <span style={{ opacity: sortColumn === 'name' && sortDirection === 'asc' ? 1 : 0.3 }}>▲</span>
                            <span style={{ opacity: sortColumn === 'name' && sortDirection === 'desc' ? 1 : 0.3, marginLeft: 2 }}>▼</span>
                          </span>
                        </th>

                        <th
                          onClick={() => handleSort('email')}
                          style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280', cursor: 'pointer', userSelect: 'none' }}
                        >
                          Email
                          <span style={{ marginLeft: 6 }}>
                            <span style={{ opacity: sortColumn === 'email' && sortDirection === 'asc' ? 1 : 0.3 }}>▲</span>
                            <span style={{ opacity: sortColumn === 'email' && sortDirection === 'desc' ? 1 : 0.3, marginLeft: 2 }}>▼</span>
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort('department')}
                          style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280', cursor: 'pointer', userSelect: 'none' }}
                        >
                          Departamento
                          <span style={{ marginLeft: 6 }}>
                            <span style={{ opacity: sortColumn === 'department' && sortDirection === 'asc' ? 1 : 0.3 }}>▲</span>
                            <span style={{ opacity: sortColumn === 'department' && sortDirection === 'desc' ? 1 : 0.3, marginLeft: 2 }}>▼</span>
                          </span>
                        </th>
                        <th
                          onClick={() => handleSort('status')}
                          style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280', cursor: 'pointer', userSelect: 'none' }}
                        >
                          Status
                          <span style={{ marginLeft: 6 }}>
                            <span style={{ opacity: sortColumn === 'status' && sortDirection === 'asc' ? 1 : 0.3 }}>▲</span>
                            <span style={{ opacity: sortColumn === 'status' && sortDirection === 'desc' ? 1 : 0.3, marginLeft: 2 }}>▼</span>
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedEmployees.map((employee) => (
                        <tr key={employee.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Avatar sx={{ width: 32, height: 32, bgcolor: '#2E7D32', color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>
                                {getInitials(employee.name)}
                              </Avatar>
                              <Typography variant="body2" fontWeight={500}>{employee.name}</Typography>
                            </Box>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <Typography variant="body2" color="text.secondary">{employee.email}</Typography>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <Typography variant="body2" color="text.secondary">{employee.department}</Typography>
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <Chip
                              label={employee.status}
                              color={employee.status === 'Ativo' ? 'success' : 'error'}
                              size="small"
                              sx={{ fontWeight: 500 }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}