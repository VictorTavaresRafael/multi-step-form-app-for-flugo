import React from 'react';
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
import GroupIcon from '@mui/icons-material/Group';
import type { Employee } from '@/types/employee';

interface EmployeeListProps {
  employees: Employee[];
  onAddEmployee: () => void;
}

export default function EmployeeList({ employees, onAddEmployee }: EmployeeListProps) {
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
    <Grid container spacing={2}>
      {/* Espaço para o Drawer */}
      <Grid size={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Drawer />
      </Grid>
      <Grid size={10}>
        <Grid container spacing={2} direction="column" style={{ minHeight: '100vh', background: '#fafafa' }}>
          {/* Cabeçalho da Seção de Conteúdo */}
          <Grid size={12} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ p: 2 }}>
            <Typography variant="h4" fontWeight={600} textAlign={"center"} mb={{ xs: 2, sm: 0 }}>
              Colaboradores
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={onAddEmployee}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Novo Colaborador
            </Button>
          </Grid>
          <Card sx={{ mr: 2 }}>
            <CardContent sx={{ p: 2 }}>
              {employees.length === 0 ? (
                <Grid
                  container
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  py={{ xs: 4, sm: 8 }}
                >
                  <GroupIcon style={{ width: 48, height: 64, color: '#bdbdbd', marginBottom: '24px' }} />
                  <Typography variant="h6" fontWeight={500} mb={1}>
                    Nenhum colaborador cadastrado
                  </Typography>
                  <Typography color="text.secondary" mb={3} textAlign="center">
                    Comece adicionando seu primeiro colaborador ao sistema.
                  </Typography>
                </Grid>
              ) : (
                <Grid size={12} sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', padding: 10}}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280' }}>Nome</th>
                        <th style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280' }}>Email</th>
                        <th style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280' }}>Departamento</th>
                        <th style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '12px 16px' }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Avatar sx={{ width: 32, height: 32, bgcolor: '#10B981', color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>
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

      {/* Tabela de Colaboradores dentro de um Card */}
    </Grid>
  );
}