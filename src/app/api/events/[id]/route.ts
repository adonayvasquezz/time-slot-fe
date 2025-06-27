import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "No authorized" }, { status: 401 });
    }

    const accessToken = session.accessToken;

    const response = await fetch(`${API_BASE_URL}/events/${params.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get event: ${response.status}`);
    }

    const event = await response.json();
    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to get event:", error);
    return NextResponse.json(
      { error: "Failed to get event:" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "No authorized" }, { status: 401 });
    }
    const params = await context.params;
    const body = await request.json();
    const accessToken = session.accessToken;

    const response = await fetch(`${API_BASE_URL}/events/${params.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.status}`);
    }

    const event = await response.json();
    return NextResponse.json(event);
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth0.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "No authorized" }, { status: 401 });
    }

    const accessToken = session.accessToken;

    const response = await fetch(`${API_BASE_URL}/events/${params.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
