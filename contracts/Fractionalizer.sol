// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IRecCertificate.sol";
import "./FractionalToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Fractionalizer is Ownable {
    // Maps an I-REC certificate contract address and token ID to its fractional token contract
    mapping(address => mapping(uint256 => address)) public certificateTokenToFractionalToken;

    // Events for transparency
    event CertificateFractionalized(address indexed certificateAddress, uint256 indexed tokenId, address fractionalToken);
    event FractionalTokensMinted(address indexed certificateAddress, uint256 indexed tokenId, address to, uint256 amount);
    event FractionalTokensBurned(address indexed certificateAddress, uint256 indexed tokenId, address from, uint256 amount);

    // Constructor to set the initial owner
    constructor() Ownable(msg.sender) {}

    // Fractionalize an I-REC certificate token into fractional tokens
    function fractionalize(address certificateAddress, uint256 tokenId, uint256 totalSupplyLimit) external onlyOwner {
        require(certificateAddress != address(0), "Invalid certificate address");
        require(certificateTokenToFractionalToken[certificateAddress][tokenId] == address(0), "Already fractionalized");

        IRecCertificate certificate = IRecCertificate(certificateAddress);
        require(certificate.ownerOf(tokenId) == address(this), "Fractionalizer must own the certificate");

        // Deploy a new FractionalToken contract
        FractionalToken fractionalToken = new FractionalToken(certificateAddress, totalSupplyLimit);
        certificateTokenToFractionalToken[certificateAddress][tokenId] = address(fractionalToken);

        emit CertificateFractionalized(certificateAddress, tokenId, address(fractionalToken));
    }

    // Deposit an I-REC certificate to the Fractionalizer for fractionalization
    function depositCertificate(address certificateAddress, uint256 tokenId) external {
        IRecCertificate certificate = IRecCertificate(certificateAddress);
        certificate.transferCertificate(address(this), tokenId);
    }

    // Mint new fractional tokens for a specific I-REC certificate token
    function mintFractionalTokens(address certificateAddress, uint256 tokenId, address to, uint256 amount) external onlyOwner {
        require(certificateTokenToFractionalToken[certificateAddress][tokenId] != address(0), "Certificate not fractionalized");
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");

        FractionalToken fractionalToken = FractionalToken(certificateTokenToFractionalToken[certificateAddress][tokenId]);
        fractionalToken.mint(to, amount, tokenId); // Mint with tokenId parameter

        emit FractionalTokensMinted(certificateAddress, tokenId, to, amount);
    }

    // Note: No burn function here as burning is user-controlled in FractionalToken
}