import { Routes, Route } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import About from "./components/About";
import Login from "./components/Login";
import Shop from "./components/Shop";
import ViewProduct from "./components/ViewProduct";

function App() {
  return (
    <Routes>
      <Route path='/admin' element={<AdminLayout />}></Route>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/shop' element={<Shop />} />
        {/* <Route path='/products/:id' element={<ViewProduct />} /> */}
        <Route path='/products/:id/:size' element={<ViewProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
