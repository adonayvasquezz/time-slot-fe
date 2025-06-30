export const auth0Config = {
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE || "time-slot-be",
    scope: "openid profile email offline_access",
  },
  enableAccessTokenEndpoint: true,
};
