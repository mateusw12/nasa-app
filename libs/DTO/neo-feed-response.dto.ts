export interface NearEarthApproach {
  close_approach_date: string;
  relative_velocity: {
    kilometers_per_hour: string;
  };
  miss_distance: {
    kilometers: string;
    lunar: string;
  };
  orbiting_body: string;
}

export interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: NearEarthApproach[];
}

export interface NeoFeedResponse {
  links: { next: string; previous: string; self: string };
  element_count: number;
  near_earth_objects: Record<string, NearEarthObject[]>;
}
