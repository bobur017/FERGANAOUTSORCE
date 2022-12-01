import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/login/Login";
import Sidebars from "./pages/sidebar/Sidebars";

function App() {
  return (
    <div className={'h-100'}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidebar/*" element={<Sidebars />} />
      </Routes>
      {/*<ToastContainer position={'top-center'} autoClose={5000} />*/}
    </div>
  );
}
export default App;
