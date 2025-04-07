import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, PrintService, Contact, About, Terms, Privacy, Materials } from './pages/export';
import ShopRedirect from './api/shopCall';


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


const App = () => {
  return (
    <Page>
      <Router>
        <div className="min-h-screen w-full flex flex-col ">
          <Navbar />
          <main className=" w-full flex-grow ">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/print" element={<PrintService />} />
              {/* <Route path="/gallery" element={<Gallery />} /> */}
              {<Route path="/materials" element={<Materials />} />}
              {<Route path="/contact" element={<Contact />} />}
              {<Route path="/about" element={<About />} />}
              {<Route path="/privacy-policy" element={<Privacy />} />}
              {<Route path="/terms-of-service" element={<Terms />} />}
              {<Route path="/shop" element={<ShopRedirect />} />}
              {/* {<Route path="/print-cart" element={<PrintCartPage />} />}
              {<Route path="/print-checkout/:checkoutId" element={<PrintCheckoutPage />} />} */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Page>
  );
};

export default App;