import React from 'react';
import { 
    Chart as ChartJS, 
    BarElement, 
    CategoryScale, 
    LinearScale,
    Tooltip,
    Legend 
} from 'chart.js'
import { Bar } from 'react-chartjs-2' // chart type

ChartJS.register(
    BarElement, 
    CategoryScale, 
    LinearScale,
)

const BarChart = ({answerText, votes}) => {
    // const dispatch = useDispatch();
    console.log('answers in barchart: ', answerText)
    console.log('votes in barchart: ', votes)

    // useEffect(async () => {
    // }, [])

    const data = {
        labels: answerText, // Array names of the questions
        datasets: [
            {
                label: '369', // Doesn't take an array?
                data: votes, // number of votes for each answer
                backgroundcolor: 'aqua',
                bordercolor: 'black',
                borderwidth: 1,
            },
        ]
    }
    const options = {
        scales: {
         x: {
           beforeUpdate(axis) {
             const labels = axis.chart.data.labels;
             for (let i=0; i<labels.length; i++) {
               const lbl = labels[i];
               if (typeof lbl === 'string' && lbl.length > 10) {
                 labels[i] = lbl.substring(0, 8) + '...';
               }
             }
           }
         }
        }
      }
    
    return (
        <div style={{ padding: '20px' }}>
            <Bar
                data={data}
                options={options}>
            </Bar>
        </div>
    )
}

export default BarChart;