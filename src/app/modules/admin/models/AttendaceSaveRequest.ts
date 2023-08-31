export class AttendaceSaveRequest {
  employeeId!: number;
  startDateTime!: Date;
  endDateTime!: Date | null;
  employeeShiftId!: number | null;
}
