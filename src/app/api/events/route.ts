import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "No authorized" }, { status: 401 });
    }

    const accessToken = session.tokenSet.accessToken;

    const response = await fetch(`${API_BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get events: ${response.status}`);
    }

    const events = await response.json();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to get events:", error);
    return NextResponse.json(
      { error: "Failed to get events:" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "No authorized" }, { status: 401 });
    }

    const body = await request.json();
    const accessToken = session.tokenSet.accessToken;

    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.status}`);
    }

    const event = await response.json();
    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { error: "Failed to create event:" },
      { status: 500 }
    );
  }
}
