import type { AttendanceRecord } from "../../types";

import { seedAttendance } from "../../data/attendance";

import { getStorage, setStorage } from "../../utils/storageUtils";

import { STORAGE_KEYS } from "../../constants/appConstants";

export async function getAttendance(): Promise<AttendanceRecord[]> {
  return getStorage(STORAGE_KEYS.attendance, seedAttendance);
}

export async function saveAttendance(record: AttendanceRecord) {
  const records = await getAttendance();

  const index = records.findIndex(
    (item) =>
      item.employeeId === record.employeeId && item.date === record.date,
  );

  if (index >= 0) {
    records[index] = record;
  } else {
    records.push(record);
  }

  setStorage(STORAGE_KEYS.attendance, records);
}
