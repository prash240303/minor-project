import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';
// import CSVDataTable from "../CSVDataTable";


export default function DatasetPage() {
  const [dataset, setDataset] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/dataset/${id}`)
      .then(response => {
        response.json().then(datasetInfo => {
          setDataset(datasetInfo);
          // console.log("datasetInfo", datasetInfo);
        });
      });
  }, []);



  // // csv dataset parse for showing in table 
  // const [csvData, setCsvData] = useState([]);

  // const csvFilePath = "./" + dataset?.dataset;

  // console.log("csvFilePath", csvFilePath.replace(/\\/g, "/"));
  // useEffect(() => {
  //   fetch(csvFilePath)
  //     .then(response => response.text())
  //     .then(csvText => parseCSV(csvText))
  //     .catch(error => {
  //       console.error("Error fetching CSV file:", error);
  //     });
  // }, [csvFilePath]);

  // const parseCSV = (csvText) => {
  //   const lines = csvText.split("\n");
  //   const headers = lines[0].split(",");
  //   const parsedData = [];

  //   for (let i = 1; i < lines.length; i++) {
  //     const currentLine = lines[i].split(",");

  //     if (currentLine.length === headers.length) {
  //       const row = {};
  //       for (let j = 0; j < headers.length; j++) {
  //         row[headers[j].trim()] = currentLine[j].trim();
  //       }
  //       parsedData.push(row);
  //     }
  //   }

  //   console.log("parsedData", parsedData)
  //   setCsvData(parsedData);
  // };

  if (!dataset) {
    return <div>No data found...</div>;
  }
  return (
    <div className="post-page">
      <h1>{dataset.title}</h1>
      <time>{formatISO9075(new Date(dataset.createdAt))}</time>
      <div className="author">by @{dataset.author.username}</div>
      {userInfo.id === dataset.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${dataset._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:4000/${dataset.coverimage}`} alt="" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: dataset.content }} />
      {/* {csvData && <CSVDataTable dataset={csvData} />} */}
    </div>
  );
} 