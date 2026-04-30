import type { Activity } from "@/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export async function getCachedContributions(
  username: string
): Promise<Activity[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { 
        next: { revalidate: 86400 },
        signal: controller.signal
      }
    )

    clearTimeout(timeoutId)

    if (!res.ok) {
      console.error("Failed to fetch contributions:", res.status)
      return []
    }

    const data = (await res.json()) as GitHubContributionsResponse
    return data.contributions || []
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error("GitHub contributions API request timeout")
    } else {
      console.error("Error fetching GitHub contributions:", error)
    }
    return []
  }
}
