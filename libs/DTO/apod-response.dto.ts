import { NasaMediaType } from "@/libs/DTO/nasa-media-type.dto";

export interface APODResponse {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: NasaMediaType;
  service_version: string;
  title: string;
  url: string;
}
