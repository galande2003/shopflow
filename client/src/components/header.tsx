import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header-gradient text-white shadow-lg">
      <div className="page-container">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <ShoppingBag className="h-8 w-8" />
            <span className="text-2xl font-bold">ShopEase</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link 
                  href="/" 
                  className={`font-medium transition-opacity hover:opacity-80 ${
                    location === '/' ? 'opacity-100' : 'opacity-90'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/orders" 
                  className={`font-medium transition-opacity hover:opacity-80 ${
                    location === '/orders' ? 'opacity-100' : 'opacity-90'
                  }`}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin" 
                  className={`font-medium transition-opacity hover:opacity-80 ${
                    location === '/admin' ? 'opacity-100' : 'opacity-90'
                  }`}
                >
                  Admin
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:text-white/80"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className={`block py-2 font-medium transition-opacity hover:opacity-80 ${
                      location === '/' ? 'opacity-100' : 'opacity-90'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/orders" 
                    className={`block py-2 font-medium transition-opacity hover:opacity-80 ${
                      location === '/orders' ? 'opacity-100' : 'opacity-90'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/admin" 
                    className={`block py-2 font-medium transition-opacity hover:opacity-80 ${
                      location === '/admin' ? 'opacity-100' : 'opacity-90'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
