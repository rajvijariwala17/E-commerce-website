import Link from "next/link";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between">
        <p>&copy; {year} E-Commerce. All rights reserved.</p>
        <div className="flex gap-4 mt-3 sm:mt-0">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
