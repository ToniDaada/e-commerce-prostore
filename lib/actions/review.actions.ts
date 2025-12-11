"use server";

import z from "zod";
import { inserReviewSchema } from "../validator";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

//Create and update reviews

export async function createUpdateReview(
  data: z.infer<typeof inserReviewSchema>
) {
  try {
    const session = await auth();

    if (!session) throw new Error("User is not authenticated");

    //Validate and store the review
    const review = inserReviewSchema.parse({
      ...data,
      userId: session?.user?.id,
    });

    //Get product that is being review
    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });
    if (!product) throw new Error("Product not found");

    //Check if user has already reviewd the prodcut
    const reviewExists = await prisma.review.findFirst({
      where: { productId: review.productId, userId: review.userId },
    });

    //I am using transaction to ensure data integrity
    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        //Update existig review
        await tx.review.update({
          where: {
            id: reviewExists.id,
          },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        //Create a new review
        await tx.review.create({
          data: review,
        });
      }

      //Get the average rating
      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      //get number of reviews
      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      });

      //Update the rating and num reviews in the prodcyt table

      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews: numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);
    return {
      success: true,
      message: reviewExists
        ? "Review updated successfully"
        : "Review created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

//Get all reviews for a product
export async function getReviewsByProductId(productId: string) {
  const reviews = await prisma.review.findMany({
    where: { productId: productId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { reviews };
}

//GET A EWVIEW WRITEN BUT THE CURRENT USERS
export async function getMyReviewByProductId(productId: string) {
  const session = await auth();
  if (!session) throw new Error("User is not authenticated");

  return await prisma.review.findFirst({
    where: { productId, userId: session?.user?.id },
  });
}
