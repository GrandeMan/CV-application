import React from 'react'
import ReactDOM from 'react-dom/client'
import { GeneralInfo, Summary, Skills, Education, Experience } from "./App.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GeneralInfo />
    <Summary />
    <Skills />
    <Education />
    <Experience />
  </React.StrictMode>,
)
