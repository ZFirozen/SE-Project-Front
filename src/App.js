import React from "react";
import { Navigator } from "./components";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Home, NotFound, Form, Status} from './pages';

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
          <Route index element={<Home />} />
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="forms" element={<div><Outlet /></div>}>
            <Route path=":formId" element={<Form />} />
          </Route>
          <Route path="status" element={<Status />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
