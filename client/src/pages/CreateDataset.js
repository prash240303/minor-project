import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";


export default function CreateDataset() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [dataset, setDataset] = useState('');
  const [coverimage, setCoverimage] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewDataset(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('coverimage', coverimage[0]);
    data.set('dataset', dataset[0]);
    ev.preventDefault();
    console.log("data", data);
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
    <form onSubmit={createNewDataset}>
      <input type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input type="file" name='dataset'
        onChange={ev => setDataset(ev.target.files)} />
      <input type="file" name='coverimage'
        onChange={ev => setCoverimage(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create dataset</button>
    </form>
  );
}
