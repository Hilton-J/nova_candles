import { useEffect } from "react";
import Shop from "./components/Shop";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import AdminLayout from "./layouts/AdminLayout";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route, useLocation } from "react-router";
import PrivateRoute from "./components/PrivateRoute";

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
          <Route path='/login' element={<LoginPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/product/:id' element={<ProductPage />} />

          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
