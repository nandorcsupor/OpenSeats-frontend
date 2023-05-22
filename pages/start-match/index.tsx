import Head from "next/head"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"

export default function Web() {
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [date, setDate] = useState<Date | null>(null)
  const [dateString, setDateString] = useState<string>("")
  const [maxTicketNumber, setMaxTicketNumber] = useState("")
  const [venueConfig, setVenueConfig] = useState([{ gate: "", sections: [{ row: "", seats: "", category: "" }] }])

  const handleCreateMatch = async () => {
    const matchData = {
      max_tickets: Number(maxTicketNumber),
      date: dateString,
      tokenName: homeTeam,
      tokenSymbol: awayTeam,
      gates: [] as { // Added type annotation for the 'gates' array
        gate: string;
        sections: {
          row: number;
          seats: number;
          category: number;
        }[];
      }[],
    };

    venueConfig.forEach((gate) => {
      const gateData = {
        gate: gate.gate,
        sections: [] as { row: number; seats: number; category: number }[],
      };

      gate.sections.forEach((section) => {
        const sectionData = {
          row: Number(section.row),
          seats: Number(section.seats),
          category: Number(section.category),
        };

        gateData.sections.push(sectionData);
      });

      matchData.gates.push(gateData);
    });
    console.log('MatchData:', matchData)

    // Create Match
    try {
      const response = await fetch("http://localhost:8000/create-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matchData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Match created successfully:", data);
      } else {
        console.error("Failed to create match:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to create match:", error);
    }
  };

  const handleAddGate = () => {
    setVenueConfig([...venueConfig, { gate: "", sections: [{ row: "", seats: "", category: "" }] }])
  }

  const handleDeleteGate = (index: number) => {
    const updatedConfig = [...venueConfig]
    updatedConfig.splice(index, 1)
    setVenueConfig(updatedConfig)
  }

  const handleAddSection = (gateIndex: number) => {
    const updatedConfig = [...venueConfig]
    updatedConfig[gateIndex].sections.push({ row: "", seats: "", category: "" })
    setVenueConfig(updatedConfig)
  }

  const handleDeleteSection = (gateIndex: number, sectionIndex: number) => {
    const updatedConfig = [...venueConfig]
    updatedConfig[gateIndex].sections.splice(sectionIndex, 1)
    setVenueConfig(updatedConfig)
  }

  const handleDatePickerChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "dd/MM/yyyy")
      setDate(selectedDate)
      setDateString(formattedDate)
    } else {
      setDate(null)
    }
  }

  return (
    <>
      <Head>
        <title>Start New Football Match</title>
      </Head>
      <section className="bg-gradient-to-b from-purple-800 via-purple-700 to-white transition-all duration-1000">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl xl:text-6xl">
              Start New Football Match
            </h1>
          </div>
        </div>
      </section>
      <section className="bg-white transition-all duration-1000 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <form>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="homeTeam"
                  className="block pb-2 text-center text-lg font-bold text-gray-700 dark:text-gray-400"
                >
                  Home Team
                </label>
                <input
                  type="text"
                  id="homeTeam"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-200 dark:bg-gray-800 dark:text-gray-300"
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="awayTeam"
                  className="block pb-2 text-center text-lg font-bold text-gray-700 dark:text-gray-400 pt-4 sm:pt-8 lg:pt-12"
                >
                  Away Team
                </label>
                <input
                  type="text"
                  id="awayTeam"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-200 dark:bg-gray-800 dark:text-gray-300"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                />
              </div>
              <div className="pt-4 sm:pt-8 lg:pt-12">
                <label
                  htmlFor="date"
                  className="block pb-2 text-center text-lg font-bold text-gray-700 dark:text-gray-400"
                >
                  Date
                </label>
                <DatePicker
                  id="date"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-200 dark:bg-gray-800 dark:text-gray-300"
                  selected={date}
                  onChange={handleDatePickerChange}
                />
              </div>
              <div className="pt-4 sm:pt-8 lg:pt-12">
                <label
                  htmlFor="maxTicketNumber"
                  className="block pb-2 text-center text-lg font-bold text-gray-700 dark:text-gray-400"
                >
                  Max Ticket Number
                </label>
                <input
                  type="text"
                  id="maxTicketNumber"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-400 focus:outline-none focus:ring focus:ring-primary-200 dark:bg-gray-800 dark:text-gray-300"
                  value={maxTicketNumber}
                  onChange={(e) => setMaxTicketNumber(e.target.value)}
                />
              </div>
              {venueConfig.map((gate, gateIndex) => (
                <div key={gateIndex} className="rounded border border-gray-300 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold">
                      Gate{" "}
                      <input
                        type="text"
                        value={gate.gate}
                        className="ml-4 w-40 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 dark:bg-gray-800 dark:text-gray-300"
                        onChange={(e) => {
                          const updatedConfig = [...venueConfig]
                          updatedConfig[gateIndex].gate = e.target.value
                          setVenueConfig(updatedConfig)
                        }}
                        placeholder={`${gateIndex + 1}`}
                      />
                    </h3>
                    {venueConfig.length > 1 && (
                      <button
                        type="button"
                        className="text-sm text-red-500 focus:outline-none"
                        onClick={() => handleDeleteGate(gateIndex)}
                      >
                        Delete Gate
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {gate.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <div className="flex items-center justify-between">
                          <h4 className="text-md font-semibold">Section {sectionIndex + 1}</h4>
                          <button
                            type="button"
                            className="text-sm text-red-500 focus:outline-none"
                            onClick={() => handleDeleteSection(gateIndex, sectionIndex)}
                          >
                            Delete Section
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label
                              htmlFor={`row-${gateIndex}-${sectionIndex}`}
                              className="block text-gray-700 dark:text-gray-400"
                            >
                              Row Number
                            </label>
                            <input
                              type="text"
                              id={`row-${gateIndex}-${sectionIndex}`}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 dark:bg-gray-800 dark:text-gray-300"
                              value={section.row}
                              onChange={(e) => {
                                const updatedConfig = [...venueConfig]
                                updatedConfig[gateIndex].sections[sectionIndex].row = e.target.value
                                setVenueConfig(updatedConfig)
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`seats-${gateIndex}-${sectionIndex}`}
                              className="block text-gray-700 dark:text-gray-400"
                            >
                              Number of Seats
                            </label>
                            <input
                              type="text"
                              id={`seats-${gateIndex}-${sectionIndex}`}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 dark:bg-gray-800 dark:text-gray-300"
                              value={section.seats}
                              onChange={(e) => {
                                const updatedConfig = [...venueConfig]
                                updatedConfig[gateIndex].sections[sectionIndex].seats = e.target.value
                                setVenueConfig(updatedConfig)
                              }}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`category-${gateIndex}-${sectionIndex}`}
                              className="block text-gray-700 dark:text-gray-400"
                            >
                              Category Number
                            </label>
                            <input
                              type="text"
                              id={`category-${gateIndex}-${sectionIndex}`}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 dark:bg-gray-800 dark:text-gray-300"
                              value={section.category}
                              onChange={(e) => {
                                const updatedConfig = [...venueConfig]
                                updatedConfig[gateIndex].sections[sectionIndex].category = e.target.value
                                setVenueConfig(updatedConfig)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="text-sm text-gray-700 focus:outline-none dark:text-gray-400"
                      onClick={() => handleAddSection(gateIndex)}
                    >
                      Add Section
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="mt-4 text-sm text-gray-700 focus:outline-none dark:text-gray-400"
                onClick={handleAddGate}
              >
                Add New Gate
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="py-2 px-4 bg-yellow-500 text-white font-bold rounded shadow hover:bg-yellow-600"
              onClick={handleCreateMatch}
            >
              Create Match
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
