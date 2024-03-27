import './App.css';
import Post from "./Post";
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import CreateDataset from './pages/CreateDataset';
import DatasetPage from './pages/DatasetPage';
import ShowCSVtable from './pages/ShowCSVtable';

function App   () {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/createdata" element={<CreateDataset />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/dataset/:id" element={<DatasetPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path='/temp' element={<ShowCSVtable />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
