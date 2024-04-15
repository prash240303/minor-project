import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import "../styles/CreateDataset.css";
import {
  UploadIcon,
} from "lucide-react";
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
<form className="create-dataset-form max-w-xl mx-auto p-5 my-6  border border-gray-300 flex flex-col items-start justify-start rounded-lg shadow-xl bg-white" onSubmit={createNewDataset}>
      
      <span className='font-bold  text-left mb-5 text-xl'>
        Upload Dataset File
      </span>
      <div className="flex items-center  justify-center mb-4 w-full">
        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center text-gray-500 mb-2 justify-center pt-5 pb-6">
            <UploadIcon className='mb-3 w-12 h-12' />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, GZ (MAX. 3GB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={ev => setDataset(ev.target.files)} />
        </label>
      </div>

        <label for="dataset-title" className="block mb-2 w-full text-lg font-medium text-gray-900 dark:text-white">Title of the dataset</label>
        <input
          type="text"
          id="dataset-title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          style={{ width: '100%' }} // Set the width to 100%
        />


      {/* Subtitle */}
        <label for="dataset-subtitle" className="block mb-2 text-lg text-left font-medium text-gray-900 dark:text-white">Subtitle</label>
        <input
          type="text"
          id="dataset-subtitle"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Subtitle"
          value={subtitle}
          onChange={ev => setSubTitle(ev.target.value)}
          style={{ width: '100%' }} // Set the width to 100%
        />


      {/* Summary of the dataset */}
        <label for="summary-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Summary of the dataset</label>
        <input
          type="text"
          id="summary-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Brief Summary of the dataset"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
        />



      {/* Tags */}
        <label for="dataset-tags" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Tags</label>
        <input
          type="text"
          id="dataset-tags"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Tags (enter tags separated by space)"
          value={tag}
          onChange={ev => setTag(ev.target.value)}
          style={{ width: '100%' }} // Set the width to 100%
        />


        <label for="doi-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">DOI number</label>
        <input
          type="text"
          id="doi-input"
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="DOI number"
          value={doi}
          onChange={ev => setDoi(ev.target.value)}
        />

        <label for="license-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">License</label>
        <input
          type="text"
          id="license-input"
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="License"
          value={license}
          onChange={ev => setLicense(ev.target.value)}
        />

        <label for="license-input" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Upload Cover Image</label>
        <input
          type="file"
          name="coverimage"
          className="block p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={ev => setCoverimage(ev.target.files)}
        />

        <Editor
          value={content}
          onChange={setContent}
          className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

      <button
        className="block w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
        style={{ marginTop: '20px' }}
      >
        Create dataset
      </button>

    </form>
  );
}
