import { NextRequest, NextResponse } from "next/server";
import { auth0, getCachedGoogleToken } from "@/lib/auth0";
import { formatEventDates } from "@/lib/event-date-formatter";

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
    const formattedBody = formatEventDates(body);

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
      body: JSON.stringify(formattedBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to create event" },
        { status: response.status }
      );
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
