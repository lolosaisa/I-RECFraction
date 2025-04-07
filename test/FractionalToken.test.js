describe("FractionalToken", function () {
    it("should mint tokens when certificate is owned", async function () {
      await certificate.mint(owner.address, "https://metadata.com/1");
      await certificate.transferCertificate(fractionalToken.address, 0);
      await fractionalToken.mint(user1.address, 500, 0);
      expect(await fractionalToken.balanceOf(user1.address)).to.equal(500);
      expect(await fractionalToken.totalSupply()).to.equal(500);
      expect(await fractionalToken.isTokenFractionalized(0)).to.be.true;
    });
  
    it("should allow users to purchase tokens with Ether", async function () {
      await certificate.mint(owner.address, "https://metadata.com/1");
      await certificate.transferCertificate(fractionalToken.address, 0);
      const price = await fractionalToken.tokenPrice();
      const amount = 100;
      await fractionalToken.connect(user1).purchase(amount, 0, { value: price.mul(amount) });
      expect(await fractionalToken.balanceOf(user1.address)).to.equal(amount);
      expect(await ethers.provider.getBalance(fractionalToken.address)).to.equal(0); // Ether sent to owner
    });
  
    it("should allow users to burn tokens and reclaim certificate if all burned", async function () {
      await certificate.mint(owner.address, "https://metadata.com/1");
      await certificate.transferCertificate(fractionalToken.address, 0);
      await fractionalToken.mint(user1.address, 500, 0);
      await fractionalToken.connect(user1).burn(500, 0);
      expect(await fractionalToken.balanceOf(user1.address)).to.equal(0);
      expect(await fractionalToken.totalSupply()).to.equal(0);
      expect(await certificate.ownerOf(0)).to.equal(owner.address); // Certificate returned
      expect(await fractionalToken.isTokenFractionalized(0)).to.be.false;
    });
  
    it("should fail to purchase if insufficient Ether", async function () {
      await certificate.mint(owner.address, "https://metadata.com/1");
      await certificate.transferCertificate(fractionalToken.address, 0);
      await expect(
        fractionalToken.connect(user1).purchase(100, 0, { value: 100 }) // Too little Ether
      ).to.be.revertedWith("Insufficient Ether sent");
    });
  
    it("should fail to mint if certificate not owned", async function () {
      await certificate.mint(owner.address, "https://metadata.com/1");
      await expect(fractionalToken.mint(user1.address, 500, 0)).to.be.revertedWith(
        "Contract must own the certificate"
      );
    });
  });