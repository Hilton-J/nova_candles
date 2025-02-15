import { Routes, Route } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import About from "./components/About";

function App() {
  return (
    <Routes>
      <Route path='/admin' element={<AdminLayout />}></Route>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='/about' element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
