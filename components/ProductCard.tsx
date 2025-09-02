import React from "react";
import Link from "next/link";
import Image from "next/image";
type Product = { id: string; title: string; price: number; image: string };

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white/5 ring-1 ring-white/10 hover:shadow-md transition">
      <Link href={`/products/${encodeURIComponent(product.id)}`}>
        <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.image || "/file.svg"}
            alt={product.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-base line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          {product.price > 0
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(product.price)
            : "Price on request"}
        </p>
        <Link
          className="text-blue-500 hover:text-blue-400 mt-3 inline-block"
          href={`/products/${encodeURIComponent(product.id)}`}
        >
          View
        </Link>
      </div>
    </div>
  );
}
