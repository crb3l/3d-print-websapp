
import { /*BrowserRouter*/ HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, PrintService, Contact, About, Terms, Privacy, Materials, Signup, Signin, ForgotPassword, ResetPassword, Account, PrintCheckout, PrintCart } from './pages/export';
// import ShopRedirect from './backend/api/shopCall';
// import ProtectedRoute from "@/components/protectedroute"; TODO use when you need to signin to access
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import ProductGrid from './components/catalog/productGrid';


import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import styled from "styled-components";

const Page = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  // justify-content: center;
  align-items: auto;
  text-align: auto;
  // padding: 2rem;
`;
// TODO list
// [x] pagina detalii/checkout
// [x] cart
// [ ] sign in / register pe checkout
// [ ] ecommerce

const App = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Page>
        <Router>
          <div className="min-h-screen w-full flex flex-col ">
            <Navbar />
            <main className=" w-full flex-grow ">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/print" element={<ProtectedRoute> <PrintService /> </ProtectedRoute>} /> */}
                <Route path="/print" element={<PrintService />} />
                {/* <Route path="/gallery" element={<Gallery />} /> */}
                {<Route path="/materials" element={<Materials />} />}
                {<Route path="/contact" element={<Contact />} />}
                {<Route path="/about" element={<About />} />}
                {<Route path="/privacy-policy" element={<Privacy />} />}
                {<Route path="/terms-of-service" element={<Terms />} />}
                <Route path="/shop" element={<ProductGrid />} />
                {<Route path="/signin" element={<Signin />} />}
                {<Route path="/signup" element={<Signup />} />}
                {<Route path="/account" element={<Account />} />}
                {<Route path="/forgot-password" element={<ForgotPassword />} />}
                {<Route path="/reset-password" element={<ResetPassword />} />}
                {<Route path="/cart" element={<PrintCart />} />}
                {/* {<Route path="/print-checkout" element={<PrintCheckout />} />} */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Page>
    </SessionContextProvider >
  );
};

export default App;