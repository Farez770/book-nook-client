"use client";
import Link from "next/link";
import { ArrowLeft, BookPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
// import { toast } from "@heroui/react";

export default function AddBookPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  const handleAddBook = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    // const bookData = Object.fromEntries(formData.entries());
    // console.log(bookData);

    const image = formData.get("image") as File;

    if (!image || image.size === 0) {
      toast.error("Please Select a book image");
      return;
    }
    const imageData = new FormData();
    imageData.append("image", image);

    const imageRes = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imageData,
      },
    );

    console.log(
      "ImgBB API Key exists:",
      !!process.env.NEXT_PUBLIC_IMGBB_API_KEY,
    );
    console.log(imageRes);

    const imageResult = await imageRes.json();

    if (!imageRes.ok || !imageResult.success) {
      toast.error("Image upload failed!");
      return;
    }

    const bookData = Object.fromEntries(formData.entries());
    bookData.image = imageResult.data.url;

    // form fields arrive as strings, totalCopies must be a real number
    bookData.totalCopies = Number(bookData.totalCopies) || 0;

    console.log(bookData);

    const token = await getTokenFromClient();

    const res = await fetch("http://localhost:8000/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookData),
    });

    const result = await res.json();
    console.log(result);

    form.reset();

    // toast.success("Your Book added successfully! 📚");
    toast.success("Your book has been added successfully!");
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:pt-8 sm:pb-12">
      <Link
        href="/books"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#174D38]"
      >
        <ArrowLeft size={16} /> Back to Books
      </Link>

      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-[#174D38] sm:text-4xl">
          Add a New Book
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Share a new book with the BookNook community.
        </p>
      </div>

      <form
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 sm:p-8"
        onSubmit={handleAddBook}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Book Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter book title"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#174D38]"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Author Name
            </label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="Enter author name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#174D38]"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue=""
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-[#174D38]"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option>Fiction</option>
              <option>Science</option>
              <option>History</option>
              <option>Kids</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="totalCopies"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Total Copies
            </label>
            <input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min="1"
              placeholder="Enter total copies"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#174D38]"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Choose Book Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none file:mr-2  file:border file:border-black file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-black file:transition cursor-pointer file:cursor-pointer"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Book Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Write a short description about the book..."
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#174D38]"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="userName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Added By
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              defaultValue={user?.name}
              placeholder="Your name"
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm  outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="userEmail"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              placeholder="Your email"
              defaultValue={user?.email}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm  outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#174D38] px-5 py-3 font-medium text-white transition hover:bg-[#103B2B]"
        >
          <BookPlus size={18} />
          Add Book
        </button>
      </form>
    </main>
  );
}
