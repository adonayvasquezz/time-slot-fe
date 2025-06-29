interface CachedToken {
  token: string;
  expires: number;
}

class GoogleTokenCache {
  private cache = new Map<string, CachedToken>();
  private readonly CACHE_DURATION = 50 * 60 * 1000; // 50 min

  get(userId: string): string | null {
    const cached = this.cache.get(userId);

    if (!cached || Date.now() > cached.expires) {
      this.cache.delete(userId);
      return null;
    }

    return cached.token;
  }

  set(userId: string, token: string): void {
    this.cache.set(userId, {
      token,
      expires: Date.now() + this.CACHE_DURATION,
    });
  }

  delete(userId: string): void {
    this.cache.delete(userId);
  }

  has(userId: string): boolean {
    return this.get(userId) !== null;
  }
}

export const googleTokenCache = new GoogleTokenCache();
