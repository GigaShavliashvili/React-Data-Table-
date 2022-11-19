import ReactApexChart from "react-apexcharts";
import useProcentageofPeopleHook from "../Helper/getProcentageofPeople";
import { useTableStore } from "../zustand/store";
const PieChart = () => {
  const data = useTableStore((state) => state.data);

  const [Population] = useProcentageofPeopleHook(data);

  var options: ApexCharts.ApexOptions = {
    series: Population.map((el: any) => {
      return el.populationProcentage;
    }),
    labels: Population.map((el: any) => {
      return el.cityName;
    }),
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={options.series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default PieChart;
