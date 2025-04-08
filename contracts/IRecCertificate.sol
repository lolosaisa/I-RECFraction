// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IRecCertificate is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => uint256) public tokensOwnedBy;

    event CertificateBurned(uint256 indexed tokenId, address indexed owner);

    constructor() ERC721("Renewable Energy Certificate", "I-REC") Ownable(msg.sender) {}

    function mint(address to, string memory tokenURI) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, tokenURI);
        tokensOwnedBy[to] += 1;
        nextTokenId++;
    }

    function transferCertificate(address to, uint256 tokenId) external {
        require(to != address(0), "Cannot transfer to zero address");
        safeTransferFrom(msg.sender, to, tokenId);
    }

    function burnCertificate(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only token owner can burn");
        _burn(tokenId);
        tokensOwnedBy[msg.sender] -= 1;
        emit CertificateBurned(tokenId, msg.sender);
    }

    function updateTokenURI(uint256 tokenId, string memory newTokenURI) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _setTokenURI(tokenId, newTokenURI);
    }

    function getTokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return tokenURI(tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId) internal override {
        super._transfer(from, to, tokenId);
        tokensOwnedBy[from] -= 1;
        tokensOwnedBy[to] += 1;
    }
}
