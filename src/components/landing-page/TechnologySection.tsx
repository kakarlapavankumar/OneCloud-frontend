export default function TechnologySection() {
  const technologies = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Vite",
    "React Router",
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold">Built with modern technology</h2>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
