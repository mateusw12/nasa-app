import { NextResponse } from "next/server";
import { MarsService } from "@/libs/services/mars.service";

export async function GET() {
  try {
    const photos = await MarsService.getMarsPhotos({ earth_date: "2021-02-18" });
    return NextResponse.json(photos, {
      headers: {
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro ao consultar missoes." },
      { status: 500 },
    );
  }
}
