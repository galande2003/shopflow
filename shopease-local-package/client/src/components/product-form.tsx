import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { insertProductSchema, type InsertProduct, type Product } from "@shared/schema";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: InsertProduct) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || "",
      image: product?.image || "",
      description: product?.description || "",
    },
  });

  const handleSubmit = async (data: InsertProduct) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          {...form.register("name")}
          placeholder="Enter product name"
          className="form-input"
        />
        {form.formState.errors.name && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">Price *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...form.register("price")}
          placeholder="Enter price"
          className="form-input"
        />
        {form.formState.errors.price && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image">Image URL *</Label>
        <Input
          id="image"
          type="url"
          {...form.register("image")}
          placeholder="Enter image URL"
          className="form-input"
        />
        {form.formState.errors.image && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.image.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...form.register("description")}
          placeholder="Enter product description"
          className="form-input form-textarea"
        />
        {form.formState.errors.description && (
          <p className="text-destructive text-sm mt-1">{form.formState.errors.description.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="btn-gradient-primary flex-1"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : product ? "Update Product" : "Save Product"}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
