import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';

import "./DatasetPage.css";

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

  if (!dataset) {
    return <div>No data found...</div>;
  }

  return (
    <div className="post-page">
      <div className="post-details">
        <h1>{dataset.title}</h1>
        <div className="author-info">
          {/* <img src={`http://localhost:4000/${dataset.author.profileImage}`} alt={`Profile of ${dataset.author.username}`} /> */}
          <div>
            <div className="author">@{dataset.author.username}</div>
            <time>{formatISO9075(new Date(dataset.createdAt))}</time>
          </div>
        </div>
        {/* {userInfo.id === dataset.author._id && (
          <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${dataset._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Edit this post
            </Link>
          </div>
        )} */}
        <div className="content" dangerouslySetInnerHTML={{ __html: dataset.content }} />
      </div>
      <div className="image">
        <img src={`http://localhost:4000/${dataset.coverimage}`} alt="" />
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: dataset.content }} />
      {csvData.length > 0 && <CSVDataTable data={csvData} />}

    </div>
  );
}
