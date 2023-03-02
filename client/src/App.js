import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '@/pages/login'
import Layout from '@/pages/layout'
import Register from '@/pages/register'
import '@/App.css'
import { AuthComponent } from '@/components/authComponent'
import Home from '@/pages/home'
import AssignCert from '@/pages/assignCert'
import UserInfo from '@/pages/userInfo'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={
              <AuthComponent>
                <Layout />
              </AuthComponent>}>
              
              <Route index element={<Home />}></Route>
              <Route path='/userInfo' element={<UserInfo />}></Route>
              <Route path='/assignCert' element={<AssignCert />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
