import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { inquiries } from "@/lib/db/schema";
import { z } from "zod";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 digits"),
  companyName: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  productId: z.string().optional().nullable(),
  inquiryType: z.string(), // 'product' | 'general' | 'dealer'
  message: z.string().min(5, "Message must be at least 5 characters"),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request
    const result = inquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation error", 
          details: result.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      companyName,
      city,
      state,
      productId,
      inquiryType,
      message,
      source
    } = result.data;

    // Generate unique ID
    const id = `inq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await db.insert(inquiries).values({
      id,
      fullName,
      email,
      phone,
      companyName: companyName || null,
      city: city || null,
      state: state || null,
      productId: productId || null,
      inquiryType,
      message,
      status: "new",
      source: source || "website",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      id,
    });
  } catch (error) {
    console.error("Inquiries API Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
