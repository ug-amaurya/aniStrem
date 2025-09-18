import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/streaming`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (_err) {
    return NextResponse.json(
      { error: "Failed to fetch streaming links" },
      { status: 500 }
    );
  }
}
