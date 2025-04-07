describe("Fractionalizer", function () {
  it("should fractionalize a certificate and mint tokens", async function () {
    await certificate.mint(owner.address, "https://metadata.com/1");
    await certificate.transferCertificate(fractionalizer.address, 0);
    await fractionalizer.fractionalize(certificate.address, 0, 1000);
    const tokenAddress = await fractionalizer.certificateTokenToFractionalToken(certificate.address, 0);
    const newFractionalToken = await ethers.getContractAt("FractionalToken", tokenAddress);

    await fractionalizer.mintFractionalTokens(certificate.address, 0, user1.address, 500);
    expect(await newFractionalToken.balanceOf(user1.address)).to.equal(500);
    expect(await newFractionalToken.totalSupply()).to.equal(500);
  });

  it("should allow depositing a certificate", async function () {
    await certificate.mint(user1.address, "https://metadata.com/1");
    await certificate.connect(user1).transferCertificate(fractionalizer.address, 0);
    expect(await certificate.ownerOf(0)).to.equal(fractionalizer.address);
  });

  it("should fail to fractionalize if certificate not owned", async function () {
    await certificate.mint(user1.address, "https://metadata.com/1");
    await expect(fractionalizer.fractionalize(certificate.address, 0, 1000)).to.be.revertedWith(
      "Fractionalizer must own the certificate"
    );
  });

  it("should fail to mint if not fractionalized", async function () {
    await expect(
      fractionalizer.mintFractionalTokens(certificate.address, 0, user1.address, 500)
    ).to.be.revertedWith("Certificate not fractionalized");
  });
});