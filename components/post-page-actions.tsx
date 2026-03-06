// Thanks @fumadocs

"use client"

import { CheckIcon, ChevronDownIcon, CircleXIcon, CopyIcon } from "lucide-react"
import { useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { motionIconProps } from "@/components/copy-button"

const cache = new Map<string, string>()

export function LLMCopyButton({ markdownUrl }: { markdownUrl: string }) {
    const [state, setState] = useState<"idle" | "done" | "error">("idle")
    const [isCopying, setIsCopying] = useState(false)
    const operationRef = useRef(false)

    const handleCopy = async () => {
        if (operationRef.current) return

        operationRef.current = true

        const loadingTimer = setTimeout(() => {
            setIsCopying(true)
        }, 150)

        try {
            const cached = cache.get(markdownUrl)
            if (cached) {
                await navigator.clipboard.writeText(cached)
            } else {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        "text/plain": fetch(markdownUrl)
                            .then((res) => res.text())
                            .then((content) => {
                                cache.set(markdownUrl, content)
                                return content
                            }),
                    }),
                ])
            }
            setState("done")
        } catch {
            setState("error")
        } finally {
            clearTimeout(loadingTimer)
            setIsCopying(false)
            await new Promise((resolve) => setTimeout(resolve, 1500))
            operationRef.current = false
            setState("idle")
        }
    }

    return (
        <button
            className="flex h-7 items-center gap-1.5 pr-2 pl-2.5 text-sm font-medium transition-opacity will-change-transform disabled:pointer-events-none disabled:opacity-50 hover:rounded-none focus:rounded-none rounded-none"
            aria-busy={isCopying}
            disabled={isCopying}
            onClick={handleCopy}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {state === "idle" ? (
                    <motion.span key="idle" {...motionIconProps}>
                        <CopyIcon className="size-3" />
                    </motion.span>
                ) : state === "done" ? (
                    <motion.span key="done" {...motionIconProps}>
                        <CheckIcon className="size-3" strokeWidth={3} />
                    </motion.span>
                ) : state === "error" ? (
                    <motion.span key="error" {...motionIconProps}>
                        <CircleXIcon className="size-3" />
                    </motion.span>
                ) : null}
            </AnimatePresence>
            MDX
        </button>
    )
}

function getPrompt(url: string, isComponent?: boolean) {
    if (isComponent) {
        return `I'm looking at this component documentation: ${url}
I want to use it in a React (TypeScript) project.
Help me understand how to use it step-by-step, including explaining key concepts, showing practical examples with TypeScript code, and pointing out common pitfalls.
Be ready to answer follow-up questions and help debug issues based on the documentation.`
    }

    return `Read ${url}, I want to ask questions about it.`
}

export function ViewOptions({
    markdownUrl,
    isComponent = false,
}: {
    markdownUrl: string
    isComponent?: boolean
}) {
    const items = useMemo(() => {
        const fullMarkdownUrl =
            typeof window !== "undefined"
                ? new URL(markdownUrl, window.location.origin).toString()
                : markdownUrl

        const q = getPrompt(fullMarkdownUrl, isComponent)

        const _items = [
            {
                title: "View as Markdown",
                href: fullMarkdownUrl,
                icon: Icons.markdown,
            },
            {
                title: "Open in ChatGPT",
                href: `https://chatgpt.com/?${new URLSearchParams({
                    hints: "search",
                    q,
                })}`,
                icon: Icons.openai,
            },
            {
                title: "Open in Claude",
                href: `https://claude.ai/new?${new URLSearchParams({
                    q,
                })}`,
                icon: Icons.claude,
            },
        ]

        if (isComponent) {
            _items.splice(1, 0, {
                title: "Open in v0",
                href: `https://v0.app/?${new URLSearchParams({
                    q,
                })}`,
                icon: Icons.v0,
            })
        }

        return _items
    }, [markdownUrl, isComponent])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex size-7 items-center justify-center gap-2 text-sm hover:rounded-none focus:rounded-none rounded-none outline-none">
                    <ChevronDownIcon className="mt-0.5 size-4" />
                    <span className="sr-only">View Options</span>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="rounded-none"
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                {items.map(({ title, href, icon: Icon }) => (
                    <DropdownMenuItem key={href} asChild className="rounded-none cursor-pointer">
                        <a href={href} rel="noreferrer noopener" target="_blank">
                            <Icon />
                            {title}
                        </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function LLMCopyButtonWithViewOptions({
    markdownUrl,
    isComponent = false,
}: {
    markdownUrl: string
    isComponent?: boolean
}) {
    const rawMarkdownUrl = markdownUrl.endsWith('.mdx') ? markdownUrl : `${markdownUrl}.mdx`;
    return (
        <div
            className={cn(
                buttonVariants({
                    size: "sm",
                    variant: "secondary",
                    className:
                        "gap-0 divide-x px-0 font-sans active:scale-none dark:divide-white/10 rounded-none hover:rounded-none focus:rounded-none",
                })
            )}
        >
            <LLMCopyButton markdownUrl={rawMarkdownUrl} />
            <ViewOptions markdownUrl={rawMarkdownUrl} isComponent={isComponent} />
        </div>
    )
}