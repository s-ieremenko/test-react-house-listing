import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

import './index.css'
import About from './components/About/About'
import HousePage from './components/HousePage/HousePage'
import { AppProvider } from './context'
import MainPage from './components/MainPage/MainPage'
import CreateListing from './components/CreateListing/CreateListing'
import UpdateListing from './components/UpdateListing/UpdateListing'
import ScrollToTop from './components/ScrollOnTop'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                <ScrollToTop>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Navigate replace to="/houses" />
                            }
                        />
                        <Route
                            path="/houses"
                            element={<App />}
                        ></Route>
                        <Route
                            path="/about"
                            element={<About />}
                        ></Route>
                        <Route
                            exact
                            path="/houses/:id"
                            element={<HousePage />}
                        ></Route>
                        <Route
                            exact
                            path="/houses/create"
                            element={<CreateListing />}
                        ></Route>
                        <Route
                            exact
                            path="/houses/update/:id/"
                            element={<UpdateListing />}
                        ></Route>
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>
)
