import React, { useState, useEffect } from "react";
import CSVDataTable from "../CSVDataTable";


const ShowCSVtable = () => {
  const [csvData, setCsvData] = useState([]);
  const csvFilePath = "/data.csv";

  useEffect(() => {
    // Fetch CSV file from the server using the specified path
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvText => parseCSV(csvText))
      .catch(error => {
        console.error("Error fetching CSV file:", error);
      });
  }, [csvFilePath]);

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

    console.log("parsedData", parsedData)
    setCsvData(parsedData);
  };

  return (
    <div>
      <CSVDataTable data={csvData} />
    </div>
  );
};

export default ShowCSVtable;
