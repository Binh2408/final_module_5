import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import HeaderComponent from './component/HeaderComponent';
import ListComponent from './component/ListComponent';
import AddComponent from './component/AddComponent';
import EditComponent from './component/EditComponent';

function App() {
  return (
    <>
    <HeaderComponent />
      <Routes>
        <Route path={"/list"} element={<ListComponent />} />
        <Route path={"/add"} element={<AddComponent />} />
        {/* <Route path={"/detail/:id"} element={<DetaiComponent />} /> */}
        <Route path={"/edit/:id"} element={<EditComponent />} />

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
