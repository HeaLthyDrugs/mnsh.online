export type PostMetadata = {
  title: string;
  description: string;
  /**
   * Social/OG image URL for the work.
   * Use an absolute URL or a path under /public. Recommended size: 1200x630.
   */
  image?: string;
  /**
   * Category identifier/slug used for filtering (see getPostsByCategory).
   */
  category?: string;
  /**
   * Flag to show a "New" badge/highlight in the UI.
   */
  new?: boolean;
  /**
   * Work creation/start date as an ISO date string (e.g. YYYY-MM-DD). Used for sorting.
   */
  createdAt: string;
  /**
   * Last updated date as an ISO date string (e.g. YYYY-MM-DD).
   */
  updatedAt: string;
  /**
   * Type of project (e.g. "Freelance", "Personal", "Open Source", "Client Work").
   */
  projectType?: "Freelance" | "Personal" | "Open Source" | "Client Work";
  /**
   * Role in the project (e.g. "Frontend Developer", "Designer", "Full Stack").
   */
  role?: string;
  /**
   * Client name for freelance/client projects. Leave empty for personal projects.
   */
  client?: string;
  /**
   * Project start date as an ISO date string (e.g. YYYY-MM-DD).
   */
  startDate?: string;
  /**
   * Project end date as an ISO date string (e.g. YYYY-MM-DD). Leave empty for ongoing projects.
   */
  endDate?: string;
  /**
   * Technologies, tools, or skills used in this work/project.
   */
  technologies?: string[];
  /**
   * Current status of the work/project (e.g. "Completed", "In Progress", "Maintained").
   */
  status?: "Completed" | "In Progress" | "Maintained" | "Archived";
  /**
   * URL to the live/deployed version of the project.
   */
  liveUrl?: string;
  /**
   * URL to the source code repository.
   */
  repoUrl?: string;
};

export type Post = {
  /** Parsed frontmatter metadata from the MDX file. */
  metadata: PostMetadata;
  /** Slug derived from the MDX filename (without extension). */
  slug: string;
  /** MDX content body without frontmatter. */
  content: string;
};
