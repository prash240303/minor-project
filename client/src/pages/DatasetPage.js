import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
// import CSVDataTable from "../CSVDataTable";
import {
  ChevronDown,
  ChevronUp,
  DownloadIcon,
  FileTextIcon,
  Table2Icon,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import DatasetCard from "../DatasetCard";

export default function DatasetPage() {
  const [dataset, setDataset] = useState(null);
  const [RelatedDataset, setRelatedDataset] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [csvData, setCsvData] = useState([]);
  const [showFullContent, setShowFullContent] = useState(false);

  const { id } = useParams();
  const timeDifference = (current, previous) => {
    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;
    const milliSecondsPerMonth = milliSecondsPerDay * 30;
    const milliSecondsPerYear = milliSecondsPerDay * 365;
    // calculate the time difference
    const elapsed = current - previous;

    if (elapsed < milliSecondsPerMinute / 3) {
      return "just now";
    }
    if (elapsed < milliSecondsPerMinute) {
      return "less than 1 min ago";
    } else if (elapsed < milliSecondsPerHour) {
      return Math.round(elapsed / milliSecondsPerMinute) + " min ago";
    } else if (elapsed < milliSecondsPerDay) {
      return Math.round(elapsed / milliSecondsPerHour) + " h ago";
    } else if (elapsed < milliSecondsPerMonth) {
      const days = Math.round(elapsed / milliSecondsPerDay);
      if (days < 30) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
      } else {
        return "a month ago";
      }
    } else if (elapsed < milliSecondsPerYear) {
      const months = Math.round(elapsed / milliSecondsPerMonth);
      if (months < 6) {
        return months === 1 ? "1 month ago" : `${months} months ago`;
      } else {
        return "a year ago";
      }
    } else {
      const years = Math.round(elapsed / milliSecondsPerYear);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  };
  useEffect(() => {
    fetch(`http://localhost:4000/dataset/${id}`)
      .then((response) => response.json())
      .then((datasetInfo) => {
        const updatedAt = timeDifference(
          new Date(),
          new Date(datasetInfo.createdAt)
        );
        setDataset({ ...datasetInfo, updatedAt });
        fetchCSVFile(datasetInfo.dataset);
      })
      .catch((error) => {
        console.error("Error fetching dataset:", error);
      });

    fetch('http://localhost:4000/dataset')
      .then(response => response.json())
      .then(relateddatasets => {
        // Calculate updatedAt for each dataset and update the array
        const updatedDatasets = relateddatasets.map(dataset => ({
          ...dataset,
          updatedAt: timeDifference(new Date(), new Date(dataset.createdAt))
        }));
        console.log("related datasets", updatedDatasets)
        setRelatedDataset(updatedDatasets)
      }).catch((error) => {
        console.error("Error fetching related dataset:", error);
      });
  }, [id]);


  const fetchCSVFile = (filePath) => {
    fetch(`http://localhost:4000/${filePath.replace(/\\/g, "/")}`)
      .then((response) => response.text())
      .then((csvText) => parseCSV(csvText))
      .catch((error) => {
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

  const tags = dataset?.tag
    ?.split(" ")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  const handleDownload = () => {
    const filePath = dataset?.dataset;
    const title = dataset?.title;

    if (filePath && title) {
      const timestamp = Date.now();

      fetch(`http://localhost:4000/${filePath.replace(/\\/g, "/")}`)
        .then((response) => response.blob())
        .then((blob) => {
          // Create a temporary link to trigger the download
          const downloadLink = document.createElement("a");
          const objectURL = window.URL.createObjectURL(blob);

          downloadLink.href = objectURL;
          downloadLink.download = `${title}_${timestamp}.csv`; // Use dataset title with timestamp as the filename
          downloadLink.click();

          // Release the object URL
          window.URL.revokeObjectURL(objectURL);
        })
        .catch((error) => {
          console.error("Error fetching CSV file:", error);
        });
    }
  };

  if (!dataset) {
    return <div>No data found...</div>;
  }

  function handleUpvote() {
    console.log("Upvoted");
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const truncatedContent = dataset.content.slice(0, 200); // Adjust the character limit as needed
  const isContentTruncated = dataset.content.length > truncatedContent.length;

  return (
    <>
      <div className="flex flex-col items-center my-4">
        {/* user header , should be sticky at the top of the page on scroll */}
        <div className="flex justify-between px-12 my-6 w-full items-center">
          <div className="flex gap-2 place-items-center">
            <img
              className="w-8 h-8 object-cover rounded-full"
              src="/logo512.png"
              alt=""
            />
            <span className="text-gray-800">
              {capitalizeFirstLetter(dataset.author.username)} ·
            </span>
            <time className="text-gray-500">Updated {dataset.updatedAt}</time>
          </div>
          <div className="ml-4 flex gap-3 place-items-center">
            {/* upvote button */}
            <div className="rounded-full flex border border-gray-300 w-fit justify-center items-center ">
              <span data-tooltip-id="my-tooltip" data-tooltip-content="Upvote">
                <ChevronUp
                  onClick={handleUpvote}
                  className="border-r hover:bg-gray-100 rounded-l-full cursor-pointer w-10 h-10 p-2 border-gray-400"
                />
              </span>
              <span className="pl-2 py-2 pr-4 font-bold">10</span>
              <Tooltip id="my-tooltip" />
            </div>
            {/* upvote button */}
            {/* download button */}
            <div
              onClick={handleDownload}
              className="rounded-full flex gap-2 py-2 px-4 bg-black text-white hover:shadow-lg  cursor-pointer font-semibold border border-gray-300"
            >
              <DownloadIcon />
              Download (21 kB)
            </div>
            {/* download button */}
          </div>
        </div>
      </div>
      {/* user header */}

      {/* title */}
      <div className="w-full flex px-12 justify-between items-center">
        <div className="w-full md:max-w-6xl mx-auto">
          <h1 className="font-bold text-5xl text-left mb-4 ">
            {capitalizeFirstLetter(dataset.title)}
          </h1>
          <h5 className="text-base text-gray-500 text-left">
            {dataset.subtitle}
          </h5>
        </div>
        <img
          className="w-full md:max-w-sm h-auto mx-auto rounded-xl  mb-4"
          src={`http://localhost:4000/${dataset.coverimage}`}
          alt=""
        />
      </div>
      {/* title */}

      {/* menu bar item s: 1 datacard 2 discussion 3 Code */}
      {/* menu bar end  */}

      {/* datacard */}
      <div className=" my-12 flex px-12 gap-8 justify-between items-start mx-auto">
        {/* left side */}
        <div className="flex flex-col gap-4 place-items-start">
          <h2 className="font-bold text-3xl text-left mb-4">About Dataset</h2>
          <div>
            <span className="font-bold text-xl ">Introduction</span>
            <p className="mt-3">{dataset.summary}</p>
            <div>
              <div>
                {showFullContent ? (
                  <>
                    <div
                      className="content mt-4"
                      dangerouslySetInnerHTML={{ __html: dataset.content }}
                    />
                    {isContentTruncated && (
                      <div
                        onClick={toggleContent}
                        className="font-bold place-items-center text-sm flex gap-2 rounded-full bg-gray-100 w-fit py-2 px-4 cursor-pointer "
                      >
                        <ChevronUp className="size-4" />
                        Read Less
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className="content mt-4"
                      dangerouslySetInnerHTML={{ __html: truncatedContent }}
                    />
                    {isContentTruncated && (
                      <div
                        onClick={toggleContent}
                        className="font-bold place-items-center text-sm flex gap-2 rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out w-fit py-2 px-4 cursor-pointer "
                      >
                        <ChevronDown className="size-4" />
                        View More
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col gap-4 items-start justify-start">
          <div className="w-64 overflow-hidden">
            <span className="font-bold">Tags</span>
            <div className="flex flex-wrap my-3 gap-1">
              {tags.map((tag, id) => (
                <span
                  key={id}
                  className="border-gray-400 cursor-pointer hover:border-gray-700 rounded-full border px-2.5 py-1.5 mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="font-bold">License</span>
            <div className="text-underline mb-6">{dataset.license}</div>

            <span className="font-bold">DOI</span>
            <div className="text-underline">{dataset.doi}</div>
          </div>
        </div>
        {/* datacard end */}
      </div>
      {/* datacard */}

      {/* metadata */}
      <div className="w-full px-12">
        <div className="flex gap-4 place-items-center">
          <FileTextIcon className="size-8" />
          <h3 className="font-bold text-3xl text-left">Metadata</h3>
        </div>

        {/* collaborators */}
        <div className="flex flex-col gap-4 pr-12 mt-6 py-4 border-y border-gray-400 place-items-center">

          <div className="flex justify-between items-center w-full gap-2">
            <h4 className="font-bold text-2xl text-left">Collaborators</h4>
            <ChevronDown />
          </div>
          <div className="flex  flex-col gap-4 place-items-start w-full">
            <div className="flex gap-2 place-items-center">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src="/logo512.png"
                alt=""
              />
              {capitalizeFirstLetter(dataset.author.username)} (Owner)
            </div>
            <div className="flex gap-2 place-items-center">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src="/logo512.png"
                alt=""
              />
              {capitalizeFirstLetter(dataset.author.username)}
            </div>
          </div>
        </div>
        {/* collaborators */}

        {/* DOI citaitons */}
        <div className="flex flex-col gap-4 pr-12  py-4 border-b border-gray-400 place-items-center">
          <div className="flex justify-between items-center w-full gap-2">
            <h4 className="font-bold text-2xl text-left">DOI Citaitons</h4>
            <ChevronDown />
          </div>
          <div className="flex flex-col gap-4 place-items-start w-full">
            {dataset.doi}
          </div>
        </div>
        {/* DOI citaitons */}

        {/* License */}
        <div className="flex flex-col gap-4 pr-12  py-4 border-b border-gray-400 place-items-center">
          <div className="flex justify-between items-center w-full gap-2">
            <h4 className="font-bold text-2xl text-left">License</h4>
            <ChevronDown />
          </div>
          <div className="flex flex-col gap-4 place-items-start w-full">
            {dataset.license}
          </div>
        </div>
        {/* License */}
        {/* metadata end */}

        {/* similar datasets */}
        <div className="flex flex-col my-6 gap-4 ">
          <div className="flex gap-4 place-items-center">
            <Table2Icon />
            <div className="font-bold text-2xl text-left">Similar Datasets</div>
          </div>
          <div className="flex gap-4 place-items-center">
            {RelatedDataset.length > 0 && RelatedDataset.slice(0, 5).map((dataset, id) => (
              <DatasetCard key={id} {...dataset} />
            ))}
          </div>
        </div>
        {/* similar datasets */}

      </div>
    </>
  );
}

{
  /* <img className="w-full md:max-w-lg h-auto mx-auto  mb-4" src={`http://localhost:4000/${dataset.coverimage}`} alt="" />
        <div className="text-gray-600 text-sm text-center">
          <div className="flex flex-col items-center mb-2">
            <span className="mr-2">Author @{dataset.author.username}</span>
            <time>{format(new Date(dataset.createdAt), "do MMM yyyy")}</time>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mb-4">
          {tags.map((tag, id) => (
            <span key={id} className="bg-gray-200 px-2 py-1 text-xs rounded mr-2 mb-2">{tag}</span>
          ))}
        </div>
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto focus:outline-none hover:bg-blue-700"
        >
          Download Dataset
        </button>
      </div>
      <div className="w-full md:max-w-6xl mx-auto">
        <div className="content" dangerouslySetInnerHTML={{ __html: dataset.content }} />
        {csvData.length > 0 && <CSVDataTable data={csvData} />} */
}
