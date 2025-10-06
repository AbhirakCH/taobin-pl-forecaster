import { useState } from "react";
import { Container } from "@mui/material";
import { Machine } from "@src/types";
import MachineList from "@src/features/AdminPanel/MachineList";
import MachineFormModal from "@src/features/AdminPanel/MachineFormModal";

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <MachineList
        machines={machines}
        onOpenAddModal={() => setIsModalOpen(true)}
        onEdit={onEditMachine}
      />
      <MachineFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={editingMachine ? handleUpdateMachine : handleAddMachine}
        initialData={editingMachine}
        onClearInitialData={() => setEditingMachine(null)}
      />
    </Container>
  );
}

export default App;
