import Link from "next/link";

export default function Home() {
  return (
    <div className="justify-center items-center flex flex-col min-h-screen gap-4">
      <h1>Hello I&apos;m Manish and This is my portfolio</h1>
      <Link href="/about">About Me</Link>
      <Link href="/work">Works</Link>
      <Link href="/blog">Blog</Link>
    </div>
  );
}
