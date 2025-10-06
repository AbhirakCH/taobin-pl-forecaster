import { useState } from "react";
import { Container } from "@mui/material";
import { Machine } from "@src/types";
import MachineList from "@src/features/AdminPanel/MachineList";
import AddMachineModal from "@src/features/AdminPanel/AdMachineModal";

const DUMMY_MACHINES = [
  {
    id: 1,
    name: "สามย่าน มิตรทาวน์",
    locationType: "SHOPPING MALL" as const,
    expectedSalesPerDay: 6500,
    averageProfitMarginPercentage: 0.45, // 45%
    rentCostPerDay: 550,
    electricCostPerTempPerDay: 12,
  },
  {
    id: 2,
    name: "โรงพยาบาลจุฬาลงกรณ์",
    locationType: "HOSPITAL" as const,
    expectedSalesPerDay: 8000,
    averageProfitMarginPercentage: 0.5, // 50%
    rentCostPerDay: 600,
    electricCostPerTempPerDay: 15,
  },
  {
    id: 3,
    name: "คณะวิศวกรรมศาสตร์ จุฬาฯ",
    locationType: "SCHOOL" as const,
    expectedSalesPerDay: 4500,
    averageProfitMarginPercentage: 0.4, // 40%
    rentCostPerDay: 300,
    electricCostPerTempPerDay: 10,
  },
];

function App() {
  const [machines, setMachines] = useState<Machine[]>(DUMMY_MACHINES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddMachine = (newMachineData: Omit<Machine, "id">) => {
    setMachines((prevMachines) => {
      const newMachineWithId: Machine = {
        id: Date.now(), // สร้าง ID ที่ไม่ซ้ำกันแบบง่ายๆ
        ...newMachineData,
      };
      // คืนค่าเป็น Array ใหม่ที่มีของเก่าทั้งหมด และของใหม่อีกหนึ่งชิ้น
      return [...prevMachines, newMachineWithId];
    });
    setIsAddModalOpen(false); // ปิด Modal หลังจาก Save
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <MachineList
        machines={machines}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />
      <AddMachineModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddMachine}
      />
    </Container>
  );
}

export default App;
