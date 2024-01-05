// import React, { useState, useEffect } from "react";
// import CSVDataTable from "../CSVDataTable";


// const ShowCSVtable = () => {
//   const [csvData, setCsvData] = useState([]);
//   const csvFilePath = "/data.csv";

//   useEffect(() => {
//     // Fetch CSV file from the server using the specified path
//     fetch(csvFilePath)
//       .then(response => response.text())
//       .then(csvText => parseCSV(csvText))
//       .catch(error => {
//         console.error("Error fetching CSV file:", error);
//       });
//   }, [csvFilePath]);

//   const parseCSV = (csvText) => {
//     const lines = csvText.split("\n");
//     const headers = lines[0].split(",");
//     const parsedData = [];

//     for (let i = 1; i < lines.length; i++) {
//       const currentLine = lines[i].split(",");

//       if (currentLine.length === headers.length) {
//         const row = {};
//         for (let j = 0; j < headers.length; j++) {
//           row[headers[j].trim()] = currentLine[j].trim();
//         }
//         parsedData.push(row);
//       }
//     }

//     console.log("parsedData", parsedData)
//     setCsvData(parsedData);
//   };

//   return (
//     <div>
//       <CSVDataTable data={csvData} />
//     </div>
//   );
// };

// export default ShowCSVtable;


import React, { useState } from "react";
import CSVDataTable from "../CSVDataTable";
const App = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target.result;
        parseCSV(csvText);
      };

      reader.readAsText(file);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    const parsedData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");

      if (currentLine.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = currentLine[j].trim();
        }
        parsedData.push(row);
      }
    }

    setCsvData(parsedData);
  };

  return (
    <div>
      <div style={{marginBottom:'15px'}}>
        <input type="file" onChange={handleFileChange} accept=".csv" />
      </div>
      <CSVDataTable data={csvData} />
    </div>
  );
};

export default App;