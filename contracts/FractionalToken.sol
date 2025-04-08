// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IRecCertificate.sol"; // Importing the IRecCertificate contract

contract FractionalToken is ERC20, Ownable {
    uint256 public totalSupplyLimit;
    IRecCertificate public certificateContract; // Reference to IRecCertificate contract

    mapping(uint256 => bool) public isTokenFractionalized;

    event TokensMinted(address indexed to, uint256 amount, uint256 certificateTokenId);
    event TokensBurned(address indexed account, uint256 amount, uint256 certificateTokenId);

    constructor(address _certificateAddress, uint256 _totalSupplyLimit) 
        ERC20("Fractional I-REC Token", "F-IREC") 
    {
        require(_certificateAddress != address(0), "Invalid certificate address");
        certificateContract = IRecCertificate(_certificateAddress);
        totalSupplyLimit = _totalSupplyLimit;
    }

    function mint(address to, uint256 amount, uint256 certificateTokenId) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Amount must be greater than zero");
        require(totalSupply() + amount <= totalSupplyLimit, "Exceeds supply limit");
        require(!isTokenFractionalized[certificateTokenId], "Certificate already fractionalized");
        require(certificateContract.ownerOf(certificateTokenId) == address(this), "Contract must own the certificate");

        _mint(to, amount);
        isTokenFractionalized[certificateTokenId] = true;
        emit TokensMinted(to, amount, certificateTokenId);
    }

    function burn(uint256 amount, uint256 certificateTokenId) external {
        require(amount > 0, "Amount must be greater than zero");
        require(isTokenFractionalized[certificateTokenId], "Certificate not fractionalized");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount, certificateTokenId);

        if (totalSupply() == 0) {
            certificateContract.transferCertificate(owner(), certificateTokenId);
            isTokenFractionalized[certificateTokenId] = false;
        }
    }

    function updateTotalSupplyLimit(uint256 newLimit) external onlyOwner {
        require(newLimit > totalSupply(), "New limit must exceed current supply");
        totalSupplyLimit = newLimit;
    }

    function depositCertificate(uint256 tokenId) external {
        require(!isTokenFractionalized[tokenId], "Certificate already fractionalized");
        certificateContract.transferCertificate(address(this), tokenId);
    }
}