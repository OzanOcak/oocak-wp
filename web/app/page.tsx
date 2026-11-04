import { auth0 } from "@/lib/auth0";
import { Suspense } from "react";

async function HomeContent() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">Oocak</h1>

        <div className="mt-6 flex gap-4">
          <a href="/auth/login?screen_hint=signup">Sign up</a>

          <a href="/auth/login">Login</a>
        </div>
      </main>
    );
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Welcome</h1>

      <p className="mt-4">Logged in as {session.user.email}</p>

      <pre className="mt-4">{JSON.stringify(session.user, null, 2)}</pre>

      <a className="mt-6 inline-block" href="/auth/logout">
        Logout
      </a>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="p-10">
          <p>Loading...</p>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
