import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { googleTokenCache } from "./google-token-cache";

export const auth0 = new Auth0Client();

async function getManagementApiToken(): Promise<string> {
  try {
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;

    if (!domain || !clientId || !clientSecret) {
      throw new Error("Missing Auth0 configuration for Management API");
    }
    const response = await fetch(`${domain}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        audience: `${domain}/api/v2/`,
        grant_type: "client_credentials",
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to get Management API token: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    throw new Error("Failed to get Management API token");
  }
}

export async function getUserInfo(userId: string) {
  const managementToken = await getManagementApiToken();
  const domain = process.env.AUTH0_DOMAIN;

  const response = await fetch(`${domain}/api/v2/users/${userId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${managementToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get user info: ${response.status}`);
  }
  return await response.json();
}

export async function getGoogleToken(userId: string): Promise<string | null> {
  try {
    const userInfo = await getUserInfo(userId);

    const googleIdentity = userInfo.identities?.find(
      (identity: { provider: string }) => identity.provider === "google-oauth2"
    );
    return googleIdentity?.access_token || null;
  } catch (error) {
    return null;
  }
}

export async function getCachedGoogleToken(
  userId: string
): Promise<string | null> {
  try {
    const cachedToken = googleTokenCache.get(userId);
    if (cachedToken) {
      return cachedToken;
    }
    const token = await getGoogleToken(userId);

    if (token) {
      googleTokenCache.set(userId, token);
    }

    return token;
  } catch (error) {
    return null;
  }
}

export async function hasGoogleConnection(userId: string): Promise<boolean> {
  try {
    if (googleTokenCache.has(userId)) {
      return true;
    }

    const userInfo = await getUserInfo(userId);
    const googleIdentity = userInfo.identities?.find(
      (identity: { provider: string }) => identity.provider === "google-oauth2"
    );
    return !!googleIdentity?.access_token;
  } catch (error) {
    return false;
  }
}

export function clearGoogleTokenCache(userId: string): void {
  googleTokenCache.delete(userId);
}
