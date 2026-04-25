import { NextRequest, NextResponse } from "next/server";
import { LibraryService } from "@/libs/services/library.service";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ nasaId: string }> }) {
  const { nasaId } = await params;

  try {
    const result = await LibraryService.getMetadataLocation(nasaId);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Falha ao buscar metadata da NASA." },
      { status: 500 },
    );
  }
}
