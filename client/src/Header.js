import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import "./styles/Header.css";
import { PlusCircleIcon } from "lucide-react";

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
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between border border-b sticky w-full top-0">
      <Link to="/" className="logo">MyDataSet</Link>
      <nav>
        {username && (
          <>
            <Link className="rounded-full flex gap-4 items-center justify-center font-semibold hover: border border-gray-200 px-3 pr-4 py-3" to="/createdata">
              <PlusCircleIcon className="w-8 text-blue-500 h-8" />
              Upload new dataset</Link>
            <div onClick={logout}>Logout ({username})</div>
          </>
        )}
        {!username && (
          <>
            <div className="search-bar">
              <input type="text" className="search-input" placeholder="Search" />
            </div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
