import { useState, useEffect } from "react";

interface Ticket {
  contract_address: string;
  full_name: string;
  email: string;
  tokenid: string;
}

export default function Web() {
  const [ticketData, setTicketData] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTicketData = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-binded-tickets");
      const data = await response.json();
      setTicketData(data as Ticket[]);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [ticketData]);

  return (
    <section className="bg-white transition-all duration-1000 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contract Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Token ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap">
                  LOADING
                </td>
              </tr>
            ) : ticketData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap">
                  No ticket data available.
                </td>
              </tr>
            ) : (
              ticketData.map((ticket) => (
                <tr key={ticket.contract_address}>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.contract_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ticket.tokenid}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}