import DatasetCard from "../DatasetCard";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/dataset')
      .then(response => response.json())
      .then(datasets => {
        // Calculate updatedAt for each dataset and update the array
        const updatedDatasets = datasets.map(dataset => ({
          ...dataset,
          updatedAt: timeDifference(new Date(), new Date(dataset.createdAt))
        }));
        setDataset(updatedDatasets);
      });
  }, []);


  // console.log(createdAt)
  // created at : 2024-01-15T04:19:55.686Z and current time : 2024-01-15T04:19:55.686Z , time difference -->updated at
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
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-6 mx-24 ">
        {dataset.length > 0 && dataset.map((dataset, id) => (
          <DatasetCard key={id} {...dataset} />
        ))}
      </div>

    </>
  );
}
