import { 
  Route,
  Routes,
  // HashRouter,
  BrowserRouter,
  Outlet,
} from 'react-router-dom';
import { Fragment } from 'react';

import './App.css';


import { useState } from "react";

import Navbar from "./components/Layout/Navbar/Navbar";
import CommandInput from "./components/Layout/CommandInput";
import SessionPanel from "./components/SessionManager/SessionPanel";
import Spinner from './components/Layout/Spinner';

export default function App() {
  const [response, setResponse] = useState("");
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [ fileName, setFileName ] = useState("");

  const onLoadingTrue = () => setUploading(true);
  const onLoadingFalse = () => setUploading(false);

  const onAskingTrue = () => setAsking(true)
  const onAskingFalse = () => setAsking(false)

  const onUploadFile = (data) => setFileName(data);

  const handleCommandSubmit = async (command) => {
    const apiUrl = "http://127.0.0.1:5000/query";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: command }),
    };
    onAskingTrue();
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    setResponse(data.response);
    setHasResponse(true);
    onAskingFalse();
  };


  return (
    <div className="w-full h-full">
      { uploading ? <Spinner /> : ""
      }
      <Navbar uploading={{onLoadingTrue, onLoadingFalse, onUploadFile}} />

      <div className="h-full grid content-between px-4" style={{ minHeight: "calc(100vh - 72px)" }}>
        <SessionPanel uploading={{onLoadingTrue, onLoadingFalse, onUploadFile}} response={response} asking={asking} hasResponse={hasResponse} fileName={fileName} />

        <div className="relative w-full">
          <div className="w-full grid pb-4" style={{ placeContent: "center" }}>
            <CommandInput onCommandSubmit={handleCommandSubmit} />
          </div>

        </div>
      </div>
    </div>
  );
}