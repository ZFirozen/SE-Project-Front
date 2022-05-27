import { Navigator } from "./components";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Home, NotFound, Form, FormFill, Login, SignUp, SearchPage, Assign, Contract, ContractFill, Entrustment,EntrustmentFill, Sample, UserInfo } from './pages';

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
          <Route path="userinfo" element={<UserInfo />} />
          <Route index element={<Home />} />
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="entrustmentfill" element={<EntrustmentFill />} />
          <Route path="entrustment" element={<Entrustment />} />
          <Route path="assign/:id" element={<Assign />} />
          <Route path="samples" element={<Sample />} />
          <Route path="formfill" element={<FormFill />} />
          <Route path="forms" element={<div><Outlet /></div>}>
            <Route path=":formId" element={<Form />} />
          </Route>
          <Route path="contract" element={<Contract />} />
          <Route path="contracts" element={<ContractFill />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
