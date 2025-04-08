import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Wind, Zap } from "lucide-react";

interface CertificateCardProps {
  id: string;
  source: "solar" | "wind" | "hydro";
  location: string;
  totalMWh: number;
  issueDate: string;
  validUntil: string;
}

const CertificateCard = ({
  id,
  source,
  location,
  totalMWh,
  issueDate,
  validUntil,
}: CertificateCardProps) => {
  // Source icon based on certificate type
  const getSourceIcon = () => {
    switch (source) {
      case "solar":
        return <Sun className="h-6 w-6 text-amber-500" />;
      case "wind":
        return <Wind className="h-6 w-6 text-sky-500" />;
      case "hydro":
        return <Zap className="h-6 w-6 text-blue-500" />;
      default:
        return <Zap className="h-6 w-6 text-irec-primary" />;
    }
  };

  // Source color based on certificate type
  const getSourceColor = () => {
    switch (source) {
      case "solar":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "wind":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "hydro":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="w-full overflow-hidden border-2 border-irec-light hover:shadow-lg transition-all duration-300">
      <div className="h-1.5 w-full hero-gradient" />
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">Certificate ID</p>
          <h3 className="font-semibold text-lg">{id}</h3>
        </div>
        <Badge variant="outline" className={`flex items-center gap-1.5 ${getSourceColor()}`}>
          {getSourceIcon()}
          {source.charAt(0).toUpperCase() + source.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="font-medium">{location}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Energy</p>
          <p className="font-medium">{totalMWh} MWh</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Issue Date</p>
          <p className="font-medium">{issueDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Valid Until</p>
          <p className="font-medium">{validUntil}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3 text-sm text-muted-foreground">
        1 MWh = 1 I-REC Certificate
      </CardFooter>
    </Card>
  );
};

export default CertificateCard;
