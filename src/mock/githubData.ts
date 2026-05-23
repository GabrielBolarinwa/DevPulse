import type {
  GitHubUser,
  GitHubRepo,
  LanguageStat,
  MonthlyCommitData,
  HeatmapValue,
  AllTimeCommits,
} from "@/types";

// ─── Utility ─────────────────────────────────────────────────────────────────

const delay = <T>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 2000));

// ─── User ─────────────────────────────────────────────────────────────────────

export const mockUser: GitHubUser = {
  login: "Manzi-Cutlass",
  name: "Manzi Cutlass",
  avatar_url: "https://avatars.githubusercontent.com/u/000000?v=4",
  html_url: "https://github.com/Manzi-Cutlass",
  public_repos: 14,
  followers: 3,
  following: 5,
  created_at: "2021-06-15T00:00:00Z",
  bio: "Frontend developer. Building things on the web.",
  location: "Kigali, Rwanda",
};

// ─── Repositories ─────────────────────────────────────────────────────────────

export const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "portfolio-website",
    full_name: "Manzi-Cutlass/portfolio-website",
    html_url: "https://github.com/Manzi-Cutlass/portfolio-website",
    description: "My personal portfolio built with React and Tailwind.",
    language: "TypeScript",
    stargazers_count: 12,
    forks_count: 3,
    updated_at: "2025-04-10T10:00:00Z",
    fork: false,
    private: false,
  },
  {
    id: 2,
    name: "devpulse",
    full_name: "Manzi-Cutlass/devpulse",
    html_url: "https://github.com/Manzi-Cutlass/devpulse",
    description: "GitHub analytics dashboard built with React 19.",
    language: "TypeScript",
    stargazers_count: 8,
    forks_count: 1,
    updated_at: "2025-05-01T08:00:00Z",
    fork: false,
    private: false,
  },
  {
    id: 3,
    name: "restaurant-landing",
    full_name: "Manzi-Cutlass/restaurant-landing",
    html_url: "https://github.com/Manzi-Cutlass/restaurant-landing",
    description: "Landing page for a local restaurant.",
    language: "JavaScript",
    stargazers_count: 5,
    forks_count: 0,
    updated_at: "2025-03-20T14:00:00Z",
    fork: false,
    private: false,
  },
  {
    id: 4,
    name: "weather-app",
    full_name: "Manzi-Cutlass/weather-app",
    html_url: "https://github.com/Manzi-Cutlass/weather-app",
    description: "Weather app using OpenWeather API.",
    language: "JavaScript",
    stargazers_count: 4,
    forks_count: 2,
    updated_at: "2025-02-14T09:00:00Z",
    fork: false,
    private: false,
  },
  {
    id: 5,
    name: "ui-components",
    full_name: "Manzi-Cutlass/ui-components",
    html_url: "https://github.com/Manzi-Cutlass/ui-components",
    description: "Reusable React component library.",
    language: "TypeScript",
    stargazers_count: 3,
    forks_count: 1,
    updated_at: "2025-01-30T11:00:00Z",
    fork: false,
    private: false,
  },
  {
    id: 6,
    name: "blog-template",
    full_name: "Manzi-Cutlass/blog-template",
    html_url: "https://github.com/Manzi-Cutlass/blog-template",
    description: "Minimal blog template with HTML and CSS.",
    language: "HTML",
    stargazers_count: 2,
    forks_count: 0,
    updated_at: "2024-12-05T07:00:00Z",
    fork: false,
    private: false,
  },
  {
    id: 7,
    name: "css-animations",
    full_name: "Manzi-Cutlass/css-animations",
    html_url: "https://github.com/Manzi-Cutlass/css-animations",
    description: "Collection of CSS animation experiments.",
    language: "CSS",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2024-11-18T15:00:00Z",
    fork: false,
    private: false,
  },
];

// ─── Language Stats ───────────────────────────────────────────────────────────

export const mockLanguageStats: LanguageStat[] = [
  { name: "TypeScript", bytes: 142000, percentage: "48.3", repoCount: 3 },
  { name: "JavaScript", bytes: 98000, percentage: "33.3", repoCount: 2 },
  { name: "HTML", bytes: 32000, percentage: "10.9", repoCount: 1 },
  { name: "CSS", bytes: 22000, percentage: "7.5", repoCount: 1 },
];

// ─── Monthly Commits ──────────────────────────────────────────────────────────

export const mockMonthlyCommits: MonthlyCommitData[] = [
  { month: "Jan", commits: 8 },
  { month: "Feb", commits: 14 },
  { month: "Mar", commits: 11 },
  { month: "Apr", commits: 19 },
  { month: "May", commits: 23 },
  { month: "Jun", commits: 17 },
  { month: "Jul", commits: 28 },
  { month: "Aug", commits: 32 },
  { month: "Sep", commits: 45 },
  { month: "Oct", commits: 38 },
  { month: "Nov", commits: 29 },
  { month: "Dec", commits: 21 },
];

// ─── All-Time Commits ─────────────────────────────────────────────────────────

export const mockAllTimeCommits: AllTimeCommits = {
  totalCommitContributions: 285,
  restrictedContributionsCount: 0,
};

// ─── Heatmap ──────────────────────────────────────────────────────────────────

// Generates a year's worth of mock heatmap data from today backwards
const generateHeatmapData = (): HeatmapValue[] => {
  const values: HeatmapValue[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const dateStr = date.toISOString().split("T")[0];
    const dayOfWeek = date.getDay();

    // Weekdays more active than weekends, some days zero
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const rand = Math.random();
    let count = 0;

    if (rand > 0.35) {
      count = isWeekend
        ? Math.floor(Math.random() * 3)
        : Math.floor(Math.random() * 8) + 1;
    }

    values.push({ date: dateStr, count });
  }

  return values;
};

export const mockHeatmapData: HeatmapValue[] = generateHeatmapData();

// ─── Delayed Exports (used in hooks) ─────────────────────────────────────────

export const getMockUser = () => delay(mockUser);
export const getMockRepos = () => delay(mockRepos);
export const getMockLanguageStats = () => delay(mockLanguageStats);
export const getMockMonthlyCommits = () => delay(mockMonthlyCommits);
export const getMockAllTimeCommits = () => delay(mockAllTimeCommits);
export const getMockHeatmapData = () => delay(mockHeatmapData);
