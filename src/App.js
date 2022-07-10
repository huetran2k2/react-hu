// import logo from './logo.svg';
import './App.css';
import CarList from './Pages/CarList';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateCar from './Pages/UpdateCar';
// import Create from './Pages/Create';

function App() {
    return (
        <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/update/:id" element={<UpdateCar />} />
        </Routes>
    );
}

export default App;
