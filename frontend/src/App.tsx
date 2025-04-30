import { Routes, Route, useLocation } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Shop from "./components/Shop";
import ProductPage from "./pages/ProductPage";
import { useEffect } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/profilePage";

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
        <Route path='/' element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
