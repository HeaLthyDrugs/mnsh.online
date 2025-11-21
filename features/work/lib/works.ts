import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "../types/work-post";

const worksDirectory = path.join(process.cwd(), "features/work/content");

export function getAllWorks(): Post[] {
  if (!fs.existsSync(worksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(worksDirectory);
  const works = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(worksDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        metadata: data as Post["metadata"],
        content,
      };
    });

  return works;
}

export function getWorkBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(worksDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data as Post["metadata"],
      content,
    };
  } catch {
    return null;
  }
}
