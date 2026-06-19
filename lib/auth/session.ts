import { jwtVerify } from "jose";

export async function verifyAdminSession(request: Request) {
  const cookiesHeader = request.headers.get("cookie") || "";
  const match = cookiesHeader.match(/(^|;\s*)token=([^;]*)/);
  const token = match ? match[2] : null;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "arka-crete-super-secret-key-2026");
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
