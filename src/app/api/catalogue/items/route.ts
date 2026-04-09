import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { buildBackendUrl } from "@/lib/api";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const search = req.nextUrl.search;
  const response = await fetch(buildBackendUrl(`/items${search}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const text = await response.text();
  return new NextResponse(text, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
