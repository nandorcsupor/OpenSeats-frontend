import { useState, useEffect } from "react";
import Head from "next/head";

interface Match {
  ticket_address: string;
  match_name: string;
  ticket_date: string;
  max_tickets: number;
}

export default function Web() {
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMatchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-matches");
      const data = await response.json();
      setMatchData(data as Match[]);
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  };

  useEffect(() => {
    const fetchMatchDataInterval = setInterval(fetchMatchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(fetchMatchDataInterval);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [matchData]);

  return (
    <>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Render match data table */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center text-center w-full">
                <div className="mb-4 font-bold">LOADING</div>
              </div>
            ) : matchData.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center w-full">
                <div className="mb-4">No match data available.</div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Match Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Max Tickets
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {matchData.map((match) => (
                    <tr key={match.ticket_address}>
                      <td className="px-6 py-4 whitespace-nowrap">{match.ticket_address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{match.match_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{match.ticket_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{match.max_tickets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  )
}