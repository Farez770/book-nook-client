"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user ?? null;

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
  ];

  const privateLinks = [
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  const navLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClass = (href: string) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive(href)
        ? "bg-[#174D38]/10 text-[#174D38] dark:bg-green-400/10 dark:text-green-300"
        : "text-gray-600 hover:bg-gray-100 hover:text-[#174D38] dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-green-300"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/95">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/BookNook-logo.png"
            alt="BookNook Logo"
            width={42}
            height={42}
            priority
            className="h-12 w-12 object-contain"
          />

          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#174D38] dark:text-green-300">
              BookNook
            </h2>
            <p className="text-black">An Online Book Library</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#174D38] dark:bg-green-300" />
              )}
            </Link>
          ))}
        </div>

        {/* Authentication Component */}
        <div className="flex items-center gap-3">
          <AuthButtons user={user} isPending={isPending} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 lg:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-950 lg:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`${linkClass(link.href)} w-full ${
                isActive(link.href) ? "font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
