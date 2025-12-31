// Simple in-memory rate limiter
// For production, use Redis or a similar solution

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60 * 60 * 1000); // 1 hour

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limiter that restricts requests per IP address
 * @param identifier - Unique identifier (usually IP address)
 * @param limit - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 */
export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): RateLimitResult {
  const now = Date.now();
  const key = `rate_limit:${identifier}`;

  if (!store[key] || store[key].resetTime < now) {
    // Initialize or reset
    store[key] = {
      count: 1,
      resetTime: now + windowMs,
    };

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: store[key].resetTime,
    };
  }

  // Check if limit exceeded
  if (store[key].count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: store[key].resetTime,
    };
  }

  // Increment count
  store[key].count++;

  return {
    success: true,
    limit,
    remaining: limit - store[key].count,
    reset: store[key].resetTime,
  };
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(request: Request): string {
  // Try various headers that might contain the real IP
  const headers = request.headers;
  
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback
  return "unknown";
}



