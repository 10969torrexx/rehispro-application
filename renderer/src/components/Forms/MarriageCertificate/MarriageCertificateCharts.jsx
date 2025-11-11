import { useEffect, useState } from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MarriageCertServices } from '@services';
import { chartColors } from '@enums';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function MarriageCertificateCharts() { 
    const [femaleCount, setFemaleCount] = useState(0);
    const [maleCount, setMaleCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
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
            const response = await MarriageCertServices.listMarriageCertificate();
            console.table(response.data);
            if (response.data?.length > 0) {
                console.log(response.data.length);
                setTotalCount(response.data.length);
                let male = 0;
                let female = 0;
                response.data.forEach(item => {
                    if (item.husband_sex === 'MALE') male++;
                    if (item.wife_sex === 'MALE') male++;
                    if (item.husband_sex === 'FEMALE') female++;
                    if (item.wife_sex === 'FEMALE') female++;
                });
                setMaleCount(male);
                setFemaleCount(female);
            }
        } catch (error) {
            console.error("Error fetching marriage certificate status counts:", error);
        }
        };

        fetchData();
    }, []);
    return (
        <div className="text-left">
            <p className="text-xs font-semibold mb-2">Marriage Certificate</p>
            <div className="w-64 h-64 mx-auto flex flex-col justify-center items-center">
               <h1 className='font-bold'>{totalCount}</h1>
            </div>
        </div>
    );
}