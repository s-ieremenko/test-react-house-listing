import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App'
import HouseList from './components/HouseList/HouseList'
import About from './components/About/About'
import HousePage from './components/HousePage/HousePage'
import { AppProvider } from './context'
import MainPage from './components/MainPage/MainPage'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<App />}></Route>
                    <Route
                        path="/houses"
                        element={<MainPage />}
                    ></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route
                        exact
                        path="/houses/:id"
                        element={<HousePage />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>
)
