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
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Machine } from "@src/types";

interface MachineListProps {
  machines: Machine[];
  onOpenAddModal: () => void;
  onEdit: (machineId: number) => void;
  onDelete: (machineId: number) => void;
}

const MachineList: React.FC<MachineListProps> = ({
  machines,
  onOpenAddModal,
  onEdit,
  onDelete,
}) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Machine Management
      </Typography>
      <Button
        variant="contained"
        onClick={onOpenAddModal}
        sx={{ marginBottom: 2 }}
      >
        Add Machine
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Location Type</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Expected Sales / Day (Baht)</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Average Profit Margin (%)</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Rent Cost / Day (Baht)</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Electric Cost / Temp / Day (Baht per °C)</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
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
                <TableCell align="right">
                  {machine.averageProfitMarginPercentage.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {machine.rentCostPerDay.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {machine.electricCostPerTempPerDay.toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      color="primary"
                      onClick={() => onEdit(machine.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="error"
                      onClick={() => onDelete(machine.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MachineList;
