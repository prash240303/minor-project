import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const truncateString = (str, maxLength = 200) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

const CSVDataTable = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  useEffect(() => {
    headers.forEach((header) => {
      const ctx = document.getElementById(`chart-${header}`);
      if (ctx) {
        // Destroy existing chart instance
        Chart.getChart(ctx)?.destroy();
  
        const labels = [];
        const frequencies = {};
        data.forEach((row) => {
          const value = truncateString(row[header]);
          labels.push(value);
          frequencies[value] = frequencies[value] ? frequencies[value] + 1 : 1;
        });
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(frequencies),
            datasets: [{
              label: `Frequency of ${header}`,
              data: Object.values(frequencies),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    });
  }, [data, headers]);
  
  return (
    <>
      {data.length === 0 ? (
        <p className="text-gray-600">No data available.</p>
      ) : (
        <div className="overflow-x-auto overflow-y-auto h-screen">
          <table className="border-collapse w-full">
            <thead className="sticky top-0 left-0 shadow-lg border-x border-gray-400 bg-gray-50">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="sticky-header   text-center py-3 px-4 border-x border-gray-300 text-lg font-semibold">
                    {header}
                    <div>
                      <canvas id={`chart-${header}`} width="200" height="100"></canvas>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {headers.map((header, columnIndex) => (
                    <td key={columnIndex} className="py-3 px-4 border border-gray-300">
                      {truncateString(row[header])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CSVDataTable;
