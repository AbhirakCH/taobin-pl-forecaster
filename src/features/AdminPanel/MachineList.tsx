import React from "react";
import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { Machine } from "@src/types";

// 2. กำหนด Type ของ Props ที่ Component จะได้รับ
interface MachineListProps {
  machines: Machine[];
  onOpenAddModal: () => void;
}

// 3. ใช้ React.FC (Functional Component) และใส่ Type ของ Props เข้าไป
const MachineList: React.FC<MachineListProps> = ({
  machines,
  onOpenAddModal,
}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Machine Management
      </Typography>
      <Button variant="contained" onClick={onOpenAddModal}>
        Add Machine
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location Type</TableCell>
              <TableCell align="right">Expected Sales / Day (Baht)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machines.map((machine) => (
              <TableRow
                key={machine.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {machine.name}
                </TableCell>
                <TableCell>{machine.locationType}</TableCell>
                <TableCell align="right">
                  {machine.expectedSalesPerDay.toLocaleString()}
                </TableCell>
                <TableCell align="center">...</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MachineList;
