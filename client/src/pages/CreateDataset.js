import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import "../styles/CreateDataset.css";


export default function CreateDataset() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [doi, setDoi] = useState('')
  const [subtitle, setSubTitle] = useState('')
  const [dataset, setDataset] = useState('');
  const [coverimage, setCoverimage] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewDataset(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('tag', tag);
    data.set('doi', doi)
    data.set('content', content);
    data.set('coverimage', coverimage[0]);
    data.set('dataset', dataset[0]);
    data.set('tags', tag);
    data.set('subtitle', subtitle)
    ev.preventDefault();
    console.log("data from forms", data.tag);
    const response = await fetch('http://localhost:4000/dataset', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className="create-dataset-form flex flex-col justify-start items-start" onSubmit={createNewDataset}>
      title of the dataset
      <input type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />

      Subtitle
      <input type="Subtitle"
        placeholder={'Subtitle'}
        value={subtitle}
        onChange={ev => setSubTitle(ev.target.value)} />
        
      summary of the dataset

      <input type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />

      Tags
      <input type="tag"
        placeholder={'tag'}
        value={tag}
        onChange={ev => setTag(ev.target.value)} />

      DOI number
      <input type="doi"
        placeholder={'DOI number'}
        value={doi}
        onChange={ev => setDoi(ev.target.value)} />

      upload dataset
      <input type="file" name='dataset'
        onChange={ev => setDataset(ev.target.files)} />

      upload cover image
      <input type="file" name='coverimage'
        onChange={ev => setCoverimage(ev.target.files)} />

      <Editor value={content} onChange={setContent} className="w-full" />

      <button style={{ marginTop: '20px' }}>Create dataset</button>
    </form>
  );
}
