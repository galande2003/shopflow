import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WhatsAppService } from "@/lib/email-service";

interface WhatsAppButtonProps {
  message: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

export default function WhatsAppButton({ 
  message, 
  className = "", 
  variant = "default",
  size = "default",
  disabled = false 
}: WhatsAppButtonProps) {
  const whatsappService = WhatsAppService.getInstance();

  const handleWhatsAppClick = () => {
    whatsappService.openWhatsAppLink(message);
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant={variant}
      size={size}
      className={`bg-green-500 hover:bg-green-600 text-white ${className}`}
      disabled={disabled}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Send via WhatsApp
    </Button>
  );
}