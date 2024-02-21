
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import { Navbar,Footer } from './Pages/Layout'
import { Product } from './Pages/Product'


function App() {
 

  return (
   <div>

    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Proucts' element={<Product/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>

   </div>

  )
}

export default App
