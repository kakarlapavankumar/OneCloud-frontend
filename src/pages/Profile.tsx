import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Info label="Name" value={user.name} />

          <Info label="Username" value={user.username} />

          <Info label="Email" value={user.email} />

          <Info label="Role" value={user.role} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase text-slate-500">{label}</p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
