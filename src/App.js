import React from "react";
import { Navigator } from "./components";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Home, NotFound, Form, FormFill, Login, SearchPage, Status, Contract, Entrustment, Sample } from './pages';
import SignUp from "./pages/SignUp";

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
          <Route path="signup" element={<SignUp />} />
          <Route index element={<Home />} />
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="entrustment" element={<Entrustment />} />
          <Route path="samples" element={<Sample />} />
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
