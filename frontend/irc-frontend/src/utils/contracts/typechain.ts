// This is a simplified mock factory - in a real project, I would generate typechain files from your contract ABI
export const IRecFractionalizer__factory = {
    connect(address: string, signerOrProvider: ethers.Signer | ethers.Provider) {
      return new ethers.Contract(
        address,
        [
          "function fractionalize(string certificateId, string tokenName, string tokenSymbol, uint256 totalSupply) returns (address)",
          "function buyFractions(address tokenAddress, uint256 amount) payable returns (bool)",
          "function getTokenInfo(address tokenAddress) view returns (string, string, uint256, uint256)",
        ],
        signerOrProvider
      );
    }
  };
  
  // Add ethers.js type extensions for TypeScript
  declare global {
    interface Window {
      ethereum: any;
    }
  }
  