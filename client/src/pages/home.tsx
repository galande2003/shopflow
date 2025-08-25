import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (error) {
    return (
      <div className="page-container py-16 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Products</h2>
        <p className="text-muted-foreground">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero-gradient py-16">
        <div className="page-container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Welcome to ShopEase
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices
          </p>
          <Button 
            className="btn-gradient-primary text-lg px-8 py-4"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="page-container">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Featured Products
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-muted-foreground mb-4">No Products Available</h3>
              <p className="text-muted-foreground">Check back later for new products.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
