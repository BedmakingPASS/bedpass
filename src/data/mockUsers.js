// src/data/mockUsers.js
// NOTE: Ini data SEMENTARA untuk testing sebelum backend siap.

export const mockUsers = [
  {
    id: 1,
    username: "gm1",
    password: "gm123",
    role: "general_manager",
    name: "Lety Latifah",
  },
  {
    id: 2,
    username: "supervisor1",
    password: "super123",
    role: "supervisor",
    name: "Galih Saputra",
  },
  {
    id: 3,
    username: "trainee1",
    password: "trainee123",
    role: "trainee",
    name: "Hanna",
  },
];

export const roleLabels = {
  general_manager: "General Manager",
  supervisor: "Supervisor Housekeeping",
  trainee: "Trainee",
};