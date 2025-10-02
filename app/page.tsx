export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="h-16 flex items-center border-b">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-6">
          <a className="inline-flex items-center justify-center rounded-md border bg-card text-card-foreground h-9 w-9" href="#" aria-label="FutureBlock home">
            <svg
              className="h-5 w-5"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
          </a>
          <nav className="ml-auto hidden md:flex items-center gap-6">
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#">Features</a>
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#">Predictions</a>
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#">About</a>
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#">Contact</a>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-28">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Decentralized Prediction Market
                </h1>
                <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                  Predict the future price of your favorite cryptocurrencies. Built on the Base blockchain for transparency and fairness.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="#" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  Get Started
                </a>
                <a href="#" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-20 lg:py-28 bg-muted/40">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">Top Markets</div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Predict the Price of Top Cryptocurrencies</h2>
                <p className="mx-auto max-w-3xl text-muted-foreground md:text-lg">
                  Place your predictions on the price of Bitcoin, Ethereum, and Solana. More markets coming soon.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-stretch gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div className="group flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Bitcoin</h3>
                  <p className="text-sm text-muted-foreground">The original cryptocurrency, a store of value.</p>
                </div>
                <a href="#" className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">Predict BTC</a>
              </div>
              <div className="group flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Ethereum</h3>
                  <p className="text-sm text-muted-foreground">The leading platform for decentralized applications.</p>
                </div>
                <a href="#" className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">Predict ETH</a>
              </div>
              <div className="group flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Solana</h3>
                  <p className="text-sm text-muted-foreground">High-performance blockchain for fast, low-cost dApps.</p>
                </div>
                <a href="#" className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">Predict SOL</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-2 sm:flex-row items-center">
          <p className="text-xs text-muted-foreground">© 2024 FutureBlock. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline" href="#">Terms of Service</a>
            <a className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline" href="#">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
