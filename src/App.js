
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/login/Login";
import 'react-pro-sidebar/dist/css/styles.css';
import Sidebar from "./pages/sidebar/Sidebar";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/sidebar" element={<Sidebar/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
