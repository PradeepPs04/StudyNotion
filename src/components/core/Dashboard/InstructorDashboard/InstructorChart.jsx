import React, { useState } from 'react'

import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

export const InstructorChart = ({instructorData}) => {

    const [currentChart, setCurrentChart] = useState("students");

    // generate random colors
    const getRandomColors = (numColors) => {
        const colors = [];

        for(let i=0; i<numColors; i++) {
            // generate a random rgb color
            const color = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }

        return colors;
    }

    // create data for students info chart
    const chartDataForStudents = {
        labels: instructorData.map(course => course.courseName),
        datasets: [
            {
                data: instructorData.map(course => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(instructorData.length),
            }
        ]
    } 

    // create data for income info chart
    const chartDataForIncome = {
        labels: instructorData.map(course => course.courseName),
        datasets: [
            {
                data: instructorData.map(course => course.totalAmountGenerated),
                backgroundColor: getRandomColors(instructorData.length),
            }
        ]
    }

    // create options
    const options = {

    }

  return (
    <div>
        <p>Visualize</p>
        
        {/* buttons */}
        <div className='flex gap-x-5'>
            <button
                onClick={() => setCurrentChart("students")}
            >
                Student
            </button>
            <button
                onClick={() => setCurrentChart("income")}
            >
                Income

            </button>
        </div>

        {/* pie-chart */}
        <div>
            <Pie
                data={currentChart === "students" ? chartDataForStudents : chartDataForIncome}
                options={options}
            />
        </div>
    </div>
  )
}
