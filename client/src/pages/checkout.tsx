import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendOrderEmail } from "@/lib/email-service";
import { apiRequest } from "@/lib/queryClient";
import type { Product, InsertOrder } from "@shared/schema";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, params] = useRoute("/checkout/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const productId = params?.id;

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
  });

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
  });

  const orderMutation = useMutation({
    mutationFn: async (orderData: InsertOrder) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
  });

  const handleSubmit = async (data: CheckoutForm) => {
    if (!product) return;

    try {
      // Create order in backend
      const orderData: InsertOrder = {
        productId: product.id,
        customerName: data.fullName,
        customerEmail: data.email,
        customerPhone: data.phone,
        customerAddress: data.address,
        notes: data.notes || null,
        totalAmount: product.price,
      };

      const newOrder = await orderMutation.mutateAsync(orderData);

      // Send email notification
      const emailSent = await sendOrderEmail({
        customerName: data.fullName,
        customerEmail: data.email,
        customerPhone: data.phone,
        customerAddress: data.address,
        productName: product.name,
        productPrice: `$${product.price}`,
        notes: data.notes,
      });

      if (emailSent) {
        toast({
          title: "Order placed successfully!",
          description: "You will receive a confirmation email shortly.",
        });
      } else {
        toast({
          title: "Order placed successfully!",
          description: "Your order has been recorded, but email notification failed.",
          variant: "default",
        });
      }

      // Reset form and redirect to order details
      form.reset();
      setLocation(`/order/${newOrder.id}`);
    } catch (error) {
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="page-container py-16">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-container py-16 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">The product you're trying to purchase doesn't exist.</p>
        <Button onClick={() => setLocation("/")} variant="outline">
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container py-16 fade-in">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Checkout</h2>
        
        {/* Order Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{product.name}</h4>
                <p className="text-muted-foreground">Quantity: 1</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-2xl font-bold text-primary">
                <span>Total:</span>
                <span>${product.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...form.register("fullName")}
                  placeholder="Enter your full name"
                  className="form-input"
                />
                {form.formState.errors.fullName && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  placeholder="Enter your phone number"
                  className="form-input"
                />
                {form.formState.errors.phone && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="Enter your email address"
                  className="form-input"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address">Shipping Address *</Label>
                <Textarea
                  id="address"
                  {...form.register("address")}
                  placeholder="Enter your complete shipping address"
                  className="form-input form-textarea"
                />
                {form.formState.errors.address && (
                  <p className="text-destructive text-sm mt-1">{form.formState.errors.address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  {...form.register("notes")}
                  placeholder="Any special instructions for your order"
                  className="form-input form-textarea"
                />
              </div>

              <Button 
                type="submit" 
                className="btn-gradient-success w-full text-lg py-6"
                disabled={orderMutation.isPending}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                {orderMutation.isPending ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
