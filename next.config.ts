import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		const rewrites = [
			{
				source: '/blog/:slug.mdx',
				destination: '/api/mdx/blog/:slug',
			},
			{
				source: '/work/:slug.mdx',
				destination: '/api/mdx/work/:slug',
			},
		];

		const c15tUrl = process.env.NEXT_PUBLIC_C15T_URL;
		if (c15tUrl) {
			rewrites.push({
				source: '/api/c15t/:path*',
				destination: `${c15tUrl}/:path*`,
			});
		}

		return rewrites;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'assets.mnsh.online',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
	},
	devIndicators: false,
};

export default nextConfig;
