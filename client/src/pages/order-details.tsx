import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, ArrowLeft, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendCancelOrderEmail, WhatsAppService } from "@/lib/email-service";
import WhatsAppButton from "@/components/whatsapp-button";
import type { Order, Product } from "@shared/schema";

const cancelSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

type CancelForm = z.infer<typeof cancelSchema>;

export default function OrderDetails() {
  const [, params] = useRoute("/order/:id");
  const [, setLocation] = useLocation();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { toast } = useToast();
  const orderId = params?.id;

  const { data: order, isLoading: orderLoading } = useQuery<Order>({
    queryKey: ["/api/orders", orderId],
    enabled: !!orderId,
  });

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: ["/api/products", order?.productId],
    enabled: !!order?.productId,
  });

  const cancelForm = useForm<CancelForm>({
    resolver: zodResolver(cancelSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const handleCancelOrder = async (data: CancelForm) => {
    if (!order || !product) return;

    setIsCancelling(true);
    try {
      // Send cancellation email
      const emailSent = await sendCancelOrderEmail({
        customerName: data.name,
        customerPhone: data.phone,
        productName: product.name,
        orderId: order.id,
      });

      if (emailSent) {
        toast({
          title: "Cancellation request sent!",
          description: "Your order cancellation request has been sent. You'll be contacted soon.",
        });
      } else {
        toast({
          title: "Cancellation request failed",
          description: "There was an error sending your cancellation request. Please try again.",
          variant: "destructive",
        });
      }

      setShowCancelDialog(false);
      cancelForm.reset();
    } catch (error) {
      toast({
        title: "Cancellation failed",
        description: "There was an error processing your cancellation request.",
        variant: "destructive",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  if (orderLoading || productLoading) {
    return (
      <div className="page-container py-16">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order || !product) {
    return (
      <div className="page-container py-16 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
        <Button onClick={() => setLocation("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container py-16 fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Order ID: #{order.id}</p>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{product.name}</h4>
                <p className="text-muted-foreground">Quantity: 1</p>
                <p className="text-2xl font-bold text-primary">${order.totalAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Name</Label>
              <p className="text-foreground">{order.customerName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Email</Label>
              <p className="text-foreground">{order.customerEmail}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
              <p className="text-foreground">{order.customerPhone}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Shipping Address</Label>
              <p className="text-foreground">{order.customerAddress}</p>
            </div>
            {order.notes && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Order Notes</Label>
                <p className="text-foreground">{order.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => setLocation("/")}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
            <Button 
              onClick={() => setShowCancelDialog(true)}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Order
            </Button>
          </div>
          
          <WhatsAppButton
            message={`Hi! I have a question about my order #${order.id} for ${product.name}. Can you please help me?`}
            variant="outline"
            className="w-full bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
          />
        </div>

        {/* Cancel Order Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Order</DialogTitle>
            </DialogHeader>
            <form onSubmit={cancelForm.handleSubmit(handleCancelOrder)} className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Please provide your details to confirm the cancellation request.
              </p>
              
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...cancelForm.register("name")}
                  placeholder="Enter your full name"
                  className="form-input"
                />
                {cancelForm.formState.errors.name && (
                  <p className="text-destructive text-sm mt-1">
                    {cancelForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...cancelForm.register("phone")}
                  placeholder="Enter your 10-digit mobile number"
                  className="form-input"
                  maxLength={10}
                />
                {cancelForm.formState.errors.phone && (
                  <p className="text-destructive text-sm mt-1">
                    {cancelForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  variant="destructive" 
                  className="flex-1"
                  disabled={isCancelling}
                >
                  {isCancelling ? "Sending..." : "Cancel Order"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCancelDialog(false)}
                  className="flex-1"
                  disabled={isCancelling}
                >
                  Keep Order
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}