
import './App.css'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/Footer'

function App() {
 

  return (
    <div>
       <Navbar></Navbar>
       <div className='min-h-[calc(100vh-150px)]'>
        <Outlet></Outlet>
       </div>
      <Footer></Footer>
    </div>
  )
}

export default App
