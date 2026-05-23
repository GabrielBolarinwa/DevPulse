import { useRepositoryLanguages } from "@/services/queries";
import { getLanguageColor } from "@/utlls";
import { Pie, PieChart, Tooltip } from "recharts";

function LanguagesDonut() {
  const languages = useRepositoryLanguages().data;
  const languagesChartData = languages.map((language) => ({
    name: language.name,
    value: parseFloat(language.percentage),
    fill: getLanguageColor(language.name),
  }));
  const biggestLanguage = languagesChartData.reduce((max, obj) =>
    obj.value > max.value ? obj : max,
  );
  return (
    <div className="h-full w-full py-3 px-5">
      <h4 className="mb-4">Language Distribution</h4>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-20 h-full">
        <div
          className="relative h-auto"
          aria-label="Language Distribution"
          role="img"
        >
          <PieChart
            width={200}
            height={200}
            responsive
            style={{ position: "relative" }}
          >
            <Pie
              data={languagesChartData}
              cx={"50%"}
              cy={"50%"}
              innerRadius={60}
              outerRadius={90}
              stroke="#1c2030"
              dataKey="value"
              nameKey="name"
              fill="#4d8ef0"
              startAngle={90}
              endAngle={-270}
              tabIndex={0}
            />
            <Tooltip
              contentStyle={{
                background: "#1c2030",
                border: "1px solid #252a3d",
                zIndex: 50,
              }}
              cursor={{ fill: "#252a3d" }}
              formatter={(value) => `${value}%`}
            />
          </PieChart>
          <div className="absolute inset-0 flex flex-col items-center justify-center top-[30%] left-1/2 -translate-x-1/2 h-max z-0 pointer-events-none">
            <span className="text-2xl font-bold text-text-primary">
              {biggestLanguage.value}%
            </span>
            <span className="text-xs text-text-secondary">
              {biggestLanguage.name}
            </span>
            <span className="text-xs text-text-muted truncate max-w-full">
              (Favourite Language)
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-2">
          {languagesChartData.map((entry, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="inline-flex gap-2 justify-center items-center">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: entry.fill }}
                />
                <div className="text-sm text-text-primary">{entry.name}</div>
              </div>
              <div className="text-sm text-text-secondary">{entry.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguagesDonut;
