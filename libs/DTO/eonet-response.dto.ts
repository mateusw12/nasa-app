export interface EonetEvent {
  id: string;
  title: string;
  description?: string;
  categories: Array<{ id: string; title: string }>;
  geometry: Array<{ date: string; type: string; coordinates: number[] }>;
}

export interface EonetResponse {
  events: EonetEvent[];
}
