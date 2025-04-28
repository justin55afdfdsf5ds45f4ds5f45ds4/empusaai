import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Empusa AI</div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#workflow">How it Works</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#cta">Start Free Trial</a>
      </div>
      <div className="auth">
        <a href="/auth/login">Login</a>
        <a href="/auth/register" className="signup">Sign Up</a>
      </div>
    </nav>
  );
} 