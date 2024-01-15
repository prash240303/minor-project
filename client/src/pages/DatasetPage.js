import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';

import "../styles/DatasetPage.css";

import CSVDataTable from "../CSVDataTable";

export default function DatasetPage() {
  const [dataset, setDataset] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [csvData, setCsvData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/dataset/${id}`)

      .then(response => {
        response.json().then(datasetInfo => {
          setDataset(datasetInfo);
          fetchCSVFile(datasetInfo.dataset); // Fetch and parse CSV file
          // console.log("datasetInfo", datasetInfo);
        });
      });
  }, []);

  const fetchCSVFile = (filePath) => {
    fetch(`http://localhost:4000/${filePath.replace(/\\/g, "/")}`)
      .then(response => response.text())
      .then(csvText => parseCSV(csvText))
      .catch(error => {
        console.error("Error fetching CSV file:", error);
      });
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
    console.log("parsedData", parsedData)
  };

  
  // seprate each tag : "earth earthquake quake"--> "earthquake", "quake" ,"earth"
  const tags = dataset?.tag?.split(" ").map((tag) => tag.trim()).filter((tag) => tag.length > 0);
  console.log("tags", tags)

  //handle download 
  function handleDownnload() {
    console.log("hi")
  }

  if (!dataset) {
    return <div>No data found...</div>;
  }

  return (
    <div className="post-page">
      <div className="post-details">
        <h1>{dataset.title}</h1>
        <div className="author-info">
          <div>
            <div className="author">@{dataset.author.username}</div>
            <time>{formatISO9075(new Date(dataset.createdAt))}</time>
          </div>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: dataset.content }} />
      </div>
      <div >
        <img  className="image" src={`http://localhost:4000/${dataset.coverimage}`} alt="" />
      </div>
      <div>
        {/* dio number */}
        DOI number {dataset.doi}
      </div>
        {/* tags */}
        {tags.map((tag, id) => (
          <span className="tag">{tag}  || </span>
        ))}

      {/* download button */}
      <div onClick={() => handleDownnload}>
          download Dataset
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: dataset.content }} />
      {csvData.length > 0 && <CSVDataTable data={csvData} />}

    </div>
  );
}
