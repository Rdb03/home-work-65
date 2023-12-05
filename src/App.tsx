import React from 'react';
import ToolBar from "./components/ToolBar/ToolBar";
import BodyApp from "./conteiners/BodyApp/BodyApp";
import {Route, Routes, useLocation} from "react-router-dom";
import Admin from "./components/Admin/Admin";
import './App.css';

const App = () => {
    const url = useLocation().pathname;

  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main>
          <Routes>
              <Route path='/pages/admin' element={(
                  <Admin/>
              )}/>
              <Route path={url} element={(
                  <BodyApp/>
              )}/>
          </Routes>
      </main>
    </>
      );
};

export default App;
