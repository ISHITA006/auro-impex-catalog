import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { buildBackendUrl } from "@/lib/api";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

type LoginPayload = {
  username?: string;
  password?: string;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LoginPayload;
  const username = body.username?.trim();
  const password = body.password;

  if (!username || !password) {
    return NextResponse.json(
      { detail: "Username and password are required." },
      { status: 400 },
    );
  }

  const formBody = new URLSearchParams();
  formBody.set("username", username);
  formBody.set("password", password);

  const response = await fetch(buildBackendUrl("/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json(
      { detail: text || "Invalid username or password." },
      { status: response.status },
    );
  }

  const data = (await response.json()) as {
    access_token?: string;
    token_type?: string;
  };

  if (!data.access_token) {
    return NextResponse.json(
      { detail: "Login response missing access token." },
      { status: 502 },
    );
  }

  (await cookies()).set(AUTH_COOKIE_NAME, data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ ok: true });
}
