import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./Pages/Login";
import Featuer from "./Pages/featuer";
import ProtectedRoute from "./Pages/Protected";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
       <Toaster position="top-right"/>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Featuer" element={<Featuer />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
       

  );
}

export default App;