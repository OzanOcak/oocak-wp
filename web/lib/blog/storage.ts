import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function createMarkdownFile(filename: string, content: string) {
  if (!/^[a-z0-9][a-z0-9-]*\.md$/.test(filename)) {
    throw new Error("Invalid filename");
  }

  await mkdir(CONTENT_DIR, { recursive: true });

  const filePath = path.join(CONTENT_DIR, filename);

  await writeFile(filePath, content, {
    encoding: "utf8",
    flag: "wx",
  });

  return filename;
}
