import { NextResponse } from "next/server";
import crypto from "crypto";
import { verifyAdminSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  // Only authorized admin sessions can generate upload signatures
  const session = await verifyAdminSession(request);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json({ success: false, error: "paramsToSign is required" }, { status: 400 });
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiSecret) {
      return NextResponse.json({ success: false, error: "Cloudinary API Secret is not configured" }, { status: 500 });
    }

    // Sort parameters alphabetically and serialize
    const sortedKeys = Object.keys(paramsToSign).sort();
    const serializedParams = sortedKeys
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join("&");

    // Generate SHA-1 signature
    const signature = crypto
      .createHash("sha1")
      .update(serializedParams + apiSecret)
      .digest("hex");

    return NextResponse.json({
      success: true,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error("Cloudinary Signature Error:", error);
    return NextResponse.json({ success: false, error: "Signature generation failed" }, { status: 500 });
  }
}
