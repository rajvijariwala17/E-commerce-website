"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { items } = useCart();
  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity ?? 0), 0),
    [items]
  );

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        E-Commerce
      </Link>

      <div className="flex gap-6 items-center relative">
        {/* Always visible */}
        <Link href="/">Home</Link>

        {/* If NOT logged in → only show Login */}
        {!isLoggedIn ? (
          <Link href="/login">Login</Link>
        ) : (
          <>
            {/* Show Products link after login */}
            <Link href="/products">Products</Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-1"
              >
                <User className="w-6 h-6" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
                  <div className="px-4 py-2 border-b">{username}</div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
