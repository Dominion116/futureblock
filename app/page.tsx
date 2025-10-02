import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to FutureBlock</h1>
      <p className="text-lg mb-8">A new way to build your applications.</p>
      <Button>Get Started</Button>
    </main>
  );
}
