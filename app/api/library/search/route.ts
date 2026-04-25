import { NextRequest, NextResponse } from "next/server";
import { LibraryService } from "@/libs/services/library.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "nebula";

  try {
    const result = await LibraryService.searchMedia(query);
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
