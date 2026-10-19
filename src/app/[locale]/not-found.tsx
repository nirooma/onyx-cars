import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="text-center">
        <Logo className="justify-center" />
        <p className="mt-6 font-display text-5xl">404</p>
        <Link href="/" className="mt-6 inline-block text-sm text-shade">
          NightGuard
        </Link>
      </div>
    </main>
  );
}
