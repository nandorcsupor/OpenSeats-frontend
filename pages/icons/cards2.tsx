import React from "react"
import BlockchainIcon from "./blockchainicon"
import BusinessIcon from "./businessicon"
import SecurityIcon from "./securityicon"

interface CardsData {
  title: string
  description: string
  icon: React.ReactNode
}

const IconData: CardsData[] = [
  {
    title: "Blockchain technology",
    description:
      "Transformative by nature, blockchain technology ensures unparalleled transparency and security in ticketing. Powered by an architecture that is optimized for speed, performance, and reliability, we guarantee a seamless and efficient ticket buying experience.",
    icon: <BlockchainIcon width={300} height={150} />,
  },
  {
    title: "Security",
    description:
      "The immutability and transparency of blockchain ensure the integrity of data and protect against unauthorized tampering, providing enhanced safety in various domains.",
    icon: <SecurityIcon width={300} height={150} />,
  },
  {
    title: "Fair Business",
    description:
      "Blockchain revolutionizes the exchange of tickets between football clubs and fans by eliminating intermediaries and enabling direct peer-to-peer transactions. Its decentralized nature ensures transparency, immutability, and equal access, creating a level playing field for all participants and empowering businesses with fairness.",
    icon: <BusinessIcon width={300} height={150} />,
  },
]

export default IconData
