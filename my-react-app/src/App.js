import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/commons/Footer/Footer';
import Header from './components/commons/Header/Header';
import EmployeePage from './components/EmployeePage/EmployeePage';
import Auth from './components/Auth';
import ManageAccess from './components/ManageAccessPage/ManageAccess';
import InventoryTable from './components/ManagerTables/InventoryTable';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Auth></Auth>}></Route>
        <Route path='/employee' element={<EmployeePage></EmployeePage>}></Route>
        <Route path='/manageaccess' element={<ManageAccess></ManageAccess>}></Route>
        <Route path='/inventory' element={<InventoryTable></InventoryTable>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
 
}export default App;