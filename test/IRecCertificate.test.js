describe("IRecCertificate", function () {
    it("should mint a new certificate", async function () {
      await certificate.mint(user1.address, "https://metadata.com/1");
      expect(await certificate.ownerOf(0)).to.equal(user1.address);
      expect(await certificate.getTokenURI(0)).to.equal("https://metadata.com/1");
      expect(await certificate.tokensOwnedBy(user1.address)).to.equal(1);
    });
  
    it("should transfer a certificate", async function () {
      await certificate.mint(user1.address, "https://metadata.com/1");
      await certificate.connect(user1).transferCertificate(user2.address, 0);
      expect(await certificate.ownerOf(0)).to.equal(user2.address);
      expect(await certificate.tokensOwnedBy(user1.address)).to.equal(0);
      expect(await certificate.tokensOwnedBy(user2.address)).to.equal(1);
    });
  
    it("should burn a certificate", async function () {
      await certificate.mint(user1.address, "https://metadata.com/1");
      await certificate.connect(user1).burnCertificate(0);
      await expect(certificate.ownerOf(0)).to.be.revertedWith("ERC721: invalid token ID");
      expect(await certificate.tokensOwnedBy(user1.address)).to.equal(0);
    });
  
    it("should update token URI by owner", async function () {
      await certificate.mint(user1.address, "https://metadata.com/1");
      await certificate.updateTokenURI(0, "https://metadata.com/2");
      expect(await certificate.getTokenURI(0)).to.equal("https://metadata.com/2");
    });
  
    it("should fail to mint to zero address", async function () {
      await expect(certificate.mint(ethers.constants.AddressZero, "https://metadata.com/1")).to.be.revertedWith(
        "Cannot mint to zero address"
      );
    });
  });