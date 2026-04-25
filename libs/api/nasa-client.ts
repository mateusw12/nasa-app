const NASA_BASE_URL = "https://api.nasa.gov";

export class NasaApiError extends Error {
  status: number;

  constructor(status: number, statusText: string) {
    super(`NASA request failed: ${status} ${statusText}`);
    this.status = status;
  }
}

interface FetchOptions {
  revalidate?: number;
}

export class NasaApiClient {
  private static readonly apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";

  private static withApiKey(path: string, params?: Record<string, string | undefined>): string {
    const url = new URL(`${NASA_BASE_URL}${path}`);
    url.searchParams.set("api_key", NasaApiClient.apiKey);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          url.searchParams.set(key, value);
        }
      }
    }

    return url.toString();
  }

  static buildNasaUrl(path: string, params?: Record<string, string | undefined>): string {
    return NasaApiClient.withApiKey(path, params);
  }

  static async get<T>(path: string, params?: Record<string, string | undefined>, options: FetchOptions = {}): Promise<T> {
    const url = NasaApiClient.withApiKey(path, params);
    return NasaApiClient.fetchJson<T>(url, options);
  }

  static async getByUrl<T>(url: string, options: FetchOptions = {}): Promise<T> {
    return NasaApiClient.fetchJson<T>(url, options);
  }

  private static async fetchJson<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const response = await fetch(url, {
      next: {
        revalidate: options.revalidate ?? 3600,
      },
    });

    if (!response.ok) {
      throw new NasaApiError(response.status, response.statusText);
    }

    return (await response.json()) as T;
  }
}
