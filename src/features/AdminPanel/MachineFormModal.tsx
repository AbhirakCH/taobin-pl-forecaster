import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Fade,
} from "@mui/material";
import { Machine } from "@src/types";

interface AddMachineModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: MachineFormData) => void;
  initialData: MachineFormData | null;
  onClearInitialData: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type MachineFormData = Omit<Machine, "id">;

const MachineFormModal: React.FC<AddMachineModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  onClearInitialData,
}) => {
  const [formData, setFormData] = useState<MachineFormData>({
    name: "",
    locationType: "",
    expectedSalesPerDay: 0,
    averageProfitMarginPercentage: 0,
    rentCostPerDay: 0,
    electricCostPerTempPerDay: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        locationType: initialData.locationType,
        expectedSalesPerDay: initialData.expectedSalesPerDay,
        averageProfitMarginPercentage:
          initialData.averageProfitMarginPercentage,
        rentCostPerDay: initialData.rentCostPerDay,
        electricCostPerTempPerDay: initialData.electricCostPerTempPerDay,
      });
    } else {
      setFormData({
        name: "",
        locationType: "",
        expectedSalesPerDay: 0,
        averageProfitMarginPercentage: 0,
        rentCostPerDay: 0,
        electricCostPerTempPerDay: 0,
      });
    }
    setErrors({});
  }, [initialData, open]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Machine name is required.";
    }
    if (!formData.locationType) {
      newErrors.locationType = "Location type is required.";
    }
    if (formData.expectedSalesPerDay <= 0) {
      newErrors.expectedSalesPerDay = "Sales must be greater than 0.";
    }
    if (
      formData.averageProfitMarginPercentage <= 0 ||
      formData.averageProfitMarginPercentage > 1
    ) {
      newErrors.averageProfitMarginPercentage =
        "Profit margin must be between 0 and 1 (e.g., 0.4 for 40%).";
    }
    if (formData.rentCostPerDay <= 0) {
      newErrors.rentCostPerDay = "Rent cost must be greater than 0.";
    }
    if (formData.electricCostPerTempPerDay <= 0) {
      newErrors.electricCostPerTempPerDay =
        "Electric cost must be greater than 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      locationType: "",
      expectedSalesPerDay: 0,
      averageProfitMarginPercentage: 0,
      rentCostPerDay: 0,
      electricCostPerTempPerDay: 0,
    });
    setErrors({});
    onClearInitialData();
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }
    onSave(formData);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-machine-modal-title"
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="add-machine-modal-title"
            color="black"
            variant="h6"
            component="h2"
          >
            {initialData ? "Edit Machine" : "Add New Machine"}
          </Typography>

          <Box component="form" sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <FormControl fullWidth error={!!errors.locationType}>
                <InputLabel>Location Type</InputLabel>
                <Select
                  name="locationType"
                  value={formData.locationType}
                  label="Location Type"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="SCHOOL">SCHOOL</MenuItem>
                  <MenuItem value="SHOPPING MALL">SHOPPING MALL</MenuItem>
                  <MenuItem value="HOSPITAL">HOSPITAL</MenuItem>
                </Select>
                {errors.locationType && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 1.75 }}
                  >
                    {errors.locationType}
                  </Typography>
                )}
              </FormControl>
              <TextField
                fullWidth
                label="Expected Sales / Day (Baht)"
                name="expectedSalesPerDay"
                type="number"
                value={formData.expectedSalesPerDay}
                onChange={handleChange}
                error={!!errors.expectedSalesPerDay}
                helperText={errors.expectedSalesPerDay}
              />
              <TextField
                fullWidth
                label="Average Profit Margin (%)"
                name="averageProfitMarginPercentage"
                type="number"
                placeholder="e.g., 0.4 for 40%"
                value={formData.averageProfitMarginPercentage}
                onChange={handleChange}
                error={!!errors.averageProfitMarginPercentage}
                helperText={errors.averageProfitMarginPercentage}
              />
              <TextField
                fullWidth
                label="Rent Cost / Day (Baht)"
                name="rentCostPerDay"
                type="number"
                value={formData.rentCostPerDay}
                onChange={handleChange}
                error={!!errors.rentCostPerDay}
                helperText={errors.rentCostPerDay}
              />
              <TextField
                fullWidth
                label="Electric Cost / Temp / Day (Baht per °C)"
                name="electricCostPerTempPerDay"
                type="number"
                value={formData.electricCostPerTempPerDay}
                onChange={handleChange}
                error={!!errors.electricCostPerTempPerDay}
                helperText={errors.electricCostPerTempPerDay}
              />
            </Stack>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3, justifyContent: "flex-end" }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MachineFormModal;
