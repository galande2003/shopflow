import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, XCircle, User, Phone, MapPin, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendCancelOrderEmail, WhatsAppService } from "@/lib/email-service";
import WhatsAppButton from "@/components/whatsapp-button";
import type { Order, Product } from "@shared/schema";

const cancelSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

type CancelForm = z.infer<typeof cancelSchema>;

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { toast } = useToast();

  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cancelForm = useForm<CancelForm>({
    resolver: zodResolver(cancelSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const getProductById = (productId: number): Product | undefined => {
    return products?.find(product => product.id === productId);
  };

  const handleCancelOrder = async (data: CancelForm) => {
    if (!selectedOrder) return;

    const product = getProductById(selectedOrder.productId);
    if (!product) return;

    setIsCancelling(true);
    try {
      const emailSent = await sendCancelOrderEmail({
        customerName: data.name,
        customerPhone: data.phone,
        productName: product.name,
        orderId: selectedOrder.id,
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
      setSelectedOrder(null);
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

  const openCancelDialog = (order: Order) => {
    setSelectedOrder(order);
    setShowCancelDialog(true);
  };

  if (ordersLoading) {
    return (
      <div className="page-container py-16">
        <div className="space-y-6">
          <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container py-16 fade-in">
      <h1 className="text-4xl font-bold text-center mb-12 text-foreground">Order History</h1>

      {!orders || orders.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-4">No Orders Found</h3>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
            <Button onClick={() => window.location.href = "/"} className="btn-gradient-primary">
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const product = getProductById(order.productId);
            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Order #{order.id}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Order Date: {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-2">
                        Processing
                      </Badge>
                      <p className="text-2xl font-bold text-primary">${order.totalAmount}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Product Details */}
                    {product && (
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Product Details</h4>
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium">{product.name}</h5>
                            <p className="text-sm text-muted-foreground">Quantity: 1</p>
                            <p className="font-semibold text-primary">${product.price}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Customer Information */}
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Customer Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{order.customerEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{order.customerPhone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">{order.customerAddress}</span>
                        </div>
                        {order.notes && (
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground">Notes:</p>
                            <p className="text-sm">{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-4 border-t space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={() => openCancelDialog(order)}
                        variant="destructive"
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Order
                      </Button>
                      
                      {product && (
                        <WhatsAppButton
                          message={`Hi! I have a question about order #${order.id} for ${product.name}. Can you please help me?`}
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-none bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Cancel Order Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Order #{selectedOrder?.id}</DialogTitle>
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
                onClick={() => {
                  setShowCancelDialog(false);
                  setSelectedOrder(null);
                  cancelForm.reset();
                }}
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
  );
}