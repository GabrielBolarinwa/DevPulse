import { useRepos } from "@/services/queries";
import { getLanguageColor } from "@/utlls";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Fragment } from "react/jsx-runtime";

function StarsReposList() {
  const repos = useRepos().data;
  const reposByStars = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);
  return (
    <Card className="w-full max-w-sm mx-auto border-0 shadow-[none]">
      <CardHeader>
        <CardTitle className="font-bold">Top Repos by Stars</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-decimal flex flex-col gap-6 pl-7">
          {reposByStars.map((repo, i) => (
            <Fragment key={repo.id}>
              <li key={repo.id} className="border-b-accent">
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-4 pl-4 w-[80%]">
                    <a href={repo.html_url} className="truncate">
                      {repo.name}
                    </a>{" "}
                    <Badge
                      style={{
                        color: getLanguageColor(repo.language || "Other"),
                        background: `${getLanguageColor(repo.language || "Other")}30`,
                      }}
                      className="px-2"
                    >
                      {repo.language}
                    </Badge>
                  </div>
                  <span className={"flex w-[20%] flex-end gap-1 items-center"}>
                    <Star size={16} color="#ffe500" fill="#ffe500" />{" "}
                    {repo.stargazers_count}
                  </span>
                </div>
              </li>
              <Separator
                aria-hidden={true}
                key={`stars-seperator-${i}`}
                className="bg-accent"
              />
            </Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default StarsReposList;
