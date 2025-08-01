import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import HeaderComponent from './component/HeaderComponent';
import ListComponent from './component/ListComponent';
import AddComponent from './component/AddComponent';

function App() {
  return (
    <>
    <HeaderComponent />
      <Routes>
        <Route path={"/list"} element={<ListComponent />} />
        <Route path={"/add"} element={<AddComponent />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
