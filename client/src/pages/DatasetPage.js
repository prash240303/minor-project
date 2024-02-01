import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";
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
          fetchCSVFile(datasetInfo.dataset);
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
  };

  const tags = dataset?.tag?.split(" ").map((tag) => tag.trim()).filter((tag) => tag.length > 0);

  const handleDownload = () => {
    const filePath = dataset?.dataset;
    const title = dataset?.title;

    if (filePath && title) {
      const timestamp = Date.now();

      fetch(`http://localhost:4000/${filePath.replace(/\\/g, "/")}`)
        .then(response => response.blob())
        .then(blob => {
          // Create a temporary link to trigger the download
          const downloadLink = document.createElement("a");
          const objectURL = window.URL.createObjectURL(blob);

          downloadLink.href = objectURL;
          downloadLink.download = `${title}_${timestamp}.csv`; // Use dataset title with timestamp as the filename
          downloadLink.click();

          // Release the object URL
          window.URL.revokeObjectURL(objectURL);
        })
        .catch(error => {
          console.error("Error fetching CSV file:", error);
        });
    }
  };

  if (!dataset) {
    return <div>No data found...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 md:mb-8">
        <img className="w-full md:max-w-lg h-auto mx-auto  mb-4" src={`http://localhost:4000/${dataset.coverimage}`} alt="" />
        <h1 className="font-bold text-3xl text-center mb-2">{dataset.title}</h1>
        <h5 className="text-base text-gray-500  text-center">{dataset.subtitle}</h5>
        <div className="text-gray-600 text-sm text-center">
          <div className="flex flex-col items-center mb-2">
            <span className="mr-2">Author @{dataset.author.username}</span>
            <time>{format(new Date(dataset.createdAt), "do MMM yyyy")}</time>
          </div>
          {/* Additional details (DOI, etc.) can be added here */}
        </div>
        {/* Tags */}
        <div className="flex flex-wrap justify-center mb-4">
          {tags.map((tag, id) => (
            <span key={id} className="bg-gray-200 px-2 py-1 text-xs rounded mr-2 mb-2">{tag}</span>
          ))}
        </div>
        {/* Download button */}
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto focus:outline-none hover:bg-blue-700"
        >
          Download Dataset
        </button>
      </div>
      {/* Additional content, if needed */}
      <div className="w-full md:max-w-6xl mx-auto">
        <div className="content" dangerouslySetInnerHTML={{ __html: dataset.content }} />
        {csvData.length > 0 && <CSVDataTable data={csvData} />}
      </div>
    </div>
  );
}
