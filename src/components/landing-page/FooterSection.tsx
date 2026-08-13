export default function FooterSection() {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-center text-slate-400">
      <p>
        © {new Date().getFullYear()} OneCloud. Built for modern enterprise
        management.
      </p>
    </footer>
  );
}
