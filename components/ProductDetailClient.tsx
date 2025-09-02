"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="w-full h-72 relative bg-gray-100 dark:bg-gray-800 rounded mb-4">
        <Image
          src={product.image || "/file.svg"}
          alt={product.title}
          fill
          className="object-contain"
          sizes="100vw"
          priority={false}
        />
      </div>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-xl my-2">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(product.price)}
      </p>
      <p className="mb-4 text-gray-700 whitespace-pre-line">
        {product.description}
      </p>
      <button
        onClick={() =>
          addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image,
          })
        }
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Add to cart
      </button>
    </div>
  );
}
