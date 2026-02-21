import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		const c15tUrl = process.env.NEXT_PUBLIC_C15T_URL;
		if (!c15tUrl) {
			return [];
		}
		return [
			{
				source: '/api/c15t/:path*',
				destination: `${c15tUrl}/:path*`,
			},
		];
	},
	devIndicators: false,
};

export default nextConfig;
