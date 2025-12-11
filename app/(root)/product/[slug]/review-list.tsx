"use client";

import { Review } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewForm from "./review-form";
import { deleteReview, getReviews } from "@/lib/actions/review.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Mail, Trash2, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Rating from "@/components/shared/product/rating";
import toast from "react-hot-toast";

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

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({ productId });
      setReviews(res.reviews);
    };

    loadReviews();
  }, [productId]);

  //Reload reviews after created o update
  const reload = async () => {
    const res = await getReviews({ productId });
    setReviews([...res.reviews]);
  };

  const deleteReviews = async (productId: string) => {
    const res = await deleteReview(productId);
    if (res.success) {
      toast.success(res.message);
      reload();
    } else {
      toast.error(res.message);
    }
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

      <div className="flex flex-col gap-3">
        {/* Review */}

        {review.map(
          (rev) => (
            console.log(rev),
            (
              <Card key={rev.id}>
                <CardHeader>
                  <div className="flex-between">
                    <CardTitle>{rev.title}</CardTitle>
                    {/* <Trash2
                      className="h-4 w-4 text-red-500 cursor-pointer hover:scale-[105%] duration-500"
                      onClick={() => deleteReviews(rev.productId)}
                    /> */}
                  </div>
                  <CardDescription>{rev.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    {/* RATING */}
                    <Rating value={rev.rating} />
                    <div className="flex items-center">
                      <User className="mr-1 h-3 w-3" />
                      {rev.user ? rev.user?.name : "Deleted User"}
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-1 h-3 w-3" />
                      {rev.user?.email ? rev.user?.email : ""}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDateTime(rev.createdAt).dateTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ReviewList;
