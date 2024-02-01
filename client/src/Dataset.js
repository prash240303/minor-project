import { formatISO9075 } from "date-fns";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DatasetCard = ({ _id, title, summary, coverimage, dataset, createdAt, author }) => {
  const [imageSrc, setImageSrc] = useState();

  useEffect(() => {
    if (coverimage) {
      setImageSrc(`http://localhost:4000/${coverimage}`);
    }
    else{
      setImageSrc("/demoImage.png")
    }
  }, [coverimage]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-4">
      <Link to={`/dataset/${_id}`}>
        <img className="w-72 overflow-hidden " src={imageSrc} alt={title} />
      </Link>
      <div className="px-6 py-4">
        <Link to={`/dataset/${_id}`}>
          <div className="font-bold text-xl mb-2">{title}</div>
        </Link>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Author:</span> {author.username}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Created At:</span> {formatISO9075(new Date(createdAt))}
        </p>
        <p className="text-gray-700 text-base">{summary}</p>
      </div>
    </div>
  );
};

export default DatasetCard;
