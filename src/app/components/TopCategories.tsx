import Link from "next/link";
import {
  FaBookOpen,
  FaFlask,
  FaLandmark,
  FaChild,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";

const categories = [
  {
    name: "Fiction",
    description: "Discover stories, novels and unforgettable adventures.",
    icon: FaBookOpen,
    number: "01",
  },
  {
    name: "Science",
    description: "Explore scientific discoveries and new ideas.",
    icon: FaFlask,
    number: "02",
  },
  {
    name: "History",
    description: "Travel through time and discover the past.",
    icon: FaLandmark,
    number: "03",
  },
  {
    name: "Kids",
    description: "Wonderful stories for curious young minds.",
    icon: FaChild,
    number: "04",
  },
  {
    name: "Others",
    description: "Explore more books and unexpected interests.",
    icon: FaLayerGroup,
    number: "05",
  },
];

const TopCategories = () => {
  return (
    <section className="bg-[#F3E5D6] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-[#527568]">
              Explore & Discover
            </span>

            <h2 className="font-serif text-3xl font-bold leading-tight text-[#171717] sm:text-4xl md:text-5xl">
              Find Your Favorite{" "}
              <span className="text-[#3b6f5d]">Category</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#55504B] sm:text-base">
              Every reader has a different taste. Explore our book categories
              and find stories, knowledge and ideas that inspire you.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#174D38] transition-all hover:gap-3"
          >
            View All Books
            <FaArrowRight size={14} />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.number}
                href="/books"
                className="group rounded-2xl border border-[#D9CFC3] bg-[#FAF4EE] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#527568] hover:shadow-xl hover:shadow-[#174D38]/5"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#174D38] text-[#C5EF70] transition-all duration-300 group-hover:bg-[#C5EF70] group-hover:text-[#174D38]">
                    <Icon size={23} />
                  </div>

                  <span className=" text-2xl font-bold text-[#174D38]/20">
                    {category.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#171717]">
                  {category.name}
                </h3>

                <p className="min-h-[72px] text-sm leading-6 text-[#55504B]">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#174D38] transition-all group-hover:gap-3">
                  Explore
                  <FaArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
