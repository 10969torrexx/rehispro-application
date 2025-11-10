import { useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BirthCertServices } from '@services';
import { chartColors } from '@enums';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BirthCertificateCharts() {
  const [femaleCount, setFemaleCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);

  const data = {
    labels: ["Female", "Male"],
    datasets: [
      {
        data: [femaleCount, maleCount],
        backgroundColor: [
          chartColors.GenderColorsRGBA.FEMALE,
          chartColors.GenderColorsRGBA.MALE,
        ],
        borderColor: [
          chartColors.GenderColorsBorderRGBA.FEMALE,
          chartColors.GenderColorsBorderRGBA.MALE,
        ],
        borderWidth: 1,
      },
    ],
  };

  const centerTextPlugin = {
    id: 'centerText',
    afterDraw: (chart) => {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
      const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
      ctx.font = 'bold 18px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(total, width / 2, height / 2);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            if (!data.labels.length) return [];
            return data.labels.map((label, i) => {
              const value = data.datasets[0].data[i];
              const backgroundColor = data.datasets[0].backgroundColor[i];
              return {
                text: `${label} (${value})`,
                fillStyle: backgroundColor,
                strokeStyle: backgroundColor,
                hidden: isNaN(value),
                index: i,
              };
            });
          },
        },
      },
      tooltip: { enabled: true },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BirthCertServices.listBirthCertificate();
        if (response.data?.length > 0) {
          let male = 0;
          let female = 0;
          response.data.forEach(item => {
            if (item.sex === 'MALE') male++;
            else if (item.sex === 'FEMALE') female++;
          });
          setMaleCount(male);
          setFemaleCount(female);
        }
      } catch (error) {
        console.error("Error fetching birth certificate status counts:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="text-left">
      <p className="text-xs font-semibold mb-2">Birth Certificate</p>
      <div className="w-64 h-64 mx-auto relative">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
}
