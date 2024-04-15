import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import "./styles/Header.css";
import { InspectionPanel, PlusCircleIcon } from "lucide-react";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  });

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center border border-b z-10 py-4 px-20 bg-white sticky w-full top-0">
      <Link to="/" className="flex items-center justify-center font-bold text-3xl gap-4">
      <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" className="w-8 h-8" />
        MyDataSet
      </Link>
      <div className="flex justify-center items-center gap-4">
        {username && (
          <>
            <Link className="rounded-full hover:shadow-md hover:text-white hover:bg-blue-500 flex gap-4 items-center justify-center font-semibold hover: border border-gray-200 px-3 pr-4 py-3" to="/createdata">
              <PlusCircleIcon className="w-8 hover:text-white h-8" />
              Upload new dataset
            </Link>
            <div onClick={logout} className="rounded-full cursor-pointer flex gap-4 hover:shadow-sm hover:bg-black hover:text-white items-center justify-center font-semibold hover: border border-gray-200 px-3 pr-4 py-3">Logout ({username})</div>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="rounded-full cursor-pointer flex gap-4 hover:shadow-sm hover:bg-black hover:text-white items-center justify-center font-semibold hover: border border-gray-200 px-3 pr-4 py-3">Login</Link>
            <Link to="/register" className="rounded-full cursor-pointer flex gap-4 hover:shadow-sm hover:bg-black hover:text-white items-center justify-center font-semibold hover: border border-gray-200 px-3 pr-4 py-3">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
