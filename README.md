# I-RECFraction
Fractionalize renewable energy certificates
# I-REC Fractionalization dApp

## Overview

This project is a decentralized application (dApp) prototype demonstrating the fractionalization of I-REC (International Renewable Energy Certificates) using blockchain technology. I-REC certificates are unique digital assets (NFTs) representing 1 megawatt-hour (MWh) of renewable energy. The dApp allows users to view these certificates, split them into smaller tradable fractions (ERC-20 tokens), purchase fractions with testnet Ether, and track their ownership—all powered by Ethereum smart contracts and a React-based frontend.

The goal is to make renewable energy certificates more accessible by breaking them into affordable pieces, like slicing a pizza so more people can have a share. This is a conceptual demo built for a two-day take-home test, deployable on an Ethereum testnet (e.g., Sepolia).

---

## Features

### Smart Contracts
The dApp relies on three Solidity smart contracts:

1. **`IRecCertificate` (ERC-721)**:
   - Represents I-REC certificates as unique NFTs.
   - Functions: Mint, transfer, burn, update metadata, and track ownership.
   - Each NFT corresponds to 1 MWh of renewable energy with metadata (e.g., source: solar/wind).

2. **`FractionalToken` (ERC-20)**:
   - Creates fractional tokens (`F-IREC`) representing parts of an I-REC certificate.
   - Functions: Mint, purchase with Ether, burn (user-controlled), and reclaim the NFT when all tokens are burned.
   - Caps total supply (e.g., 1,000 tokens per certificate, where 1 token = 0.001 MWh).

3. **`Fractionalizer`**:
   - Manages fractionalization by deploying `FractionalToken` contracts for specific I-REC NFTs.
   - Functions: Fractionalize an NFT, deposit certificates, and mint initial tokens.

### Frontend
The React-based frontend, styled with TailwindCSS, includes four pages:

1. **Home Page**:
   - Displays an overview of an I-REC certificate as a card with mock data (ID, source, total MWh).
   - Provides a high-level introduction to the dApp’s purpose.

2. **Fractionalize Page**:
   - Form to fractionalize an I-REC NFT into 1,000 ERC-20 tokens.
   - Triggers a Web3 contract call via Ethers.js to the `Fractionalizer` contract.
   - Shows a success message with the number of fractions created.

3. **Buy Fractions Page**:
   - Connects to MetaMask for wallet interaction.
   - Allows users to input a number of tokens to buy with testnet Ether.
   - Displays the user’s current `F-IREC` token balance.

4. **My Fractions Page**:
   - Shows the user’s wallet address and their `F-IREC` token balance.
   - Updates dynamically based on wallet connection.

### Additional UI Components
- **Navbar**: Responsive navigation bar with links to all pages and a “Connect Wallet” button.
- **Web3 Integration**: Uses Ethers.js for wallet connection and contract interactions.

---

## Technical Stack

- **Blockchain**: Ethereum (tested locally with Hardhat, deployable to testnets like Sepolia).
- **Smart Contracts**: Solidity `^0.8.18`, OpenZeppelin contracts (ERC-721, ERC-20, Ownable).
- **Testing**: Hardhat, Mocha/Chai, ethers.js.
- **Frontend**: React, TailwindCSS, React Router, Ethers.js.
- **Development Tools**: Node.js, npm, Hardhat.

---

## Project Structure
/project-root
├── /contracts/              # Solidity smart contracts
│   ├── IRecCertificate.sol
│   ├── FractionalToken.sol
│   └── Fractionalizer.sol
├── /test/                   # Hardhat test files
│   └── FractionalizationTest.js
├── /src/                    # Frontend source code
│   ├── /components/         # Reusable UI components
│   │   ├── Navbar.js        # Responsive navigation bar
│   │   └── CertificateCard.js # Card for displaying I-REC info
│   ├── /pages/              # Page components
│   │   ├── Home.js          # Home page with certificate overview
│   │   ├── Fractionalize.js  # Fractionalization form page
│   │   ├── BuyFractions.js  # Token purchase page
│   │   └── MyFractions.js   # User token balance page
│   ├── /utils/              # Web3 utilities
│   │   ├── web3.js          # Wallet connection and contract setup
│   │   ├── IRecCertificateABI.json # ABI for IRecCertificate
│   │   ├── FractionalTokenABI.json # ABI for FractionalToken
│   │   └── FractionalizerABI.json  # ABI for Fractionalizer
│   ├── App.js               # Main app with routing
│   └── index.css            # TailwindCSS setup
├── hardhat.config.js        # Hardhat configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file


---

