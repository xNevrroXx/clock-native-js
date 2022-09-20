export type TClockTasks = "time" | "timer" | "stopwatch" | "alarm clock";
export interface TMainClockIdInterval {
  intervalID: number | null,
  timeMs: number | null,
  resetIntervalIDToZero: () => void
}