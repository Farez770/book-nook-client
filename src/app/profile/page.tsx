"use client";

import Image from "next/image";
import { UserRound, Mail, BookOpen, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-6 pb-12">
      <h1 className="text-center font-serif text-3xl font-bold text-[#174D38]">
        My Profile
      </h1>
      <p className="mt-2 text-center text-sm text-gray-500">
        Your BookNook account information.
      </p>

      <section className="mt-6 flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center sm:p-8">
        {user?.image ? (
          <Image
            src={user.image}
            alt="Profile picture"
            width={128}
            height={128}
            loading="eager"
            className="size-32 rounded-xl object-cover"
          />
        ) : (
          <div className="flex size-25 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-500">
            {user?.name?.charAt(0)}
          </div>
        )}

        <h2 className="mt-3 text-xl font-semibold text-gray-800">
          {user?.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{user?.email}</p>

        <div className="my-5 w-full border-t border-gray-200" />

        <h3 className="mb-4 text-lg font-semibold text-[#174D38]">
          Account Details
        </h3>

        <div className="space-y-3">
          <p className="flex items-center justify-center gap-3 text-sm text-gray-600">
            <UserRound size={18} />
            Full Name: {user?.name}
          </p>
          <p className="flex items-center justify-center gap-3 text-sm text-gray-600">
            <Mail size={18} />
            Email: {user?.email}
          </p>
          <p className="flex items-center justify-center gap-3 text-sm text-gray-600">
            <BookOpen size={18} />
            Membership: BookNook Reader
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="cursor-pointer rounded-lg bg-[#174D38] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#103B2B]">
            Edit Profile
          </button>
          <Link
            href="/books"
            className="rounded-lg border border-[#174D38] px-5 py-2.5 text-sm font-medium text-[#174D38] hover:bg-[#174D38]/5"
          >
            My Books
          </Link>
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </section>
    </main>
  );
}
