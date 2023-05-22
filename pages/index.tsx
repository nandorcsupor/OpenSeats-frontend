import Head from "next/head"
import { Button } from "components/Button/Button"
import { CARDS } from "cards"

export default function Web() {
  return (
    <>
      <Head>
        <title>OpenSeats - Where True Fans Buy Their Tickets</title>
      </Head>
      <section className="bg-purple-500">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <div className="prose prose-lg mx-auto max-w-none pt-5 font-body text-white">
              <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight md:text-7xl xl:text-8xl">
                OpenSeats - Where True Fans Buy Their Tickets
              </h1>
              <p className="mb-6 pt-12 text-lg font-light lg:mb-8 lg:text-xl">
                Welcome to OpenSeats, the game-changer in the ticketing industry. Leveraging the power of blockchain
                technology, we have pioneered a new era of transparent and fair ticket sales. OpenSeats ensures not just
                authenticity but also enforces a cap on resale prices, meaning every fan has a fair shot at experiencing
                their dream events. No longer will fans be held ransom by inflated resale prices; our unique platform
                ensures tickets can be resold only once and at no more than a 5% markup. Bid farewell to ticket scalping
                and embrace the future of ticketing with OpenSeats - where true fans buy their tickets.
              </p>
            </div>
            <Button className="mr-3 bg-yellow-400 text-black" href={"/start-match"}>
              Start Match
            </Button>
            <Button className="bg-yellow-400 text-black" href={"/available-matches"}>
              See Available Matches
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {CARDS.map((singleItem) => (
              <div key={singleItem.title} className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 p-1.5 text-blue-700 dark:bg-primary-900 lg:h-12 lg:w-12">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{singleItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
