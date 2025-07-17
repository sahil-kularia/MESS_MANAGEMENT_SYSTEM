import logo from './logo.svg';
import './App.css';
import Dashboard  from './dashboard/login';
import Barcode  from './dashboard/barcode';
import Ngo from './dashboard/Ngo';
import MessDashboard from './dashboard/mainpage';
import Landing from './dashboard/landing';
import { Routes,Route } from 'react-router-dom';
import Attendance from './dashboard/attendance'
import Option from './dashboard/Option';
import Bar from './dashboard/barcode';
import Login from './dashboard/login';
import Total from './dashboard/Total';

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
  <Route path='/mess' element={<Login/>} />
  <Route path='/ngo' element={<Ngo/>} />
  <Route path='/student' element={<Attendance/>} />
  <Route path ="/total" element={<Total/>}></Route>
</Routes>

   </div>
  );
}

export default App;
