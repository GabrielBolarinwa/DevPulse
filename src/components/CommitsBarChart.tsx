import { useMonthlyCommits } from "@/services/queries";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CommitsBarChart() {
  const data = useMonthlyCommits().data;
  return (
    <>
      <h4 className="pl-5">Commits Per Month</h4>
      <div className="overflow-x-auto">
        <div className="min-w-150" role="img">
          <ResponsiveContainer
            className={"flex mt-8 font-mono items-center"}
            width={"100%"}
            height={200}
            aria-label="Commits per Month"
          >
            <BarChart data={data} barSize={28}>
              <CartesianGrid vertical={false} stroke="#252a3d" />
              <XAxis
                dataKey={"month"}
                tick={{ fill: "#7a8099", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#7a8099", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#1c2030",
                  border: "1px solid #252a3d",
                }}
                labelStyle={{ color: "#e8eaf0" }}
                cursor={{ fill: "#252a3d" }}
              />
              <Bar
                dataKey={"commits"}
                tabIndex={0}
                fill="#4d8ef0"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default CommitsBarChart;
