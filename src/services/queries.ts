import {
  getAllTimeCommits,
  getHeatmapData,
  getMonthlyCommits,
  getRepos,
  getRepositoryLanguages,
  getUser,
} from "@/api/github.ts";
import { MONTHS } from "@/constants";
import {
  getMockAllTimeCommits,
  getMockHeatmapData,
  getMockLanguageStats,
  getMockMonthlyCommits,
  getMockRepos,
  getMockUser,
} from "@/mock/githubData.ts";
import { useSuspenseQuery } from "@tanstack/react-query";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

export function useUser() {
  return useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => (useMock ? getMockUser() : getUser()),
  });
}

export function useRepos() {
  return useSuspenseQuery({
    queryKey: ["repos"],
    queryFn: () => (useMock ? getMockRepos() : getRepos()),
  });
}

export function useAllTimeCommits() {
  return useSuspenseQuery({
    queryKey: ["commit"],
    queryFn: () => (useMock ? getMockAllTimeCommits() : getAllTimeCommits()),
  });
}

export function useMonthlyCommits() {
  return useSuspenseQuery({
    queryKey: ["monthlyCommits"],
    queryFn: async () => {
      if (useMock) return getMockMonthlyCommits();
      const year = new Date().getFullYear();
      return Promise.all(
        MONTHS.map(async (month, i) => {
          const from = new Date(year, i, 1).toISOString();
          const to = new Date(year, i + 1, 0, 23, 59, 59).toISOString();
          const commits = await getMonthlyCommits(from, to);
          return { month, commits };
        }),
      );
    },
  });
}

export function useRepositoryLanguages() {
  const { data: user } = useUser();
  const { data: repos } = useRepos();
  return useSuspenseQuery({
    queryKey: ["repositoryLanguages"],
    queryFn: async () => {
      if (useMock) return getMockLanguageStats();
      const top20 = repos!.slice(0, 20);
      const langTotals: Record<string, number> = {};
      const results = await Promise.all(
        top20.map((repo) => getRepositoryLanguages(repo.name, user.login)),
      );
      for (const langStat of results) {
        for (const [lang, bytes] of Object.entries(langStat)) {
          langTotals[lang] = (langTotals[lang] || 0) + bytes;
        }
      }
      const total = Object.values(langTotals).reduce((a, b) => a + b, 0);
      return Object.entries(langTotals).map(([name, bytes]) => ({
        name,
        bytes,
        percentage: ((bytes / total) * 100).toFixed(1),
        repoCount: 0,
      }));
    },
  });
}

export function useHeatmapData() {
  return useSuspenseQuery({
    queryKey: ["heatmap"],
    queryFn: async () => {
      if (useMock) return getMockHeatmapData();
      const heatmapData = await getHeatmapData();
      return heatmapData.weeks
        .flatMap((week) => week.contributionDays)
        .map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }));
    },
  });
}
