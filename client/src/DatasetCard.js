import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip"; // Import the ReactTooltip component


const DatasetCard = ({ _id, title, coverimage, dataset, updatedAt, author, subtitle }) => {
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    if (coverimage) {
      setImageSrc(`http://localhost:4000/${coverimage}`);
    }
    else {
      setImageSrc("/demoImage.png")
    }
  }, [coverimage]);

  

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function handleUpvote() {
    console.log("Upvoted");
  }

  return (
    <div className="w-full rounded-xl h-fit overflow-hidden border border-gray-300 hover:shadow-lg mx-auto my-4">
      <Link to={`/dataset/${_id}`}>
        <img className="w-full h-28 object-cover overflow-hidden " src={imageSrc} alt={title} />
        <div className="px-6 py-4 h-44">
          <div className="font-semibold text-xl mb-2 normal-case truncate">{capitalizeFirstLetter(title)}</div>
          <span className="text-gray-700 mb-2 underline ">{author.username}</span>
          <span className="ml-2 text-sm mb-2 text-gray-700">· Updated {updatedAt} </span>
          <p className="text-gray-500 w-full mt-2 text-sm ">{subtitle}</p>
          <p className="text-gray-500 w-full mt-2 text-sm ">1 File(CSV)</p>
        </div>
      </Link>
      <div className="border-t-2 mt-4 flex justify-between items-center p-2 border-gray-300">
        <div className="rounded-full flex w-fit justify-center items-center border border-gray-400">
          <span data-tooltip-id="my-tooltip" data-tooltip-content="Upvote">
            <ChevronUp
              onClick={handleUpvote}
              className="border-r hover:bg-gray-100 rounded-l-full cursor-pointer w-10 h-10 p-2 border-gray-400"
            />
          </span>
          <span className="pl-2 py-2 pr-4 font-bold">10</span>
        </div>

        <div className="rounded-full overflow-hidden h-8 w-8 border border-gray-300">
          <img src="/logo512.png" alt="Download" className=" object-fill" width={40} height={40} />
        </div>
      </div>

      <Tooltip id="my-tooltip" />

    </div>
  );
};

export default DatasetCard;
