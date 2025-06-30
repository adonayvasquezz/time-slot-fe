import { NextRequest, NextResponse } from "next/server";
import { auth0, getCachedGoogleToken } from "@/lib/auth0";

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const accessToken = await auth0.getAccessToken();
    if (!accessToken?.token) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const response = await fetch(`${API_BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get events: ${response.status}`);
    }

    const events = await response.json();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get events" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth0.getSession();
    const accessToken = await auth0.getAccessToken();

    if (!accessToken?.token || !session?.user?.sub) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body = await request.json();
    const googleToken = await getCachedGoogleToken(session.user.sub);

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken.token}`,
      "Content-Type": "application/json",
    };

    if (googleToken) {
      headers["X-Google-Token"] = googleToken;
    }

    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to create event: `);
    }

    const event = await response.json();
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
