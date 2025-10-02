import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const LandingPage: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>FutureBlock | Prediction Market</title>
        <meta name="description" content="A decentralized prediction market on Base." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <header className="header">
          <h1 className="title">FutureBlock</h1>
          <p className="description">Decentralized Predictions on Base</p>
        </header>

        <section className="hero">
          <h2 className="heroTitle">Predict the Future of Crypto</h2>
          <p className="heroSubtitle">
            A fair, transparent, and decentralized prediction market powered by Chainlink.
          </p>
          <Link href="/app" className="launchButton">
            Launch App
          </Link>
        </section>

        <section className="features">
          <div className="featureCard">
            <h3>Commit-Reveal Scheme</h3>
            <p>Your predictions are kept secret until the reveal phase, ensuring a fair and transparent market.</p>
          </div>
          <div className="featureCard">
            <h3>Powered by Chainlink</h3>
            <p>We use Chainlink's decentralized oracles to get reliable, real-world price data.</p>
          </div>
          <div className="featureCard">
            <h3>Predict on Major Tokens</h3>
            <p>Make predictions on the future price of ETH, BTC, and SOL, with more to come.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built on Base. Powered by Chainlink.</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #1a1a1a; /* Dark background */
          color: #ffffff; /* Light text */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        }

        .main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .header {
          width: 100%;
          padding: 1rem;
          text-align: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .hero {
          text-align: center;
          padding: 4rem 2rem;
          border-radius: 12px;
          background-color: #2a2a2a; /* Slightly lighter dark shade */
          margin: 2rem 0;
        }

        .heroTitle {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .heroSubtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
        }

        .launchButton {
          display: inline-block;
          padding: 1rem 2rem;
          font-size: 1.25rem;
          color: #ffffff;
          background-color: #0070f3; /* Accent color */
          border: none;
          border-radius: 8px;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .launchButton:hover {
          background-color: #0056b3;
        }

        .features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 800px;
          margin-top: 3rem;
        }

        .featureCard {
          margin: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 45%;
          background-color: #2a2a2a; /* Slightly lighter dark shade */
        }

        .featureCard:hover,
        .featureCard:focus,
        .featureCard:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .featureCard h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .featureCard p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
