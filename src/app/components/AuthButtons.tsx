"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface AuthUser {
  name: string;
  email: string;
  image?: string | null;
}

interface AuthButtonsProps {
  user: AuthUser | null;
  isPending: boolean;
}

const AuthButtons = ({ user, isPending }: AuthButtonsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      setIsOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isPending) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
    );
  }

  // Logged out UI
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-[#174D38] transition-colors hover:bg-[#174D38]/10 dark:text-green-300 dark:hover:bg-white/10"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="hidden rounded-lg bg-[#174D38] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#103B2B] sm:inline-flex"
        >
          Register
        </Link>
      </div>
    );
  }

  // Logged in UI
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="h-10 w-10 rounded-full border-2 border-[#174D38] object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#174D38] text-white">
            <UserRound size={20} />
          </div>
        )}

        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <button
            aria-label="Close user menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 z-50 mt-3 w-60 rounded-xl border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
            <div className="border-b border-gray-200 px-3 py-3 dark:border-gray-700">
              <p className="truncate font-semibold text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <UserRound size={17} />
              My Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
