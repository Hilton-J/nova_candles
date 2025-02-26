import { Routes, Route, useLocation } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import About from "./components/About";
import Login from "./components/Login";
import Shop from "./components/Shop";
import ViewProduct from "./components/ViewProduct";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
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
    </>
  );
}

export default App;
