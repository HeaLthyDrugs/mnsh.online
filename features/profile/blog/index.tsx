import { Panel, PanelHeader, PanelTitle } from "../components/panel";
import { getAllBlogs } from "@/features/blog/lib/blogs";
import { BlogItem } from "@/features/blog/components/blog-item";

export default function Blog() {
    const allBlogs = getAllBlogs();

    return (
        <Panel>
            <PanelHeader>
                <PanelTitle>Blog</PanelTitle>
            </PanelHeader>

            <div className="relative py-4">
                <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
                    <div className="border-r border-edge"></div>
                    <div className="border-l border-edge"></div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {allBlogs.slice(0, 4).map((post) => (
                        <BlogItem key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </Panel>
    );
}
