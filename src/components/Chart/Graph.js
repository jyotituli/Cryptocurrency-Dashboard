import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import moment from "moment";

import "./Graph.css";

const Graph = ({ data,ratio }) => {

    const [chartData, setChartData] = useState([]);
    const [table, setTable] = useState([]);

    useEffect(() => {
        renderMultiChart();
    }, [data])

    const renderMultiChart = () => {
        if (data) {
            const chartData = []
            chartData.push(['time', 'close', 'predicted'])
            data.forEach((d, index) => {
                // console.log(this.props.data.time[index])
                // chartData.push([moment(this.props.data[index][0]).format("MM-DD-YYYY"), this.props.data[index][1], this.props.data[index][2]])
                chartData.push([moment(data[index][0]).format('DD/MM/YY, h:mm a'), data[index][1], data[index][2]])
            })
            setChartData(chartData)
            const tableData = []
            tableData.push(['time', 'close', 'predicted'])
            data.forEach((d, index) => {
                // console.log(this.props.data.time[index])
                // chartData.push([moment(this.props.data[index][0]).format("MM-DD-YYYY"), this.props.data[index][1], this.props.data[index][2]])
                    tableData.push([moment(data[index][0]).format('YYYY/MM/DD, h:mm:ss a'), data[index][1], data[index][2]])
            })
            setTable(tableData)
        }
    }
    return (
        // <div className="Graph" style={{ display: 'flex', maxWidth: 900 }}>
        <div className="Charts">
        {(chartData && table && ratio) ? (
        <div class="row Graph">
                {(chartData && table && ratio) ? (
                    <div className="chart">
                    <Chart
                        width={'1650px'}
                        height={'620px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData}
                        options={{
                            title: 'Close/Predicted vs Time',
                            chartArea: { width: '82%', height: '60%' },
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Close / Predicted',
                            },
                            series: {
                                1: { curveType: 'function' },
                            },
                        }}
                        rootProps={{ 'data-testid': '2' }} /></div>) : (<div></div>)
                        }
                <br/>
                <br/>
                {(table && chartData && ratio) ? (
                    <div className="chart">
                    <Chart
                        width={'300px'}
                        height={'530px'}
                        chartType="Table"
                        loader={<div>Loading Chart</div>}
                        data={table}
                        rootProps={{ 'data-testid': '1' }}
                        chartPackages={['corechart', 'controls']}
                        controls={[
                        ]}
                    />
                    <br/>
                    <br/>
                    {(table && chartData && ratio)?(<div style={{fontSize:"25px", padding:"2px 2px 2px 2px", border:"4px solid", display:"flex",justifyContent:"center"}}><b>Hit Percentage: {ratio}</b></div>):(<div></div>)}
                    </div>) : (<div></div>)}

        </div>
        ):(<div></div>)}
        </div>    );
}
export default Graph;