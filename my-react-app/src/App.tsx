import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import VerifyEmail from './pages/VerifyEmail';
import { AddEmployee } from './components/AddEmployee';
import { Employee } from './components/Employee';
import PublicRoute from './utils/PublicRoute';
import CompanyField from './pages/CompanyField';

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
            } />
          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
            } />
          <Route path='/verifyEmail' element={<VerifyEmail />} />
          <Route path='/companyfield' element={<PrivateRoute><CompanyField /></PrivateRoute>} />
          <Route path='/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }>
              <Route path='addEmployee' element={<AddEmployee />}/>
              <Route path='employee' element={<Employee />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
      <ToastContainer />
    </div>
  )
}

export default App
