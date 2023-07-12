import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import UserMainPage from "./components/userPage/UserMainPage";
import ErrorPage from "./components/other/ErrorPage";
import './css/style.css'
import ApiaryMainPage from "./components/apiaryPage/ApiaryMainPage";
import BeehiveMainPage from "./components/BeehivePage/BeehiveMainPage";
import AccountMainPage from "./components/accountPage/AccountMainPage";

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage/>} />
          <Route exact path='/pasieki' element={<UserMainPage/>} />
          <Route exact path='/pasieka/:id' element={<ApiaryMainPage/>} />
          <Route exact path='/ul/:id' element={<BeehiveMainPage/>} />
          <Route exact path='/account' element={<AccountMainPage/>} />
          <Route exact path='/error/:code' element={<ErrorPage/>} />
        </Routes>
      </Router>
  );
}

export default App;
