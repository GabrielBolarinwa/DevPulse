import { useAllTimeCommits, useRepos, useUser } from "@/services/queries.ts";
import { parseTime } from "@/utlls";
import { BookMarked, Calendar, Clock, Code2 } from "lucide-react";
import type { StatCard } from "@/types";

const date = Date.now();
export default function StatusCards() {
  const { totalCommitContributions, restrictedContributionsCount } =
    useAllTimeCommits().data;
  const allTimeCommits =
    totalCommitContributions + restrictedContributionsCount;

  const { public_repos: totalRepos, created_at } = useUser().data;
  const createdTime = new Date(created_at).getFullYear();
  const noOfYears = new Date().getFullYear() - createdTime;

  const { name: lastUpdatedRepo, updated_at: updateTime } = useRepos().data[0];
  const updatedAt = parseTime((date - Number(new Date(updateTime))) / 1000);

  const cardStats: StatCard[] = [
    {
      id: 1,
      icon: BookMarked,
      theme: "#9b5de5",
      bgClass: `bg-[#9b5de5]/30`,
      metric: totalRepos,
      topHeading: "Total Public Repos",
      bottomHeading: "All public Repositories",
    },
    {
      id: 2,
      icon: Code2,
      theme: "#3bbfa0",
      bgClass: `bg-[#3bbfa0]/30`,
      metric: allTimeCommits,
      topHeading: "Total Public Repos",
      bottomHeading: "All public Repositories",
    },
    {
      id: 3,
      icon: Calendar,
      theme: "#4d8ef0",
      bgClass: `bg-[#4d8ef0]/30`,
      metric: `${noOfYears} years`,
      topHeading: "Account Age",
      bottomHeading: `Developer since ${createdTime}`,
    },
    {
      id: 4,
      icon: Clock,
      theme: "#e8733a",
      bgClass: `bg-[#e8733a]/30`,
      metric: lastUpdatedRepo,
      topHeading: "Most Recently Updated Repo",
      bottomHeading: `Updated ${updatedAt}`,
    },
  ];
  return (
    <section className={"flex justify-center items-center flex-wrap gap-6"}>
      {cardStats.map((cardStat) => (
        <div
          aria-label={`${cardStat.topHeading}: ${cardStat.metric}`}
          key={cardStat.id}
          tabIndex={0}
          className={
            "py-4 px-6 overflow-hidden shadow-lg flex items-center bg-bg-elevated rounded-xl gap-6 w-[80%] md:w-[45%] xl:w-[23.5%] h-32.5 md:h-27.5"
          }
        >
          <div
            className={`${cardStat.bgClass} w-[25%] max-w-20 inline-flex items-center justify-center aspect-1 h-16 rounded-full`}
          >
            <cardStat.icon
              color={cardStat.theme}
              height={30}
              aria-hidden
              width={30}
            ></cardStat.icon>
          </div>
          <div className="w-[65%]">
            <p className={`${cardStat.id === 4 ? "text-xs" : "text-sm"}`}>
              {cardStat.topHeading}
            </p>
            <p
              className={`${cardStat.id === 4 ? "text-sm" : "text-xl"} font-extrabold font-mono`}
            >
              {cardStat.metric}
            </p>
            <p className={"text-sm"}>{cardStat.bottomHeading}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
