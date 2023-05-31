import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add"
import Books from "./pages/Books"
import Update from "./pages/Update"
import "./style.css"
import Login from "./pages/Login";
import Register from "./pages/Register";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/books" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
