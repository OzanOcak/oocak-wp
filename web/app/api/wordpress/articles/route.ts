import { NextRequest, NextResponse } from "next/server";
import { createMarkdownFile } from "@/lib/blog/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { filename, content } = body;

    if (typeof filename !== "string" || typeof content !== "string") {
      return NextResponse.json(
        { error: "filename and content are required" },
        { status: 400 },
      );
    }

    await createMarkdownFile(filename, content);

    return NextResponse.json(
      {
        message: "Article published successfully",
        filename,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "EEXIST") {
      return NextResponse.json(
        { error: "Article already exists" },
        { status: 409 },
      );
    }

    console.error("Article publishing failed:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
