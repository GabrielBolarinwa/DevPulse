import type { LucideProps } from "lucide-react";
import * as React from "react";

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string | null;
  location: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  private: boolean;
}

export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: string;
  repoCount: number;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface HeatmapValue {
  date: string;
  count: number;
}

export interface RepoCommitContribution {
  repository: {
    name: string;
  };
  contributions: {
    totalCount: number;
  };
}

export interface MonthlyCommitData {
  month: string;
  commits: number;
}

export interface AllTimeCommits {
  totalCommitContributions: number;
  restrictedContributionsCount: number;
}

export interface GraphQLResponse<T> {
  data: {
    user: T;
  };
}

export interface HeatmapQueryResult {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar;
  };
}

export interface MonthlyCommitsQueryResult {
  contributionsCollection: {
    commitContributionsByRepository: RepoCommitContribution[];
  };
}

export interface AllTimeCommitsQueryResult {
  contributionsCollection: AllTimeCommits;
}

export type SortMetric = "stars" | "forks";

export interface RepoListCardProps {
  repos: GitHubRepo[];
  metric: SortMetric;
}

export type LanguageColorMap = Record<string, string>;

export interface StatCard {
  id: number;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  theme: string;
  metric: number | string;
  bgClass: string;
  topHeading: string;
  bottomHeading: string;
}
