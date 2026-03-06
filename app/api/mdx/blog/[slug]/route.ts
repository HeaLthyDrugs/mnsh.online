import { getBlogPostBySlug } from "@/features/blog/data/posts";
import { getAllBlogs } from "@/features/blog/lib/blogs";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return new Response("Not Found", { status: 404 });
    }

    return new Response(post.content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}

export async function generateStaticParams() {
    const posts = getAllBlogs();
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}
