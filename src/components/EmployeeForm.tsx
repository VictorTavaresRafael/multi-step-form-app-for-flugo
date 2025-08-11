import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, TextField, FormControl, InputLabel, Select, MenuItem, Switch, LinearProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CheckCircle2 } from 'lucide-react';
import type { EmployeeFormData, FormStep } from '@/types/employee';
import { useToast } from '@/hooks/use-toast';

const departments = [
  'Design', 'TI', 'Marketing', 'Produto', 'Vendas', 'RH', 'Financeiro'
];

export function EmployeeForm({ onSubmit, onCancel }: { onSubmit: (data: EmployeeFormData) => void; onCancel: () => void; }) {
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '', email: '', department: '', activeOnCreate: true
  });
  const [errors, setErrors] = useState<Partial<EmployeeFormData>>({});
  const { toast } = useToast();

  const validateBasicInfo = (): boolean => {
    const newErrors: Partial<EmployeeFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    else if (formData.name.length < 3) newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    else if (!/^[a-zA-Z\s]+$/.test(formData.name)) newErrors.name = 'Nome deve conter apenas letras e espaços';

    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'E-mail inválido';

    setErrors(prevErrors => ({
      ...prevErrors,
      name: newErrors.name,
      email: newErrors.email,
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validateProfessionalInfo = (): boolean => {
    const newErrors: Partial<EmployeeFormData> = {};
    
    if (!formData.department.trim()) {
      newErrors.department = 'Departamento é obrigatório';
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      department: newErrors.department,
    }));

    return Object.keys(newErrors).length === 0;
  };
  
  const updateFormData = (field: keyof EmployeeFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNext = () => {
    if (validateBasicInfo()) {
      setCurrentStep('professional');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isBasicInfoValid = validateBasicInfo();
    const isProfessionalInfoValid = validateProfessionalInfo();

    if (isBasicInfoValid && isProfessionalInfoValid) {
      toast({
          title: "Sucesso!",
          description: "Funcionário cadastrado.",
      });
      onSubmit(formData);
    } else {
      toast({
          title: "Erro de Validação",
          description: "Por favor, corrija os campos com erro.",
          variant: "destructive",
      });
    }
  };

  return (
    <Grid
      container
      minHeight="80vh"
      alignItems="center"
      justifyContent="center"
      px={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Grid container spacing={2} alignItems="flex-start">
          {/* Barra lateral */}
          <Grid item xs={12} md={4}>
            <Grid style={{ minWidth: 350 }} container direction="column" spacing={2}>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  p={2}
                  borderRadius={2}
                  sx={{
                    bgcolor: currentStep === 'basic' ? 'success.main' : 'grey.200',
                    color: currentStep === 'basic' ? 'success.contrastText' : 'text.secondary',
                  }}
                >
                  <Grid item>
                    {currentStep === 'professional' ? (
                      <CheckCircle2
                        style={{ width: 20, height: 20, color: '#4caf50' }}
                      />
                    ) : (
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 500,
                          fontSize: 14,
                        }}
                      >
                        1
                      </span>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography fontWeight={500} fontSize={{ xs: 15, md: 16 }}>
                      Infos Básicas
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  p={2}
                  borderRadius={2}
                  sx={{
                    bgcolor: currentStep === 'professional' ? 'success.main' : 'grey.200',
                    color: currentStep === 'professional' ? 'success.contrastText' : 'text.secondary',
                  }}
                >
                  <Grid item>
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'currentColor',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      2
                    </span>
                  </Grid>
                  <Grid item>
                    <Typography fontWeight={500} fontSize={{ xs: 15, md: 16 }}>
                      Infos Profissionais
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Conteúdo principal */}
          <Grid item xs={12} md={8}>
            <LinearProgress
              variant="determinate"
              value={currentStep === 'basic' ? 50 : 100}
              sx={{ mb: 2, height: 8, borderRadius: 4 }}
            />
            <Card
              sx={{
                mt: { xs: 2, md: 0 },
                boxShadow: 3,
                minHeight: 400,
                minWidth: { xs: 350, sm: 450, md: 500 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardHeader
                title={
                  <Typography variant="h6" fontSize={{ xs: 17, md: 20 }}>
                    {currentStep === 'basic'
                      ? 'Informações Básicas'
                      : 'Informações Profissionais'}
                  </Typography>
                }
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <form
                  onSubmit={handleSubmit}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {currentStep === 'basic' ? (
                    <>
                      <div>
                        <FormControl fullWidth margin="normal">
                          <TextField
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              updateFormData('name', e.target.value)
                            }
                            placeholder="João da Silva"
                            error={!!errors.name}
                            helperText={errors.name}
                            variant="outlined"
                            label="Nome"
                            inputProps={{ style: { fontSize: 15 } }}
                          />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                          <TextField
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData('email', e.target.value)
                            }
                            placeholder="nome@exemplo.com"
                            error={!!errors.email}
                            helperText={errors.email}
                            variant="outlined"
                            label="E-mail"
                            inputProps={{ style: { fontSize: 15 } }}
                          />
                        </FormControl>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                          mt={2}
                          mb={2}
                        >
                          <Grid item>
                            <Typography fontSize={{ xs: 15, md: 16 }}>
                              Ativar ao criar
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Switch
                              checked={formData.activeOnCreate}
                              onChange={(e) =>
                                updateFormData('activeOnCreate', e.target.checked)
                              }
                              color="success"
                              sx={{
                                transform: { xs: 'scale(0.9)', md: 'none' },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>

                      <Grid container spacing={2} pt={2}>
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="outlined"
                            onClick={onCancel}
                            type="button"
                            color="success"
                            fullWidth
                          >
                            Cancelar
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            type="button"
                            color="success"
                            fullWidth
                          >
                            Próximo
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <div>
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="department-label">Departamento</InputLabel>
                          <Select
                            labelId="department-label"
                            id="department"
                            value={formData.department}
                            onChange={(e) =>
                              updateFormData('department', e.target.value as string)
                            }
                            error={!!errors.department}
                            label="Departamento"
                            sx={{ fontSize: 15 }}
                          >
                            {departments.map((dep) => (
                              <MenuItem
                                key={dep}
                                value={dep}
                                sx={{ fontSize: 15 }}
                              >
                                {dep}
                              </MenuItem>
                            ))}
                          </Select>
                          {}
                          {errors.department && <Typography color="error" variant="caption" sx={{ pl: 2, pt: 1 }}>{errors.department}</Typography>}
                        </FormControl>
                      </div>

                      <Grid container spacing={2} pt={2}>
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="outlined"
                            onClick={() => setCurrentStep('basic')}
                            type="button"
                            color="success"
                            fullWidth
                          >
                            Voltar
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button
                            variant="contained"
                            onClick={handleSubmit}
                            type="submit"
                            color="success"
                            fullWidth
                          >
                            Salvar
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}