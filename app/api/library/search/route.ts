import { NextRequest, NextResponse } from "next/server";
import { LibraryMediaType } from "@/libs/enum";
import { LibraryService } from "@/libs/services/library.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "nebula";
  const mediaTypeParam = request.nextUrl.searchParams.get("media_type") || LibraryMediaType.All;
  const mediaType = Object.values(LibraryMediaType).includes(mediaTypeParam as LibraryMediaType)
    ? (mediaTypeParam as LibraryMediaType)
    : LibraryMediaType.All;

  try {
    const result = await LibraryService.searchMedia(query, mediaType);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=7200, stale-while-revalidate=14400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Falha ao buscar midia." },
      { status: 500 },
    );
  }
}
