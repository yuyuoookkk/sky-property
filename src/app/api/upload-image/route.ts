import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ASSETS_DIR = path.join(process.cwd(), "public/assets/uploads");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Ensure upload directory exists
    if (!fs.existsSync(ASSETS_DIR)) {
      fs.mkdirSync(ASSETS_DIR, { recursive: true });
    }

    // Generate a unique filename
    const ext = path.extname(file.name) || (file.type === "image/jpeg" ? ".jpg" : ".png");
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    const outPath = path.join(ASSETS_DIR, uniqueName);
    
    fs.writeFileSync(outPath, buffer);
    
    // Return the public URL using the dynamic API route to bypass Next.js caching
    const imageUrl = `/api/assets/uploads/${uniqueName}`;

    return NextResponse.json({ imageUrl, success: true });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
