import Dataset from "../Dataset";
import Post from "../Post";
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  const[dataset, setDataset] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);


  useEffect(() => {
    fetch('http://localhost:4000/dataset').then(response => {
      response.json().then(dataset => {
        setDataset(dataset);
        console.log("erdhth", dataset);
      });
    });
  }
  , []);

  return (
    <>
      {/* {posts.length > 0 && posts.map((post, id) => (
        <Post key={id} {...post} />
      ))} */}
      {dataset.length > 0 && dataset.map((dataset, id) => (
        <Dataset key={id} {...dataset} />
      ))}
    </>
  );
}