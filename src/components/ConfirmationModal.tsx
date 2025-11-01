import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  bookingId?: string;
}

export const ConfirmationModal = ({ open, onClose, bookingId }: ConfirmationModalProps) => {
  const navigate = useNavigate();

  const handleViewReceipt = () => {
    if (bookingId) {
      navigate(`/receipt/${bookingId}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="mb-4 mx-auto h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
          <DialogTitle className="text-2xl font-bold">¡Reserva Confirmada!</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Tu reservación ha sido registrada exitosamente. Recibirás una confirmación por WhatsApp.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={handleViewReceipt}
            className="btn-hero h-12 text-base font-bold"
          >
            Ver Recibo
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              window.location.reload();
            }}
            className="h-12"
          >
            Nueva Reserva
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
