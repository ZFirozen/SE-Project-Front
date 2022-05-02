import React from "react";
import { Navigator } from "./components";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Home, NotFound, Form, FormFill, Login, SearchPage, Status, Contract} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <Navigator />
            <Outlet />
          </div>
        }>
          <Route path="login" element={<Login />} />
          <Route index element={<Home />} />
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="formfill" element={<FormFill />} />
          <Route path="forms" element={<div><Outlet /></div>}>
            <Route path=":formId" element={<Form />} />
          </Route>
          <Route path="contract" element={<Contract />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="status" element={<Status />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
