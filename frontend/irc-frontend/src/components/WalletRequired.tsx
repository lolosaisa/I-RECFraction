
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { connectWallet } from "@/utils/web3";
import { Wallet } from "lucide-react";

interface WalletRequiredProps {
  walletConnected: boolean;
  onConnect: () => Promise<void>;
  children: ReactNode;
}

const WalletRequired = ({ walletConnected, onConnect, children }: WalletRequiredProps) => {
  if (walletConnected) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Wallet className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Wallet Connection Required</h3>
      <p className="text-muted-foreground mb-6">
        Connect your Ethereum wallet to access this feature and interact with I-REC certificates.
      </p>
      <Button onClick={onConnect} className="gap-2">
        <Wallet size={16} />
        Connect Wallet
      </Button>
    </div>
  );
};

export default WalletRequired;
