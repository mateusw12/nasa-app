export interface SatellitePosition {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export class SatellitesService {
  static getSatellites(): Promise<SatellitePosition[]> {
    // Placeholder data until the mission-specific provider is selected.
    return Promise.resolve([
      { id: "iss", name: "ISS", latitude: 19.21, longitude: -57.13 },
      { id: "landsat-8", name: "Landsat 8", latitude: -6.11, longitude: 102.4 },
      { id: "terra", name: "Terra", latitude: 33.78, longitude: 12.84 },
    ]);
  }
}
