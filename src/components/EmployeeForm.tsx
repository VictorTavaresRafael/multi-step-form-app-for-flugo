import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import type { EmployeeFormData, FormStep } from "@/types/employee";
import { useToast } from "@/hooks/use-toast";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import Drawer from "./Drawer";

const departments = [
  "Design",
  "TI",
  "Marketing",
  "Produto",
  "Vendas",
  "RH",
  "Financeiro",
];

export default function EmployeeForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<FormStep>("basic");
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    department: "",
    activeOnCreate: true,
  });
  const [errors, setErrors] = useState<Partial<EmployeeFormData>>({});
  const { toast } = useToast();

  const validateBasicInfo = (): boolean => {
    const newErrors: Partial<EmployeeFormData> = {};

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    else if (formData.name.length < 3)
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name))
      newErrors.name = "Nome deve conter apenas letras e espaços";

    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "E-mail inválido";

    setErrors((prevErrors) => ({
      ...prevErrors,
      name: newErrors.name,
      email: newErrors.email,
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validateProfessionalInfo = (): boolean => {
    const newErrors: Partial<EmployeeFormData> = {};

    if (!formData.department.trim()) {
      newErrors.department = "Departamento é obrigatório";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      department: newErrors.department,
    }));

    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: keyof EmployeeFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (validateBasicInfo()) {
      setCurrentStep("professional");
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
    // Aba da esquerda
    <Grid container sx={{ p: 3 }}>
      <Grid size={3}>
        <Drawer />
      </Grid>
      {/* Aba da direita */}
      <Grid size={8}>
        {/* TO DO: MUDAR COR DO BACKGROUND */}
        {/* Breadcrumb */}
        <Box display="flex" alignItems="center" gap={1} mb={0} mt={4}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ cursor: "pointer", fontWeight: 600 }}
            onClick={() => onCancel()}
          >
            Colaboradores
          </Typography>
          <ArrowRightAltIcon style={{ width: 25, height: 25, color: "#bdbdbd" }} />
          <Typography variant="body2" color="text.secondary">
            Cadastrar Colaborador
          </Typography>
        </Box>
        <LinearProgressWithLabel
          variant="determinate"
          color="success"
          value={currentStep === "basic" ? 0 : 50}
          sx={{ mb: 2, height: 6, borderRadius: 4 }}
        />

        {/* TO DO: MUDAR FONTE E CORES */}
        <Typography
          variant="h6"
          fontSize={{ xs: 17, md: 20 }}
          sx={{ fontWeight: 600, mt: 2 }}
        >
          {currentStep === "basic"
            ? "Informações Básicas"
            : "Informações Profissionais"}
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {currentStep === "basic" ? (
            <>
              <div>
                <FormControl fullWidth margin="normal">
                  <TextField
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="João da Silva"
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="outlined"
                    label="Nome"
                    color="success"
                    // to do: mudar inputProps para sx, para poder mudar a cor do field
                    inputProps={{ style: { fontSize: 15 } }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="nome@exemplo.com"
                    error={!!errors.email}
                    helperText={errors.email}
                    variant="outlined"
                    label="E-mail"
                    color="success"
                    // to do: mudar inputProps para sx, para poder mudar a cor do field
                    inputProps={{ style: { fontSize: 15 } }}
                  />
                </FormControl>
              </div>
              {/* TO DO: MUDAR COR DO SWITCH */}
              <FormControl fullWidth margin="normal">
                <Box display="flex" alignItems="center">
                  <Switch
                    checked={formData.activeOnCreate}
                    onChange={(e) =>
                      updateFormData("activeOnCreate", e.target.checked)
                    }
                    color="success"
                  />
                  <Typography variant="body2">
                    Ativar colaborador ao criar
                  </Typography>
                </Box>
              </FormControl>

              {/* TO DO: Mudar botões de lugar e propriedades de cor */}
              <Box mt={4} display="flex" justifyContent="space-between">
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => onCancel()}
                  sx={{
                    textAlign: "left",
                    ":hover": { backgroundColor: "transparent" },
                  }}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleNext}
                  sx={{ padding: "10px" }}
                >
                  Próximo
                </Button>
              </Box>
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
                    label="Departamento"
                    //mudar a cor do label
                    onChange={(e) =>
                      updateFormData("department", e.target.value)
                    }
                    color="success"
                    error={!!errors.department}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.department && (
                    <Typography color="error" variant="caption">
                      {errors.department}
                    </Typography>
                  )}
                </FormControl>
              </div>
              {/* TODO: fonte dos botões e titulos sem upcase */}
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => setCurrentStep("basic")}
                  sx={{
                    textAlign: "left",
                    ":hover": { backgroundColor: "transparent" },
                  }}
                >
                  Voltar
                </Button>
                <Button type="submit" variant="contained" color="success" sx={{ padding: "10px" }}>
                  Finalizar
                </Button>
              </Box>
            </>
          )}
        </form>
      </Grid>
    </Grid>
  );
}
