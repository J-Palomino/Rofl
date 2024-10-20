"use client";
import { useState } from "react";
import { GateFiDisplayModeEnum, GateFiSDK } from "@gatefi/js-sdk";
import CreateTokenModal from "./components/modals/CreateTokenModal";
import { useAccount, useReadContract, UseReadContractReturnType } from "wagmi";
import abi from "@/factoryabi.json";

import Image from "next/image";
import coin from "@/assets/ROOT-FOR-YOUR-COIN-GIF.gif";
import { FaGlobe, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import coinGif from "@/assets/rootstock-coin-2.gif";
import Link from "next/link";
import HowItWorksModal from "./components/modals/HowItWorks";

interface Token {
  creatorAddress: string;
  description: string;
  fundingRaised: bigint;
  name: string;
  symbol: string;
  tokenAddress: string;
  tokenImageUrl: string;
}

export default function Homepage() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState("recent");
  const [isCreateTokenModalOpen, setIsCreateTokenModalOpen] = useState(false);
  const [isHowItWorksModalOpen, setIsHowItWorksModalOpen] = useState(false);
  const result: UseReadContractReturnType<Token[]> = useReadContract({
    abi,
    address: "0x22d54E0Ae0fB27A754bb74eCA2b65C968d69B0bb",
    functionName: "getAllMemeTokens",
    account: address,
    chainId: 31,
  });

  console.log("getAllMemeTokens, ", result.data);

  const recentBuys = [
    {
      icon: "🚀",
      name: "RocketToken",
      price: "$0.0034",
      timestamp: "2 mins ago",
    },
    { icon: "🌙", name: "MoonCoin", price: "$1.23", timestamp: "5 mins ago" },
    {
      icon: "💎",
      name: "DiamondHands",
      price: "$0.567",
      timestamp: "10 mins ago",
    },
    { icon: "🦄", name: "UniSwap", price: "$5.67", timestamp: "15 mins ago" },
  ];

  const hotTokens = [
    {
      name: "EthereumMax",
      icon: "📈",
      stats: "+234% 24h",
      kyc: true,
      progress: 75,
    },
    {
      name: "BitMoon",
      icon: "🌕",
      stats: "+120% 24h",
      kyc: false,
      progress: 60,
    },
    {
      name: "DogeCoin",
      icon: "🐕",
      stats: "+45% 24h",
      kyc: true,
      progress: 90,
    },
    {
      name: "SafeMars",
      icon: "🔴",
      stats: "+80% 24h",
      kyc: false,
      progress: 40,
    },
    { name: "BNB", icon: "🟡", stats: "+10% 24h", kyc: true, progress: 95 },
    { name: "Cardano", icon: "🔷", stats: "+25% 24h", kyc: true, progress: 85 },
  ];

  const LoadingSkeleton = () => (
    <div className="bg-[#252525] rounded-xl shadow-lg p-4 relative animate-pulse">
      <div className="flex gap-4 items-center pb-4 border-b border-gray-700 mb-4">
        <div className="w-24 h-24 bg-gray-700 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "recent" && (
            <section className="mb-6">
              <h2 className="text-3xl font-bold">New Launches</h2>
              <p className="text-white mb-4">
                Discover the next trending token, {" "}
                <span className="font-semibold">before everyone else!</span>
              </p>
              <div className="flex items-center gap-2 mb-6">
                <button className="bg-rosa text-black font-bold text-sm hover:bg-rosa transition-all duration-300 px-4 py-2 rounded-md shadow-md hover:shadow-lg"
                  onClick={() => setIsHowItWorksModalOpen(true)}
                >
                  How does it work?
                </button>
                <button className="bg-verdeFosfo text-black font-bold text-sm hover:bg-verdeFosfo transition-all duration-300 px-4 py-2 rounded-md shadow-md hover:shadow-lg ml-2"
                  onClick={() => setIsCreateTokenModalOpen(true)}
                >
                  Launch your token
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.isLoading ? (
                  // Display loading skeletons while data is loading
                  Array(4).fill(0).map((_, index) => (
                    <LoadingSkeleton key={index} />
                  ))
                ) : result.data &&
                  Array.isArray(result.data) &&
                  result.data.length > 0 ? (
                  [...result.data].reverse().map((token: Token, index: number) => (
                    <Link
                      href={`/token/${token.tokenAddress}`}
                      key={index}
                      className="bg-[#252525] rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-4 relative"
                    >
                      <div className="flex gap-4 items-center pb-4 border-b border-gray-700 mb-4">
                        {token.tokenImageUrl && token.tokenImageUrl !== "" && !token.tokenImageUrl.includes("ipfs://") && !token.tokenImageUrl.includes("google") ? (
                          <img
                            src={token.tokenImageUrl}
                            alt="Coin"
                            className="w-20 h-20 rounded-lg"
                          />
                        ) : (
                          <img
                            src={coinGif.src}
                            alt="Coin"
                            className="w-20 h-20 rounded-lg"
                          />
                        )}
                        <div className="">
                          <div className="text-xl font-semibold mb-1">
                            <span className="text-gray-400 mr-2 uppercase text-lg">
                              ${token.symbol}
                            </span>
                            {token.name}
                          </div>
                          <p className="text-gray-400 text-sm">
                            {token.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                      <p className="text-gray-400 text-sm">
                        created by: {token.creatorAddress.slice(0, 4)}...
                        {token.creatorAddress.slice(-4)}
                      </p>
                      <p className="text-gray-400 text-sm mb-2">
                        funding raised:{" "}
                        {token.fundingRaised > 0
                          ? (
                              Number(token.fundingRaised) / 1000000000000000000
                            ).toFixed(2)
                          : "0"}{" "}
                        RBTC
                      </p>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center justify-center gap-2">
                        <FaGlobe />
                        <FaTwitter />
                        <FaTelegramPlane />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>No tokens found</div>
                )}
              </div>
            </section>
          )}
          {activeTab === "hot" && (
            <section>
              <h2 className="text-3xl font-bold mb-6">Hot Tokens</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotTokens.slice().reverse().map((token, index) => (
                  <div
                    key={index}
                    className="bg-[#252525] p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-4xl">{token.icon}</div>
                      {token.kyc && (
                        <div className="bg-green-500 text-xs font-bold px-2 py-1 rounded-full">
                          KYC
                        </div>
                      )}
                    </div>
                    <div className="text-xl font-semibold mb-2">
                      {token.name}
                    </div>
                    <div className="text-green-500 font-bold mb-4">
                      {token.stats}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-orange-500 h-2.5 rounded-full"
                        style={{ width: `${token.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
      <CreateTokenModal
        isOpen={isCreateTokenModalOpen}
        onClose={() => setIsCreateTokenModalOpen(false)}
        onSubmit={() => {}}
      />
      {
        isHowItWorksModalOpen && (
          <HowItWorksModal
            toggleModal={() => setIsHowItWorksModalOpen(!isHowItWorksModalOpen)}
          />
        )
      }
    </div>
  );
}
