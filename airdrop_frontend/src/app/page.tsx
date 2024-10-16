'use client';

import AirdropABI from '../../Airdrop.json';

import React, { useState } from "react";
import { ConnectButton, useActiveAccount, useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { toWei } from "thirdweb/utils";
import { client } from "./client";
import Image from 'next/image'
import cat from "../../public/cat.png"

export default function Home() {
  const [addresses, setAddresses] = useState("");
  const [amt, setAmt] = useState("");
  const activeAccount = useActiveAccount();

  const { mutateAsync: sendTransaction } = useSendTransaction();


  const contract = getContract({
    client,                          
    chain: sepolia,                  
    address: "0x6E99d5E4995D46ca929Dc5dD25d77f5d07968E42", 
    abi: AirdropABI.abi,           
  });


  const handleClick = async () => {
    try {
      if (!addresses || !amt || !activeAccount) {
        alert("Please provide valid addresses, amount, and connect your wallet.");
        return;
      }
  
      const recipients = addresses.split(",").map(addr => addr.trim());
  
      console.log("Active account:", activeAccount.address);
      console.log("Sending airdrop to:", recipients);
      console.log("Amount per recipient (Ether):", amt);
      
      const weiAmount = toWei(amt);
      const totalEth = (parseFloat(amt) * recipients.length).toString();

      
      console.log("Total Wei value:", totalEth);
  
      const transaction = prepareContractCall({
        contract,
        method: "airdrop",
        params: [recipients, weiAmount],  
        value: toWei(totalEth)
      });

      const result = await sendTransaction(transaction);
  
      console.log("Transaction sent:", result);
    } catch (error) {
      console.error("Error sending transaction:", error);
      alert("Transaction failed. Check the console for details.");
    }
  };

  return (
    <main className="flex flex-col items-center p-5 m-5 space-y-8">
      <div className="flex justify-center">
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Airdrop App",
            url: "https://example.com",
          }}
        />
      </div>

      <input
        className="w-3/5 border text-large px-3"
        onChange={e => setAddresses(e.target.value)}
        placeholder="Enter addresses, comma-separated"
      />
      <input
        className="w-3/5 border text-large px-3"
        onChange={e => setAmt(e.target.value)}
        placeholder="Enter amount"
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Airdrop
      </button>

      <div className="flex flex-col items-center">
        <h2 className="text-3xl text-blue-400 font-bold">vote for team surya!!!</h2>
        <Image src={cat} width={1000} height={100} alt="cat" />
      </div>
    </main>
  );
}
