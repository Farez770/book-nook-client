import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#071F17] text-[#F5F1E8]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <Image
                src="/BookNook-logo.png"
                alt="BookNook Logo"
                width={45}
                height={45}
                className="h-10 w-auto"
              />
              <span className="font-serif text-2xl font-bold tracking-wide">
                Book<span className="text-[#C5EF70]">Nook</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Your Digital Library. Discover wonderful stories, explore new
              perspectives, and find your next favorite book with BookNook.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-[#C5EF70] hover:bg-[#C5EF70] hover:text-[#071F17]"
              >
                <FaFacebookF size={17} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-[#C5EF70] hover:bg-[#C5EF70] hover:text-[#071F17]"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://github.com/farez770"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-[#C5EF70] hover:bg-[#C5EF70] hover:text-[#071F17]"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition hover:text-[#C5EF70]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="transition hover:text-[#C5EF70]">
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  href="/add-book"
                  className="transition hover:text-[#C5EF70]"
                >
                  Add Book
                </Link>
              </li>
              <li>
                <Link
                  href="/my-books"
                  className="transition hover:text-[#C5EF70]"
                >
                  My Books
                </Link>
              </li>
              <li>
                <Link
                  href="/my-borrows"
                  className="transition hover:text-[#C5EF70]"
                >
                  My Borrows
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">
              Get in Touch
            </h3>

            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <FaEnvelope
                  size={18}
                  className="mt-0.5 shrink-0 text-[#C5EF70]"
                />
                <a
                  href="mailto:asfaq.farez@gmail.com"
                  className="transition hover:text-[#C5EF70]"
                >
                  asfaq.farez@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt
                  size={17}
                  className="mt-0.5 shrink-0 text-[#C5EF70]"
                />
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="transition hover:text-[#C5EF70]"
                >
                  +880 1XXXXXXXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt
                  size={18}
                  className="mt-0.5 shrink-0 text-[#C5EF70]"
                />
                <span>Chittagong, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Discover More */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">
              Discover More
            </h3>

            <p className="mb-5 text-sm leading-7 text-gray-400">
              Every book has a story. Start exploring our collection and let
              your next reading adventure begin.
            </p>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 font-semibold text-[#C5EF70] transition hover:gap-3"
            >
              Explore Books
              <FaArrowUpRightFromSquare size={15} />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500">
            © 2026 BookNook. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Made with <span className="text-[#C5EF70]">♥</span> for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
