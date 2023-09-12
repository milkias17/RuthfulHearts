import Loglib from "@loglib/tracker/react";
import AboutSection from "./components/aboutSection";
import Footer from "./components/footer";
import Header from "./components/header";
import Navigation from "./components/navigation";

function App() {
  return (
    <div className="bg-[#151515] w-screen h-fit text-white">
      <Navigation />
      <Header />
      <AboutSection />
      <Footer />

      <Loglib
        config={{
          id: "ruthfulhearts_vercel",
        }}
      />
    </div>
  );
}

export default App;
