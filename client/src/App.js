import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Button} from 'antd'
import Login from '@/pages/login'
import Layout from '@/pages/layout'
import { AuthComponent } from './components/authComponent'


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<AuthComponent><Layout /></AuthComponent>}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
