import { useRepos } from "@/services/queries";
import { getLanguageColor } from "@/utlls";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function LanguageBarChart() {
  const repos = useRepos().data;
  const repoCountByLanguage = repos.reduce<Record<string, number>>(
    (acc, repo) => {
      if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
      return acc;
    },
    {},
  );
  const langCountData = Object.entries(repoCountByLanguage).map(
    ([name, repos]) => ({
      name,
      repos,
      fill: getLanguageColor(name),
    }),
  );
  return (
    <>
      <h4 className="pl-5">Repo Count by Language</h4>
      <div className="overflow-x-auto ml-10 lg:ml-0">
        <div
          className="min-w-150"
          aria-label="Repo Count by Language"
          role="img"
        >
          <ResponsiveContainer
            className={"flex mt-8 font-mono items-center"}
            width={"100%"}
            height={200}
          >
            <BarChart data={langCountData} barSize={10} layout="vertical">
              <CartesianGrid vertical={false} stroke="#252a3d" />
              <XAxis
                type="number"
                tick={{ fill: "#7a8099", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey={"name"}
                tick={{ fill: "#e8eaf0", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  background: "#1c2030",
                  border: "1px solid #252a3d",
                }}
                labelStyle={{ color: "#e8eaf0" }}
                cursor={{ fill: "#252a3d" }}
              />
              <Bar dataKey={"repos"} tabIndex={0} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default LanguageBarChart;
