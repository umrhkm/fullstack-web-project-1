import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
