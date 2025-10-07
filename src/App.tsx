import { useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Machine } from "@src/types";
import MachineList from "@src/features/AdminPanel/MachineList";
import MachineFormModal from "@src/features/AdminPanel/MachineFormModal";
import ConfirmDeleteModal from "@src/features/AdminPanel/ConfirmDeleteModal";
import Dashboard from "@src/features/Dashboard/Dashboard";

const DUMMY_MACHINES = [
  {
    id: 1,
    name: "สามย่าน มิตรทาวน์",
    locationType: "SHOPPING MALL" as const,
    expectedSalesPerDay: 6500,
    averageProfitMarginPercentage: 0.45,
    rentCostPerDay: 550,
    electricCostPerTempPerDay: 12,
  },
  {
    id: 2,
    name: "โรงพยาบาลจุฬาลงกรณ์",
    locationType: "HOSPITAL" as const,
    expectedSalesPerDay: 8000,
    averageProfitMarginPercentage: 0.5,
    rentCostPerDay: 600,
    electricCostPerTempPerDay: 15,
  },
  {
    id: 3,
    name: "คณะวิศวกรรมศาสตร์ จุฬาฯ",
    locationType: "SCHOOL" as const,
    expectedSalesPerDay: 4500,
    averageProfitMarginPercentage: 0.4,
    rentCostPerDay: 300,
    electricCostPerTempPerDay: 10,
  },
];

function App() {
  const [machines, setMachines] = useState<Machine[]>(DUMMY_MACHINES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [machineToDelete, setMachineToDelete] = useState<Machine | null>(null);

  const handleAddMachine = (newMachineData: Omit<Machine, "id">) => {
    setMachines((prevMachines) => {
      const newMachineWithId: Machine = {
        id: Date.now(),
        ...newMachineData,
      };
      return [...prevMachines, newMachineWithId];
    });
    setIsModalOpen(false);
  };

  const onEditMachine = (machineId: number) => {
    const machineToEdit = machines.find((m) => m.id === machineId);
    if (machineToEdit) {
      setEditingMachine(machineToEdit);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMachine(null);
  };

  const handleUpdateMachine = (updatedMachineData: Omit<Machine, "id">) => {
    if (!editingMachine) return;

    setMachines((prevMachines) =>
      prevMachines.map((machine) =>
        machine.id === editingMachine.id
          ? { ...machine, ...updatedMachineData }
          : machine
      )
    );
    handleCloseModal();
  };

  const handleOpenDeleteConfirm = (machineId: number) => {
    const machine = machines.find((m) => m.id === machineId);
    if (machine) {
      setMachineToDelete(machine);
    }
  };

  const handleCloseDeleteConfirm = () => {
    setMachineToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!machineToDelete) return;
    setMachines((prevMachines) =>
      prevMachines.filter((m) => m.id !== machineToDelete.id)
    );
    handleCloseDeleteConfirm();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <MachineList
            machines={machines}
            onOpenAddModal={() => setIsModalOpen(true)}
            onEdit={onEditMachine}
            onDelete={handleOpenDeleteConfirm}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Dashboard machines={machines} />
        </Grid>
      </Grid>

      <MachineFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={editingMachine ? handleUpdateMachine : handleAddMachine}
        initialData={editingMachine}
        onClearInitialData={() => setEditingMachine(null)}
      />
      <ConfirmDeleteModal
        open={!!machineToDelete}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
        machine={machineToDelete}
      />
    </Container>
  );
}

export default App;
