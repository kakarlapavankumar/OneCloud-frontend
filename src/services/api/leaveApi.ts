import type { LeaveRequest } from "../../types";

import { seedLeaves } from "../../data/leaves";

import { getStorage, setStorage } from "../../utils/storageUtils";

import { STORAGE_KEYS } from "../../constants/appConstants";

export async function getLeaves(): Promise<LeaveRequest[]> {
  return getStorage(STORAGE_KEYS.leaves, seedLeaves);
}

export async function addLeave(leave: LeaveRequest) {
  const leaves = await getLeaves();

  leaves.push(leave);

  setStorage(STORAGE_KEYS.leaves, leaves);
}

export async function updateLeaveStatus(
  id: string,
  status: LeaveRequest["status"],
) {
  const leaves = await getLeaves();

  const index = leaves.findIndex((leave) => leave.id === id);

  if (index === -1) {
    throw new Error("Leave request not found.");
  }

  leaves[index] = {
    ...leaves[index],
    status,
  };

  setStorage(STORAGE_KEYS.leaves, leaves);
}
