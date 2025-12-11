"use client";

import { Review } from "@/types";
import Link from "next/link";
import { useState } from "react";
import ReviewForm from "./review-form";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [review, setReviews] = useState<Review[]>([]);

  const reload = () => {
    console.log("Review Submitted");
  };
  return (
    <div className="space-y-4">
      {review.length === 0 && <div>No reviews yet.</div>}
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div>
          Please
          <Link
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
            className="text-blue-700 px-1"
          >
            sign in
          </Link>{" "}
          to write a review.
        </div>
      )}

      <div className="flex flex-col gap-3">{/* Review */}</div>
    </div>
  );
};

export default ReviewList;
