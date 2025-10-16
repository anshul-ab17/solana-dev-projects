import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { airdrop } from "../airdrop";
import { showBalance } from "../showBalance";

export const transferSol =async(from:Keypair, to:PublicKey, amount:number)=>{
    const conn = new Connection("http://localhost:8899","confirmed");
    const transaction = new Transaction();

    const instruction = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey:to,
        lamports: LAMPORTS_PER_SOL* amount
    })

    transaction.add(instruction);
    await sendAndConfirmTransaction(conn, transaction,[from])
}

const secret = Uint8Array.from([108,179,177,118,94,202,199,166,173,104,133,137,142,138,239,89,78,243,183,184,145,235,216,50,76,30,221,183,83,101,15,2,42,128,214,118,51,170,52,232,98,122,58,69,43,247,84,189,209,119,255,29,43,59,110,146,78,14,183,78,240,15,101,102])
const fromKeyPair = Keypair.fromSecretKey(secret);
const toPublicKey = new PublicKey("BkzbMFuMm9CWmQfnEZdPdS2h9fVPZAfBVy6jM22VoW1j");

(async()=>{
    await airdrop(fromKeyPair.publicKey, 5);
    const initBalance = await showBalance(fromKeyPair.publicKey);
    console.log(`Initial balance of from wallet: ${initBalance}`);
    const initBalanceTo = await showBalance(toPublicKey);
    console.log(`Initial balance of from wallet: ${initBalanceTo}`);

    await transferSol(fromKeyPair, toPublicKey, 2);
    const transferedBalance = await showBalance(fromKeyPair.publicKey);
    console.log(`Initial balance of from wallet: ${transferedBalance}`);
    const transferedBalanceTo = await showBalance(toPublicKey);
    console.log(`Initial balance of from wallet: ${transferedBalanceTo}`);

})()