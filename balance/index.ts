import {Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"
import { airdrop } from "../airdrop";


export const balance = async(publicKey:PublicKey) => {

    const connection = new Connection("http://localhost:8899","confirmed");
    // getBalance is safer and returns 0 if the account is empty, and the correct amount once updated,
    //getAccountInfo may return null if the account isn’t funded yet.

    // const response = await connection.getAccountInfo(publicKey);
    // return response.lamports/LAMPORTS_PER_SOL;
    const response = await connection.getBalance(publicKey);
    return response/LAMPORTS_PER_SOL;
}

( async() => {
    const publicKey= "BkzbMFuMm9CWmQfnEZdPdS2h9fVPZAfBVy6jM22VoW1j"
    const walletBalance = await balance(new PublicKey(publicKey))
    console.log(`balance for the key ${publicKey} is ${walletBalance} SOL`); 
    await airdrop(new PublicKey(publicKey), 5);

    // small delay:
    await new Promise(res => setTimeout(res, 2000));

    const updatedBalance=await balance(new PublicKey(publicKey));
    console.log(`update balance : ${updatedBalance} SOL`);
})()

