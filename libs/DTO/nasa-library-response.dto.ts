export interface NasaLibraryItem {
  data: Array<{
    nasa_id: string;
    title: string;
    description?: string;
    date_created?: string;
    media_type?: string;
  }>;
  links?: Array<{ href: string; rel: string; render: string }>;
}

export interface NasaLibraryResponse {
  collection: {
    items: NasaLibraryItem[];
  };
}
