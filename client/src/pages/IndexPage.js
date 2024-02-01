import Dataset from "../Dataset";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/dataset').then(response => {
      response.json().then(dataset => {
        setDataset(dataset);
      });
    });
  }
    , []);

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {dataset.length > 0 && dataset.map((dataset, id) => (
          <Dataset key={id} {...dataset} />
        ))}
      </div>

    </>
  );
}
