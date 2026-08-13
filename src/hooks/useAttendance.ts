import { useCallback, useEffect, useState } from "react";

import type { AttendanceRecord } from "../types";

import { getAttendance, saveAttendance } from "../services/api/attendanceApi";

export default function useAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const load = useCallback(async () => {
    const nextRecords = await getAttendance();
    setRecords(nextRecords);
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadRecords = async () => {
      const nextRecords = await getAttendance();

      if (isActive) {
        setRecords(nextRecords);
      }
    };

    void loadRecords();

    return () => {
      isActive = false;
    };
  }, []);

  async function update(record: AttendanceRecord) {
    await saveAttendance(record);
    await load();
  }

  return {
    records,
    update,
    refresh: load,
  };
}
