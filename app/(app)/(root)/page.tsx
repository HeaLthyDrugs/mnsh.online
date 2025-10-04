import { ToggleTheme } from "@/components/toggle-theme";
import Link from "next/link";

export default function Home() {
  return (
    <div className="justify-center items-center flex flex-col min-h-screen gap-6 p-8">
      <h1 className="text-2xl font-bold text-center mb-4">Hello I&apos;m Manish and This is my portfolio</h1>
      <nav className="flex flex-col sm:flex-row gap-4 text-lg">
        <Link href="/about" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center">
          About Me
        </Link>
        <Link href="/work" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center">
          Works
        </Link>
        <Link href="/blog" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center">
          Blog
        </Link>
      </nav>
      <ToggleTheme />
    </div>
  );
}