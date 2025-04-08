import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { connectWallet } from "../utils/web3";
import { useIsMobile } from "../hooks/use-mobile";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Handle wallet connection
  const handleConnectWallet = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
    }
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Fractionalize", path: "/fractionalize" },
    { name: "Buy Fractions", path: "/buy" },
    { name: "My Fractions", path: "/my-fractions" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border py-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-irec-primary">
          I-REC<span className="text-irec-secondary">Fraction</span>
        </Link>

        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Desktop navigation */}
        {!isMobile && (
          <div className="flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium hover:text-irec-primary transition-colors ${
                    location.pathname === link.path
                      ? "text-irec-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {walletAddress ? (
              <Button variant="outline" className="ml-4 gap-2">
                <Wallet size={16} />
                {truncateAddress(walletAddress)}
              </Button>
            ) : (
              <Button onClick={handleConnectWallet} className="ml-4 gap-2">
                <Wallet size={16} />
                Connect Wallet
              </Button>
            )}
          </div>
        )}

        {/* Mobile navigation menu */}
        {isMobile && isMenuOpen && (
          <div className="fixed inset-x-0 top-[69px] bg-white border-b border-border shadow-lg z-50">
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium py-2 hover:text-irec-primary transition-colors ${
                    location.pathname === link.path
                      ? "text-irec-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {walletAddress ? (
                <Button variant="outline" className="gap-2">
                  <Wallet size={16} />
                  {truncateAddress(walletAddress)}
                </Button>
              ) : (
                <Button onClick={handleConnectWallet} className="gap-2">
                  <Wallet size={16} />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
