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
  const [license, setLicense] = useState('CC-BY-SA');
  const [redirect, setRedirect] = useState(false);

  async function createNewDataset(ev) {
    ev.preventDefault();

    // Check if any required fields are empty
    if (!title || !summary || !content || !tag || !doi || !dataset || !coverimage) {
      console.error('Please fill out all required fields');
      alert('Please fill out all required fields');
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('tag', tag);
    data.set('doi', doi);
    data.set('content', content);
    data.set('coverimage', coverimage[0]);
    data.set('dataset', dataset[0]);
    data.set('tags', tag);
    data.set('license', 'CC0: Public Domain');
    data.set('subtitle', subtitle);

    try {
      const response = await fetch('http://localhost:4000/dataset', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        console.error('Failed to create dataset:', response.status);
      }
    } catch (error) {
      console.error('Error creating dataset:', error);
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
        placeholder={'Subtitle of the dataset'}
        value={subtitle}
        onChange={ev => setSubTitle(ev.target.value)} />

      summary of the dataset

      <input type="summary"
        placeholder={'Breif Summary of the dataset'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />

      Tags
      <input type="tag"
        placeholder={'Tags (enter tags separated by space)'}
        value={tag}
        onChange={ev => setTag(ev.target.value)} />

      DOI number
      <input type="doi"
        placeholder={'DOI number'}
        value={doi}
        onChange={ev => setDoi(ev.target.value)} />

      License
      <input type="license"
        placeholder={'License'}
        value={license}
        onChange={ev => setLicense(ev.target.value)} />

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
