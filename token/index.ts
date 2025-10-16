import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { airdrop } from "../airdrop";

const createMint = async (mintWallet: Keypair) => {
  const connection = new Connection("http://localhost:8899", "confirmed");
  const createToken = await Token.createMint(
    connection,
    mintWallet,
    mintWallet.publicKey,
    null,
    8,
    TOKEN_PROGRAM_ID
  );
  return createToken.publicKey;
};

const transferToken = async (tokenAddress: PublicKey, mintWallet: Keypair, receiver: PublicKey) => {
  const connection = new Connection("http://localhost:8899", "confirmed");
  const createToken = new Token(connection, tokenAddress, TOKEN_PROGRAM_ID, mintWallet);

  const mintTokenAccount = await createToken.getOrCreateAssociatedAccountInfo(mintWallet.publicKey);
  await createToken.mintTo(mintTokenAccount.address, mintWallet.publicKey, [], 1000000000);

  const receiverTokenAccount = await createToken.getOrCreateAssociatedAccountInfo(receiver);
  console.log(`ReceiverTokenAccount address : ${receiverTokenAccount.address}`);

  const transaction = new Transaction().add(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      mintTokenAccount.address,
      receiverTokenAccount.address,
      mintWallet.publicKey,
      [],
      1000000000
    )
  );

  await sendAndConfirmTransaction(connection, transaction, [mintWallet], { commitment: "confirmed" });
};

(async () => {
  const mintWallet = Keypair.generate();

  await airdrop(mintWallet.publicKey, 2);

  const createTokenAddress = await createMint(mintWallet);
  await transferToken(createTokenAddress, mintWallet, new PublicKey("BkzbMFuMm9CWmQfnEZdPdS2h9fVPZAfBVy6jM22VoW1j"));

  console.log(`Creator token address : ${createTokenAddress}`);
  console.log(`Mint wallet address : ${mintWallet.publicKey}`);
})();
