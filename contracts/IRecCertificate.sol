// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IRecCertificate is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => uint256) public tokensOwnedBy;

    // Event to log token burns
    event CertificateBurned(uint256 indexed tokenId, address indexed owner);

    constructor() ERC721("Renewable Energy Certificate", "I-REC") {}

    // Mint a new I-REC certificate (NFT) for a specific address
    function mint(address to, string memory tokenURI) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        _safeMint(to, nextTokenId);                // Mint the new token
        _setTokenURI(nextTokenId, tokenURI);       // Set the metadata URI
        tokensOwnedBy[to] += 1;                    // Update ownership count
        nextTokenId++;                             // Increment token ID
    }

    // Transfer ownership of the I-REC NFT
    function transferCertificate(address to, uint256 tokenId) external {
        require(to != address(0), "Cannot transfer to zero address");
        address from = msg.sender;
        safeTransferFrom(from, to, tokenId);       // Transfer the token
        tokensOwnedBy[from] -= 1;                  // Decrease sender's count
        tokensOwnedBy[to] += 1;                    // Increase receiver's count
    }

    // Burn an I-REC certificate (destroy it)
    function burnCertificate(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only token owner can burn");
        _burn(tokenId);                            // Burn the token
        tokensOwnedBy[msg.sender] -= 1;            // Update ownership count
        emit CertificateBurned(tokenId, msg.sender); // Emit burn event
    }

    // Update the token URI (only by owner)
    function updateTokenURI(uint256 tokenId, string memory newTokenURI) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _setTokenURI(tokenId, newTokenURI);       // Update the metadata URI
    }

    // Get token URI by token ID
    function getTokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenURI(tokenId);                  // Retrieve the token URI
    }

    // Override transfer hook to update ownership tracking
    function _transfer(address from, address to, uint256 tokenId) internal override {
        super._transfer(from, to, tokenId);
        tokensOwnedBy[from] -= 1;                  // Decrease sender's count
        tokensOwnedBy[to] += 1;                    // Increase receiver's count
    }
}