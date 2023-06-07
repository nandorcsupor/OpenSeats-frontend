import { useState, useEffect } from "react";


interface Match {
  ticket_address: string;
  match_name: string;
  ticket_date: string;
  max_tickets: number;
}

export default function Web() {
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Buy Ticket States
  const [gate, setGate] = useState('');
  const [section, setSection] = useState('');
  const [row, setRow] = useState('');
  const [seat, setSeat] = useState('');
  const [category, setCategory] = useState('');
  const [selectedContract, setSelectedContract] = useState('')
  const [showToast, setShowToast] = useState(false)

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

  const onSubmit = async () => {
    setShowToast(true)
    setShowModal(false)
    const buy_ticket_data = {
      ticket_contract_address: selectedContract,
      gate: gate,
      section: section,
      row: row,
      seat: seat,
      category: category
    }

    console.log("MatchData:", buy_ticket_data)

    // Buy Ticket
    try {
      const response = await fetch("http://localhost:8000/buy-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buy_ticket_data)
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Ticket buy successful:", data)
      } else {
        console.error("Failed to buy ticket:", response.statusText)
      }
    } catch (error) {
      console.error("Failed to buy ticket#2:", error)
    }
  }

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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(true)}
                        >
                          Buy Ticket
                        </button>
                        {showModal && (
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl w-full max-h-2xl h-1/2 overflow-hidden flex flex-col">
                              <div className="flex-grow">
                                <div className="flex">
                                  <div className="w-1/2">
                                    <img src="/stadium-grey.png" alt="Stadium" className="h-full w-full object-cover" />
                                  </div>
                                  <div className="w-1/2 pl-6">
                                    <h3 className="text-3xl font-semibold mb-4">
                                      Buy {match.match_name} Tickets
                                    </h3>
                                    <p className="text-slate-500 text-lg leading-relaxed">
                                      <span className="whitespace-pre-line">
                                        Remember, you can only resell your ticket once, for the same price.
                                      </span>
                                    </p>
                                    <div className="mt-4">
                                      <input
                                        type="text"
                                        placeholder={match.ticket_address}
                                        value={selectedContract}
                                        onChange={(e) => setSelectedContract(e.target.value)}
                                        className="border border-gray-300 rounded-m p-2 w-full"
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <input
                                        type="text"
                                        placeholder="Gate"
                                        value={gate}
                                        onChange={(e) => setGate(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2"
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <input
                                        type="text"
                                        placeholder="Section"
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2"
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <input
                                        type="text"
                                        placeholder="Row"
                                        value={row}
                                        onChange={(e) => setRow(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2"
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <input
                                        type="text"
                                        placeholder="Seat"
                                        value={seat}
                                        onChange={(e) => setSeat(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2"
                                      />
                                    </div>
                                    <div className="mt-4">
                                      <input
                                        type="text"
                                        placeholder="Category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-auto flex items-center justify-end">
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-2"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Close
                                </button>
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                                  type="button"
                                  onClick={onSubmit}
                                >
                                  Buy Ticket
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        {showModal && (
                          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {showToast &&
                  <div id="toast-success" className="fixed bottom-4 right-4 z-50">
                    <div className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="sr-only">Check icon</span>
                      </div>
                      <div className="ml-3 text-sm font-normal">NFT Ticket bought successfully.</div>
                      <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                }
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
}