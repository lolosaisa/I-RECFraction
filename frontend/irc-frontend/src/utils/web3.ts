import { ethers } from "ethers";
import { IRecFractionalizer__factory } from "./contracts/typechain";
import { toast } from "@/components/ui/sonner";

// Mock contract address - would be replaced with actual deployed contract
export const IREC_FRACTIONALIZER_ADDRESS = "0x0000000000000000000000000000000000000000";

// Singleton provider and contract instances
let provider: ethers.BrowserProvider | null = null;
let signer: ethers.Signer | null = null;
let fractionalizer: ethers.Contract | null = null;

export async function connectWallet(): Promise<string | null> {
  if (!window.ethereum) {
    toast.error("MetaMask not detected. Please install MetaMask to connect.");
    return null;
  }

  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    
    if (accounts.length === 0) {
      toast.error("No accounts found. Please unlock MetaMask and try again.");
      return null;
    }

    signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    // Initialize contract
    fractionalizer = IRecFractionalizer__factory.connect(
      IREC_FRACTIONALIZER_ADDRESS,
      signer
    );
    
    toast.success("Wallet connected successfully");
    return address;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    toast.error("Failed to connect wallet. Please try again.");
    return null;
  }
}

export async function getWalletBalance(tokenAddress: string): Promise<string> {
  if (!signer) {
    toast.error("Wallet not connected");
    return "0";
  }

  try {
    const erc20 = new ethers.Contract(
      tokenAddress,
      [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
      ],
      signer
    );
    
    const address = await signer.getAddress();
    const balance = await erc20.balanceOf(address);
    const decimals = await erc20.decimals();
    
    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return "0";
  }
}

export async function fractionalizeCertificate(
  certificateId: string,
  tokenName: string,
  tokenSymbol: string,
  totalSupply: number
): Promise<string | null> {
  if (!signer || !fractionalizer) {
    toast.error("Wallet not connected");
    return null;
  }

  try {
    console.log(`Fractionalizing certificate ${certificateId} into ${totalSupply} tokens`);
    
    // This would be the actual contract call in production
    // const tx = await fractionalizer.fractionalize(certificateId, tokenName, tokenSymbol, totalSupply);
    // await tx.wait();
    
    // For demo, we'll return a mock token address
    const mockTokenAddress = "0x1234567890123456789012345678901234567890";
    
    toast.success("Certificate fractionalized successfully");
    return mockTokenAddress;
  } catch (error) {
    console.error("Error fractionalizing certificate:", error);
    toast.error("Failed to fractionalize certificate");
    return null;
  }
}

export async function buyFractions(
  tokenAddress: string, 
  amount: number,
  price: number
): Promise<boolean> {
  if (!signer || !fractionalizer) {
    toast.error("Wallet not connected");
    return false;
  }

  try {
    console.log(`Buying ${amount} fractions at price ${price} ETH each`);
    
    // This would be the actual contract call in production
    // const tx = await fractionalizer.buyFractions(tokenAddress, amount, { value: ethers.parseEther((amount * price).toString()) });
    // await tx.wait();
    
    toast.success(`Successfully purchased ${amount} fractions`);
    return true;
  } catch (error) {
    console.error("Error buying fractions:", error);
    toast.error("Failed to buy fractions");
    return false;
  }
}
