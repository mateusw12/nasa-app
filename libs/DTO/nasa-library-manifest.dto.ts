export interface NasaLibraryAssetItem {
  href: string;
}

export interface NasaLibraryAssetResponse {
  collection: {
    items: NasaLibraryAssetItem[];
    href?: string;
    version?: string;
  };
}

export type NasaLibraryMetadataResponse = unknown;
export type NasaLibraryCaptionsResponse = unknown;
