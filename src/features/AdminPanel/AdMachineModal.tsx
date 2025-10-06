import React, { useState } from "react";
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
} from "@mui/material";
import { Machine } from "@src/types";

// กำหนด Type ของ Props ที่ Modal นี้จะได้รับ
interface AddMachineModalProps {
  open: boolean;
  onClose: () => void;
  // onSave: (data: NewMachineData) => void; // เราจะใช้ใน step ถัดไป
}

// Style มาตรฐานสำหรับ Modal ให้อยู่ตรงกลางจอ
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

const AddMachineModal: React.FC<AddMachineModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<MachineFormData>({
    name: "",
    locationType: "SCHOOL",
    expectedSalesPerDay: 0,
    averageProfitMarginPercentage: 0,
    rentCostPerDay: 0,
    electricCostPerTempPerDay: 0,
  });

  // 3. สร้าง Handler กลางสำหรับอัปเดต State เมื่อผู้ใช้กรอกข้อมูล
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
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
      <Box sx={style}>
        <Typography id="add-machine-modal-title" variant="h6" component="h2">
          Add New Machine
        </Typography>

        <Box component="form" sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormControl fullWidth>
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
            </FormControl>
            <TextField
              fullWidth
              label="Expected Sales / Day (Baht)"
              name="expectedSalesPerDay"
              type="number"
              value={formData.expectedSalesPerDay}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Average Profit Margin (%)"
              name="averageProfitMarginPercentage"
              type="number"
              placeholder="e.g., 0.4 for 40%"
              value={formData.averageProfitMarginPercentage}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Rent Cost / Day (Baht)"
              name="rentCostPerDay"
              type="number"
              value={formData.rentCostPerDay}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Electric Cost / Temp / Day (Baht per °C)"
              name="electricCostPerTempPerDay"
              type="number"
              value={formData.electricCostPerTempPerDay}
              onChange={handleChange}
            />
          </Stack>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3, justifyContent: "flex-end" }}
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddMachineModal;
