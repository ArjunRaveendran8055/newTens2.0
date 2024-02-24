import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import { Home } from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="" element={<Dashboard/>}>
        <Route path="/" element={<Home/>}/>
      </Route>
      
    </Routes>
  );
}

export default App;
