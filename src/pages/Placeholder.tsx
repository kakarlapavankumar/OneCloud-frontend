interface Props {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: Props) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="mt-3 text-slate-500">{description}</p>

        <div className="mt-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
          Coming soon
        </div>
      </div>
    </div>
  );
}
