"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- import

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/properties", label: "Properties" },
    { href: "/services", label: "Services" },
  ];

  return (
    <nav className="w-full">
      {/* Top banner */}
      <div className="relative p-2">
        <Image
          src="/assets/Abstract Design.png"
          alt="Background"
          fill
          className="object-cover opacity-50 -z-10"
          priority
        />
        <div className="flex justify-center">
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <p>✨ Discover Your Dream Property with Estatein</p>
            <Link href="#" className="text-white underline">
              Learn More
            </Link>
          </div>
        </div>

        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-20">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navbar */}
      <div className="flex flex-row gap-10 items-center justify-around flex-wrap bg-gray-10 p-5">
        <div>
          <Image
            src="/assets/Logo-lg.png"
            alt="Logo"
            width={100}
            height={100}
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 200px, 400px"
            priority
          />
        </div>

        <div className="flex flex-row gap-2 flex-wrap">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`p-[10px_20px] rounded-md border-gray-20 flex-1 text-center text-nowrap   ${
                  isActive
                    ? "bg-gray-08 text-white border"
                    : "hover:bg-gray-08 "
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div>
          <Link
            href=""
            className="bg-gray-08 rounded-md p-[10px_20px] border border-gray-20"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
