import { useState, useEffect } from "react";
import Head from "next/head";
import { Button } from "components/Button/Button";

interface Match {
  id: number;
  title: string;
  date: string;
  ticketsAvailable: number;
}

export default function Web() {
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch("https://fakeapi.com/matches"); // Replace with your API endpoint URL
        const data = await response.json();
        setMatchData(data as Match[]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    // Simulating API call with setTimeout
    setTimeout(fetchMatchData, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>OpenSeats - Where True Fans Buy Their Tickets</title>
      </Head>
      <section className="bg-gradient-to-b from-purple-800 via-purple-700 to-white transition-all duration-1000">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <div className="prose prose-lg mx-auto max-w-none pt-5 font-body text-white">
              <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight md:text-7xl xl:text-8xl">
                OpenSeats - Where True Fans Buy Their Tickets
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white transition-all duration-1000 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center text-center w-full">
                <div className="mb-4 font-bold">LOADING</div>
                {/* Additional styling */}
              </div>
            ) : (
              // Render match data
              matchData.map((match) => (
                <div key={match.id} className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 flex items-center justify-center rounded-full bg-primary-100 p-1.5 text-blue-700 dark:bg-primary-900">
                    <div style={{ width: "100%", height: "100%" }}>{/* Render your icon here */}</div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold dark:text-white">{match.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {match.date} - {match.ticketsAvailable} tickets available
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
