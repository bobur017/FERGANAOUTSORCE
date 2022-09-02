
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";

function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
