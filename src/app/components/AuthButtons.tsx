"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Popover } from "@heroui/react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

interface AuthUser {
  name: string;
  email: string;
  image?: string | null;
}

interface AuthButtonsProps {
  user: AuthUser | null;
  isPending: boolean;
  isMobile?: boolean;
  onNavigate?: () => void;
}

const AuthButtons = ({
  user,
  isPending,
  isMobile = false,
  onNavigate,
}: AuthButtonsProps) => {
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
      onNavigate?.();
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
      <div
        className={`flex ${isMobile ? "w-full flex-col" : "items-center"} gap-2`}
      >
        <Link
          href="/login"
          onClick={onNavigate}
          className={`inline-flex items-center justify-center rounded-lg border border-[#174D38] px-4 py-2 text-sm font-semibold text-[#174D38] transition-colors hover:bg-[#174D38]/10 dark:border-green-300 dark:text-green-300 dark:hover:bg-white/10 ${isMobile ? "w-full" : ""}`}
        >
          Login
        </Link>

        <Link
          href="/register"
          onClick={onNavigate}
          className={`inline-flex items-center justify-center rounded-lg bg-[#174D38] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#103B2B] dark:bg-green-300 dark:text-gray-950 dark:hover:bg-green-200 ${isMobile ? "w-full" : ""}`}
        >
          Register
        </Link>
      </div>
    );
  }

  // Logged in UI with HeroUI Popover
  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <button
          type="button"
          aria-label="Open user profile menu"
          aria-expanded={isOpen}
          className={`flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-white/10 ${isMobile ? "w-full justify-between" : ""}`}
        >
          <span className="flex items-center gap-2">
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name}'s profile`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-[#174D38] object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#174D38] text-white">
                {/* <UserRound size={20} /> */}
                {user?.name.charAt(0)}
              </span>
            )}

            {isMobile && (
              <span className="text-sm font-semibold text-gray-800 dark:text-white">
                {user.name}
              </span>
            )}
          </span>

          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </Popover.Trigger>

      <Popover.Content
        placement="bottom end"
        offset={10}
        className="z-50 w-60 rounded-xl border border-gray-200 bg-white p-0 shadow-xl dark:border-gray-700 dark:bg-gray-900"
      >
        <Popover.Dialog className="p-3">
          {/* User information */}
          <div className="flex items-center gap-3 border-b border-gray-200 px-2 pb-3 dark:border-gray-700">
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name}'s profile`}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#174D38] text-white">
                {/* <UserRound size={20} /> */}
                {user?.name.charAt(0)}
              </span>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          {/* My Profile */}
          <Link
            href="/profile"
            onClick={() => {
              setIsOpen(false);
              onNavigate?.();
            }}
            className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <UserRound size={17} />
            My Profile
          </Link>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};

export default AuthButtons;
