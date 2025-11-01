import { useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DeathCertServices } from '@services';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function DeathCertificateCharts() { 
    const [femaleCount, setFemaleCount] = useState(0);
    const [maleCount, setMaleCount] = useState(0);
    const data = {
        labels: ["Female", "Male"],
        datasets: [
        {
            data: [femaleCount, maleCount],
            backgroundColor: [
            "rgba(99, 102, 241, 0.7)", 
            "rgba(255, 174, 0, 0.7)",
            ],
            borderColor: [
            "rgba(99, 102, 241, 1)",
            "rgba(255, 174, 0, 1)",  
            ],
            borderWidth: 1,
        },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: "bottom",
        },
        tooltip: {
            enabled: true,
        },
        },
    };
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await DeathCertServices.listDeathCertificate();
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
            console.error("Error fetching death certificate status counts:", error);
        }
        };

        fetchData();
    }, []);
    return (
        <div className="text-left">
            <p className="text-xs font-semibold mb-2">Death Certificate</p>
            <div className="w-64 h-64 mx-auto">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
}