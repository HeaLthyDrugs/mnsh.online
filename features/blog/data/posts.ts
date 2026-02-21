import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { BlogPost, BlogMetadata } from "../types/blog-post";

function parseFrontmatter(fileContent: string) {
    const file = matter(fileContent);

    return {
        metadata: file.data as BlogMetadata,
        content: file.content,
    };
}

function getMDXFiles(dir: string) {
    if (!fs.existsSync(dir)) {
        return [];
    }
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir);

    return mdxFiles.map<BlogPost>((file) => {
        const { metadata, content } = readMDXFile(path.join(dir, file));

        const slug = path.basename(file, path.extname(file));

        return {
            metadata,
            slug,
            content,
        };
    });
}

export function getAllBlogPosts() {
    return getMDXData(path.join(process.cwd(), "features/blog/content")).sort(
        (a, b) =>
            new Date(b.metadata.createdAt).getTime() -
            new Date(a.metadata.createdAt).getTime()
    );
}

export function getBlogPostBySlug(slug: string) {
    return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string) {
    return getAllBlogPosts().filter((post) => post.metadata?.category === category);
}

export function getBlogPostsByTag(tag: string) {
    return getAllBlogPosts().filter((post) =>
        post.metadata?.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
}

export function getFeaturedBlogPosts() {
    return getAllBlogPosts().filter((post) => post.metadata?.featured);
}

export function findBlogNeighbour(posts: BlogPost[], slug: string) {
    const len = posts.length;

    for (let i = 0; i < len; ++i) {
        if (posts[i].slug === slug) {
            return {
                previous: i > 0 ? posts[i - 1] : null,
                next: i < len - 1 ? posts[i + 1] : null,
            };
        }
    }

    return { previous: null, next: null };
}