## Smart Contract Details

### `IRecCertificate`
- **Purpose**: Manages I-REC certificates as NFTs.
- **Key Functions**:
  - `mint(address to, string memory tokenURI)`: Creates a new certificate (owner-only).
  - `transferCertificate(address to, uint256 tokenId)`: Transfers an NFT.
  - `burnCertificate(uint256 tokenId)`: Destroys an NFT (owner-only).
  - `getTokenURI(uint256 tokenId)`: Retrieves metadata.
  - `tokensOwnedBy(address)`: Tracks ownership count.

### `FractionalToken`
- **Purpose**: Represents fractional shares of an I-REC certificate as ERC-20 tokens.
- **Key Functions**:
  - `mint(address to, uint256 amount, uint256 certificateTokenId)`: Mints tokens (owner-only).
  - `purchase(uint256 amount, uint256 certificateTokenId)`: Buys tokens with Ether.
  - `burn(uint256 amount, uint256 certificateTokenId)`: Burns tokens and reclaims NFT if all burned.
  - `balanceOf(address)`: Checks token balance (ERC-20 standard).

### `Fractionalizer`
- **Purpose**: Coordinates fractionalization by deploying `FractionalToken` contracts.
- **Key Functions**:
  - `fractionalize(address certificateAddress, uint256 tokenId, uint256 totalSupplyLimit)`: Deploys a new `FractionalToken` contract (owner-only).
  - `depositCertificate(address certificateAddress, uint256 tokenId)`: Locks an NFT in the contract.
  - `mintFractionalTokens(address certificateAddress, uint256 tokenId, address to, uint256 amount)`: Mints initial tokens (owner-only).

### Interactions
- An I-REC NFT is minted via `IRecCertificate`, deposited into `Fractionalizer`, and fractionalized into a `FractionalToken` contract.
- Users purchase or receive `F-IREC` tokens, which they can trade or burn to reclaim the NFT.

---

## Frontend Details

### Dependencies
- `react`, `react-dom`: Core React libraries.
- `react-router-dom`: For page navigation.
- `ethers`: Web3 library for Ethereum interaction.
- `tailwindcss`: Styling framework.

### Pages and Components
1. **Home Page (`Home.js`)**:
   - Displays a `CertificateCard` component with mock data (e.g., ID: 0, Source: Solar, MWh: 1).
   - Static for demo purposes; could fetch real NFT data via `getTokenURI`.

2. **Fractionalize Page (`Fractionalize.js`)**:
   - Form with fields: Certificate ID (default 0), Total Fractions (default 1,000).
   - Button triggers `fractionalizer.fractionalize` and `mintFractionalTokens` calls.
   - Shows a success toast with “1,000 fractions created”.

3. **Buy Fractions Page (`BuyFractions.js`)**:
   - Connects to MetaMask via `web3.js`.
   - Input for number of tokens to buy and certificate ID.
   - Displays token balance and calls `fractionalToken.purchase` with Ether.
   - Updates balance post-purchase.

4. **My Fractions Page (`MyFractions.js`)**:
   - Shows connected wallet address and `F-IREC` balance via `fractionalToken.balanceOf`.

5. **Navbar (`Navbar.js`)**:
   - Responsive links to Home, Fractionalize, Buy Fractions, and My Fractions.
   - “Connect Wallet” button triggers MetaMask connection.

