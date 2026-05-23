import type {
  HeatmapQueryResult,
  AllTimeCommitsQueryResult,
  GitHubRepo,
  GitHubUser,
  GraphQLResponse,
  LanguageStat,
  MonthlyCommitsQueryResult,
} from "@/types";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

export const graphql = <T>(
  query: string,
  variables?: Record<string, unknown>,
) =>
  axios
    .post<GraphQLResponse<T>>(
      "https://api.github.com/graphql",
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      },
    )
    .then((res) => res.data.data.user);

export const getUser = async () => {
  return (await api.get<GitHubUser>("/user")).data;
};

export const getRepos = async () => {
  return (await api.get<GitHubRepo[]>("/user/repos?per_page=100&sort=updated"))
    .data;
};

export const getAllTimeCommits = async () => {
  return (
    await graphql<AllTimeCommitsQueryResult>(
      `
        query ($username: String!) {
          user(login: $username) {
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `,
      { username: import.meta.env.VITE_GITHUB_USERNAME },
    )
  ).contributionsCollection;
};

export const getMonthlyCommits = async (from: string, to: string) => {
  const user = await graphql<MonthlyCommitsQueryResult>(
    `
      query ($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            commitContributionsByRepository(maxRepositories: 100) {
              repository {
                name
              }
              contributions {
                totalCount
              }
            }
          }
        }
      }
    `,
    { username: import.meta.env.VITE_GITHUB_USERNAME, from, to },
  );
  return user.contributionsCollection.commitContributionsByRepository.reduce(
    (sum, r) => sum + r.contributions.totalCount,
    0,
  );
};

export const getRepositoryLanguages = async (repo: string, login: string) => {
  return api
    .get<LanguageStat>(`/repos/${login}/${repo}/languages`)
    .then((res) => res.data);
};

export const getHeatmapData = async () => {
  return (
    await graphql<HeatmapQueryResult>(
      `
        query ($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `,
      { username: import.meta.env.VITE_GITHUB_USERNAME },
    )
  ).contributionsCollection.contributionCalendar;
};
