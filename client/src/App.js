import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from '@/pages/login'
import Layout from '@/pages/layout'
import '@/App.css'
import { AuthComponent } from '@/components/authComponent'
import Home from '@/pages/home'
import AssignCert from '@/pages/assignCert'



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
              <Route path='/assignCert' element={<AssignCert />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