### Web3 Integration (`web3.js` in `/utils/`):
- Connects to MetaMask and initializes contract instances using ABIs and deployed addresses.
- Example:
  ```javascript
  import { ethers } from "ethers";
  import IRecCertificateABI from "./IRecCertificateABI.json";

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const certificate = new ethers.Contract("0x...deployed_address...", IRecCertificateABI, signer);
    return { provider, signer, certificate };
  };


---

## Smart Contract Details

### `IRecCertificate`
- **Purpose**: Manages I-REC certificates as NFTs.
- **Key Functions**:
  - `mint(address to, string memory tokenURI)`: Creates a new certificate (owner-only).
  - `transferCertificate(address to, uint256 tokenId)`: Transfers an NFT.
  - `burnCertificate(uint256 tokenId)`: Destroys an NFT (owner-only).
  - `getTokenURI(uint256 tokenId)`: Retrieves metadata.
  - `tokensOwnedBy(address)`: Tracks ownership count.

### `FractionalToken`
- **Purpose**: Represents fractional shares of an I-REC certificate as ERC-20 tokens.
- **Key Functions**:
  - `mint(address to, uint256 amount, uint256 certificateTokenId)`: Mints tokens (owner-only).
  - `purchase(uint256 amount, uint256 certificateTokenId)`: Buys tokens with Ether.
  - `burn(uint256 amount, uint256 certificateTokenId)`: Burns tokens and reclaims NFT if all burned.
  - `balanceOf(address)`: Checks token balance (ERC-20 standard).

### `Fractionalizer`
- **Purpose**: Coordinates fractionalization by deploying `FractionalToken` contracts.
- **Key Functions**:
  - `fractionalize(address certificateAddress, uint256 tokenId, uint256 totalSupplyLimit)`: Deploys a new `FractionalToken` contract (owner-only).
  - `depositCertificate(address certificateAddress, uint256 tokenId)`: Locks an NFT in the contract.
  - `mintFractionalTokens(address certificateAddress, uint256 tokenId, address to, uint256 amount)`: Mints initial tokens (owner-only).

### Interactions
- An I-REC NFT is minted via `IRecCertificate`, deposited into `Fractionalizer`, and fractionalized into a `FractionalToken` contract.
- Users purchase or receive `F-IREC` tokens, which they can trade or burn to reclaim the NFT.

---

## Frontend Details

### Dependencies
- `react`, `react-dom`: Core React libraries.
- `react-router-dom`: For page navigation.
- `ethers`: Web3 library for Ethereum interaction.
- `tailwindcss`: Styling framework.

### Pages and Components
1. **Home Page (`Home.js`)**:
   - Displays a `CertificateCard` component with mock data (e.g., ID: 0, Source: Solar, MWh: 1).
   - Static for demo purposes; could fetch real NFT data via `getTokenURI`.

2. **Fractionalize Page (`Fractionalize.js`)**:
   - Form with fields: Certificate ID (default 0), Total Fractions (default 1,000).
   - Button triggers `fractionalizer.fractionalize` and `mintFractionalTokens` calls.
   - Shows a success toast with “1,000 fractions created”.

3. **Buy Fractions Page (`BuyFractions.js`)**:
   - Connects to MetaMask via `web3.js`.
   - Input for number of tokens to buy and certificate ID.
   - Displays token balance and calls `fractionalToken.purchase` with Ether.
   - Updates balance post-purchase.

4. **My Fractions Page (`MyFractions.js`)**:
   - Shows connected wallet address and `F-IREC` balance via `fractionalToken.balanceOf`.

5. **Navbar (`Navbar.js`)**:
   - Responsive links to Home, Fractionalize, Buy Fractions, and My Fractions.
   - “Connect Wallet” button triggers MetaMask connection.

### Web3 Integration (`web3.js` in `/utils/`):
- Connects to MetaMask and initializes contract instances using ABIs and deployed addresses.
- Example:
  ```javascript
  import { ethers } from "ethers";
  import IRecCertificateABI from "./IRecCertificateABI.json";

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const certificate = new ethers.Contract("0x...deployed_address...", IRecCertificateABI, signer);
    return { provider, signer, certificate };
  };
  Update hardhat.config.js with testnet details and private key.
Run: npx hardhat run scripts/deploy.js --network sepolia.
Save deployed addresses for frontend use.
Frontend
### Install Dependencies:

npm install react react-dom react-router-dom ethers tailwindcss
### Initialize TailwindCSS:

Copy
npx tailwindcss init
Configure tailwind.config.js and add directives to index.css.
Update Contract Addresses:
Copy deployed addresses to /utils/ files (e.g., web3.js).
Run the App:

npm start
Open http://localhost:3000 in a browser with MetaMask.
### Testing
Smart Contract Tests
Located in test/FractionalizationTest.js.
Covers minting, transferring, fractionalizing, purchasing, and burning.
Run with npx hardhat test.
Frontend Testing
Manual testing recommended:
### Connect MetaMask on Sepolia testnet.
Mint an I-REC NFT, fractionalize it, buy tokens, and check balances.
Unit tests could be added with Jest/React Testing Library (not included here due to time scope).
Notes and Future Improvements
Purchase Mechanism: Added as a payable function in FractionalToken for testnet Ether purchases, exceeding the minimum “own” requirement.
Scalability: Could add batch operations (e.g., fractionalize multiple NFTs) or role-based access instead of Ownable.
UI Enhancements: Real-time NFT metadata fetching or a token marketplace could be added.
Security: Contracts use OpenZeppelin’s audited libraries; further audits recommended for production.
### Conclusion
This dApp successfully demonstrates I-REC certificate fractionalization per the take-home test requirements. It combines a robust smart contract system with a clean, functional frontend, ready for testnet deployment. For questions or feedback, feel free to reach out!




