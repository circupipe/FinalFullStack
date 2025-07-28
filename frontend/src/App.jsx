import { Routes, Route } from "react-router-dom";
import { RegisterForm } from "./Components/RegisterForm/RegisterForm";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { ProProvider } from "./Providers/ProProvider";
import { CatProvider } from "./Providers/CatProvider";
import { ArmaProvider } from "./Providers/ArmaProvider";
import { NotiProvider } from "./Providers/NotiContext";
import { Home } from "./Pages/Home/Home";
import { Product } from "./Pages/Product/Product";
import { Category } from "./Pages/Category/Category";
import { ArmaTuPc } from "./Pages/ArmaTuPc/ArmaTuPc";

export default function App() {
  return (
    <>
      <NotiProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/producto/:category"
            element={
              <CatProvider>
                <Category />
              </CatProvider>
            }
          />
          <Route
            path="/producto/:category/:id"
            element={
              <ProProvider>
                <Product />
              </ProProvider>
            }
          />
          <Route
            path="/armatupc"
            element={
              <ArmaProvider>
                <ArmaTuPc />
              </ArmaProvider>
            }
          />

          <Route path="/register" element={<RegisterForm />} />
        </Routes>

        <Footer />
      </NotiProvider>
    </>
  );
}
