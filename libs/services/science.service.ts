import { ExternalApiClient } from "@/libs/api/external-client";
import { ExoplanetRecord, TechportProject } from "@/libs/DTO";

const TECHPORT_BASE_URL = "https://techport.nasa.gov/api";
const EXOPLANET_BASE_URL = "https://exoplanetarchive.ipac.caltech.edu";

export class ScienceService {
  static async getTechProjects(): Promise<TechportProject[]> {
    const url = `${TECHPORT_BASE_URL}/projects?updatedSince=2024-01-01`;

    const data = await ExternalApiClient.get<{ projects?: TechportProject[] }>(url, {
      revalidate: 7200,
    });

    return data.projects ?? [];
  }

  static getExoplanets(): Promise<ExoplanetRecord[]> {
    const query =
      "select+top+20+pl_name,hostname,discoverymethod,disc_year+from+pscomppars+order+by+disc_year+desc";

    const url = `${EXOPLANET_BASE_URL}/TAP/sync?query=${query}&format=json`;
    return ExternalApiClient.get<ExoplanetRecord[]>(url, { revalidate: 86400 });
  }
}
