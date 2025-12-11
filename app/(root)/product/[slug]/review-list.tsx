"use client";

import { Review } from "@/types";
import Link from "next/link";
import { useState } from "react";

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
  console.log(productSlug);
  return (
    <div className="space-y-4">
      {review.length === 0 && <div>No reviews yet.</div>}
      {userId ? (
        <>{/* Review form */}</>
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
