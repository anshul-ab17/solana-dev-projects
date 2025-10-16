import {Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"

export const showBalance = async(publicKey:PublicKey) => {

    const connection = new Connection("http://localhost:8899");
    const response = await connection.getAccountInfo(publicKey);
    return response.lamports/LAMPORTS_PER_SOL;
}

( async() => {
    const publicKey= "BkzbMFuMm9CWmQfnEZdPdS2h9fVPZAfBVy6jM22VoW1j"
    const balance = await showBalance(new PublicKey(publicKey))
    console.log(` for the key ${publicKey} is ${balance}`);

})