import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { buildBackendUrl } from "@/lib/api";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const s3Key = req.nextUrl.searchParams.get("s3_key");
  if (!s3Key) {
    return NextResponse.json({ detail: "Missing s3_key." }, { status: 400 });
  }

  const url = buildBackendUrl(`/presigned-url?s3_key=${encodeURIComponent(s3Key)}`);
  const response = await fetch(url, {
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
