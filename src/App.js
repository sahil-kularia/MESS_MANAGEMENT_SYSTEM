import logo from './logo.svg';
import './App.css';
import Dashboard  from './dashboard/login';
import Barcode  from './dashboard/barcode';
import Ngo from './dashboard/Ngo';
import MessDashboard from './dashboard/mainpage';
import Landing from './dashboard/landing';
import { Routes,Route } from 'react-router-dom';
import Attendance from './dashboard/attendance'

function App() {
  return (
   <div>
    
      {/* <h1>Inventory Management System</h1> */}
  
    <main>
      <div className='flex flex-col'>
      {/* <Landing/>
      <Dashboard />
      <Barcode></Barcode>
      <Ngo/>
      <MessDashboard/> */}
      </div>
    </main>


<Routes>
  <Route path='/' element={<Landing />} />
  <Route path='/menu' element={<MessDashboard />} />
  <Route path='/mess' element={<Dashboard />} />
  <Route path='/ngo' element={<Ngo/>} />
  <Route path='/student' element={<Attendance/>} />
</Routes>

   </div>
  );
}

export default App;
