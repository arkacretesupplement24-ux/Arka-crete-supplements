import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(request: Request) {
  try {
    const cookiesHeader = request.headers.get("cookie") || "";
    // Parse cookie manually or use a simple regex
    const match = cookiesHeader.match(/(^|;\s*)token=([^;]*)/);
    const token = match ? match[2] : null;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "arka-crete-super-secret-key-2026");
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      success: true,
      user: {
        id: payload.userId,
        email: payload.email,
        roleId: payload.roleId,
        name: payload.name
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
