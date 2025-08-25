import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="product-card">
      <div className="aspect-video overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{product.name}</h3>
        <div className="text-2xl font-bold text-primary mb-3">${product.price}</div>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">{product.description}</p>
        <Link href={`/product/${product.id}`}>
          <Button className="btn-gradient-primary w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
