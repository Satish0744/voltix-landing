import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/sections/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Features from './components/sections/Features.jsx';
import HowItWorks from './components/sections/HowItWorks.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import Pricing from './components/sections/Pricing.jsx';
import Footer from './components/sections/Footer.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Profile from './pages/Profile.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';

function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-transparent transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}