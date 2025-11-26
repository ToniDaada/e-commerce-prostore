"use server";
import { prisma } from "@/db/prisma";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { z } from "zod";
import { convertToPlainObject, formatError } from "../utils";
import { revalidatePath } from "next/cache";
import { insertProductsSchema, updateProductsSchema } from "../validator";

// Get latest products

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

// Get single product by slsug

export async function getLatestProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug: slug } });
}

// GET ALL PRODUCTS

export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// delete product

export async function deleteProducts(productId: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!productExists) throw new Error("Product does not exist");

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product successfully deleted by admin" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

//Create a product

export async function createProduct(
  data: z.infer<typeof insertProductsSchema>
) {
  try {
    const product = insertProductsSchema.parse(data);
    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

//UPDATE A PRODCUT
export async function updateProduct(
  data: z.infer<typeof updateProductsSchema>
) {
  try {
    const product = updateProductsSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists)
      throw new Error("Product doesn't exist. Therefore it can't be updated");

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
