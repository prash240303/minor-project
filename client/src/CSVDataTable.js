import React from "react";

const truncateString = (str, maxLength = 200) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

const CSVDataTable = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <>
      {data.length === 0 ? (
        <p className="text-gray-600">No data available.</p>
      ) : (
        <div className="overflow-x-auto overflow-y-auto h-screen">
          <table className="border-collapse rounded-xl  w-full mt-8 relative overflow-hidden ">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="text-left py-3 px-4 bg-blue-500 text-white text-lg font-semibold border border-white">
                    {header}
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
