import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const productId = params?.id;

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
  });

  if (error) {
    return (
      <div className="page-container py-16 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
        <Button onClick={() => setLocation("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="page-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Skeleton className="w-full aspect-square rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const handleBuyNow = () => {
    setLocation(`/checkout/${product.id}`);
  };

  const handleGoBack = () => {
    setLocation("/");
  };

  return (
    <div className="page-container py-16 fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full rounded-xl shadow-xl"
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
          <div className="text-3xl font-bold text-primary">${product.price}</div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              onClick={handleBuyNow}
              className="btn-gradient-success flex-1 text-lg py-6"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
            <Button 
              onClick={handleGoBack}
              variant="outline"
              className="sm:w-auto text-lg py-6 px-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
