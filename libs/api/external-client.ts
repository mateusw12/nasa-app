interface FetchOptions {
  revalidate?: number;
}

export class ExternalApiClient {
  static async get<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const response = await fetch(url, {
      next: {
        revalidate: options.revalidate ?? 3600,
      },
    });

    if (!response.ok) {
      throw new Error(`External request failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  }
}
