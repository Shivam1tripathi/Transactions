import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Statistics from './Pages/Statistics';


function App() {
  
  return (
    <Routes>
    <Route path='/' element={<Home/>}/> 
    <Route path='/statistics' element={<Statistics/>}/> 
  </Routes>
  );
}

export default App;
