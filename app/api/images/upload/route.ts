import { NextRequest, NextResponse } from "next/server";
import { uploadImageFromUrl, uploadImageFile, createImageBucket } from "@/lib/images";

export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get("user-session");
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const imageUrl = formData.get("imageUrl") as string;
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string || "images";
    const folder = formData.get("folder") as string || "uploads";

    // Ensure bucket exists
    await createImageBucket(bucket);

    let result;

    if (imageUrl) {
      // Upload from URL
      result = await uploadImageFromUrl(imageUrl, bucket, folder);
    } else if (file) {
      // Upload file
      result = await uploadImageFile(file, bucket, folder);
    } else {
      return NextResponse.json(
        { error: "Either imageUrl or file is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error: unknown) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url");
    const width = searchParams.get("width");
    const height = searchParams.get("height");
    const quality = searchParams.get("quality");
    const format = searchParams.get("format");

    if (!imageUrl) {
      return NextResponse.json(
        { error: "URL parameter is required" },
        { status: 400 }
      );
    }

    // Import the optimization function
    const { getOptimizedImageUrl } = await import("@/lib/images");
    
    const optimizedUrl = getOptimizedImageUrl(imageUrl, {
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
      quality: quality ? parseInt(quality) : undefined,
      format: format as 'webp' | 'jpeg' | 'png' | undefined
    });

    return NextResponse.json({
      originalUrl: imageUrl,
      optimizedUrl,
      transformations: {
        width: width ? parseInt(width) : null,
        height: height ? parseInt(height) : null,
        quality: quality ? parseInt(quality) : null,
        format: format || null
      }
    });

  } catch (error: unknown) {
    console.error("Image optimization error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to optimize image" },
      { status: 500 }
    );
  }
}
