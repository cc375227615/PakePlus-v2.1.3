export interface Student {
  id: string;
  name: string;
  active: boolean; // For "Scope" filtering
}

export enum AppState {
  IDLE = 'IDLE',
  ROLLING = 'ROLLING',
  SELECTED = 'SELECTED',
}