import { Routes, Route, useLocation } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
// import Login from "./components/LoginModal";
import Shop from "./components/Shop";
import ViewProduct from "./components/ViewProduct";
import { useEffect } from "react";
import NotFound from "./components/NotFound";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";

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
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<MainLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route index element={<LandingPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/contact' element={<ContactPage />} />
          {/* <Route path='/products/:id' element={<ViewProduct />} /> */}
          <Route path='/products/:id/:size' element={<ViewProduct />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
