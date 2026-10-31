const steps = [
  {
    number: "01",
    title: "Find a book",
    description:
      "Open a category or browse the whole shelf. Every card shows the cover, the author and how many copies are free right now.",
  },
  {
    number: "02",
    title: "Borrow it",
    description:
      "Sign in, open the book you want and confirm. It moves to My Borrows, and the copy count drops by one.",
  },
  {
    number: "03",
    title: "Return it",
    description:
      "Press Return Book when you are done. The copy goes straight back on the shelf for whoever is next.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#FAF4EE] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-16  text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-wider text-[#527568]">
            How It Works
          </span>

          <h2 className="font-serif text-3xl font-bold  text-[#171717] sm:text-4xl md:text-5xl">
            Borrow a book in three steps
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#55504B] sm:text-base">
            No membership fees, no complicated process. Borrow a book for seven
            days and return it whenever you finish reading.
          </p>
        </div>

        {/* Three Steps */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[24px] border border-[#D9CFC3] bg-[#F3E5D6] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#A99A88] sm:p-8"
            >
              {/* Step Number */}
              <span className="mb-5 block  text-4xl font-bold text-[#171717] sm:text-5xl">
                {step.number}
              </span>

              {/* Step Title */}
              <h3 className="mb-3  text-xl font-bold text-[#171717] sm:text-2xl">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-sm leading-6 text-[#514B45] sm:text-base sm:leading-7">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
