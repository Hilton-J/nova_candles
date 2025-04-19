import Hero from "../components/Hero";
import Products from "../components/Products";
import Subscribe from "../components/Newsletter";
import Section from "../components/FeatureSection";
import AboutPreview from "../components/AboutPreview";

const MainPage = () => {
  return (
    <>
      <Hero />
      <Section />
      <Products />
      <AboutPreview />
      <Subscribe />
    </>
  );
};

export default MainPage;
