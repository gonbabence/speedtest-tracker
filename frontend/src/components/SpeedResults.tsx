// src/components/SpeedResults.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface SpeedResult {
  timestamp: number;
  download_speed: number;
  upload_speed: number;
}

interface ChartDataPoint {
  x: number;
  y: number;
}

const SpeedResults: React.FC = () => {
  const [speedData, setSpeedData] = useState<SpeedResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SpeedResult[]>('http://localhost:5000/api/results');
        setSpeedData(response.data);
      } catch (error) {
        console.error('Error fetching speed results:', error);
      }
    };

    fetchData();
  }, []);

  const chartDataDownload: ChartDataPoint[] = speedData.map((result) => ({
    x: result.timestamp * 1000,
    y: result.download_speed,
  }));

  const chartDataUpload: ChartDataPoint[] = speedData.map((result) => ({
    x: result.timestamp * 1000,
    y: result.upload_speed,
  }));

  const options: Highcharts.Options = {
    title: {
      text: 'Network Speed Test Results',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Speed (Mbps)',
      },
    },
    series: [
      {
        type: 'line',  // Specify the type for the series
        name: 'Download Speed',
        data: chartDataDownload,
      },
      {
        type: 'line',  // Specify the type for the series
        name: 'Upload Speed',
        data: chartDataUpload,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default SpeedResults;
