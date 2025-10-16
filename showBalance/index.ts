import {Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"

export const showBalance = async(publicKey:PublicKey) => {
    const connection = new Connection("http://localhost:8899","confirmed");
    const response = await connection.getBalance(publicKey);
    return response/LAMPORTS_PER_SOL;
}