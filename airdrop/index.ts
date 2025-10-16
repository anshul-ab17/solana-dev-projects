import * as dotenv from "dotenv";
dotenv.config();

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const RPC_URL = process.env.RPC_URL || "http://localhost:8899";
const COMMITMENT = (process.env.COMMITMENT as any) || "confirmed";
const DEFAULT_AMOUNT = Number(process.env.AIRDROP_AMOUNT) || 1;
const DEFAULT_PUBLIC_KEY = process.env.DEFAULT_PUBLIC_KEY!;



export const airdrop = async (address: string = DEFAULT_PUBLIC_KEY, amount: number = DEFAULT_AMOUNT) => {
  try {
    const publicKey = new PublicKey(address);
    const connection = new Connection(RPC_URL, COMMITMENT);

    console.log(`Requesting airdrop of ${amount} SOL to ${address}...`);

    const signature = await connection.requestAirdrop(
      publicKey,
      amount * LAMPORTS_PER_SOL
    );
    

    await connection.confirmTransaction(signature, COMMITMENT);

    console.log(`Airdropped ${amount} SOL successfully!`);
  } catch (error) {
    console.error("Airdrop failed:", error);
  }
};



