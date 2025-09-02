"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check session on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleStartShopping = () => {
    if (isLoggedIn) {
      router.push("/products"); // already logged in → go to products
    } else {
      router.push("/login"); // not logged in → go to login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome To <span className="text-blue-600">E-commerce Website</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
          Discover amazing products at the best prices. Shop now and enjoy a
          seamless online shopping experience!
        </p>
        <button
          onClick={handleStartShopping}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}
