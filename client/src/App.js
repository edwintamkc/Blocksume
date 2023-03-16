import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '@/pages/login/login'
import Layout from '@/pages/layout/layout'
import Register from '@/pages/register/register'
import '@/App.css'
import { AuthComponent } from '@/components/authComponent'
import Home from '@/pages/home/home'
import AssignCert from '@/pages/cert/assignCert'
import ManageCert from '@/pages/cert/manageCert'
import UserInfo from '@/pages/user/userInfo'
import SystemSelect from '@/pages/register/systemSelect'
import VerifyCert from '@/pages/cert/verifyCert'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={
              <AuthComponent>
                <Layout />
              </AuthComponent>}
            >
              
              {/* <Route index element={<Home />}></Route> */}
              <Route path='/user/info' element={<UserInfo />}></Route>
              <Route path='/cert/assign' element={<AssignCert />}></Route>
              <Route path='/cert/manage' element={<ManageCert />}></Route>

            </Route>
            
            <Route index path='/login' element={<Login />}></Route>
            <Route path='/register/issuer' element={<Register />}></Route> 
            <Route path='/register/receiver' element={<Register />}></Route> 
            <Route path='/register/system-select' element={<SystemSelect />}></Route>
            <Route path='/cert/verify/:certId' element={<VerifyCert />}></Route>
          </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
