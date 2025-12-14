"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

//Static targeT Date

const TARGET_DATE = new Date("2025-12-20T00:00:00");

//Function to calculate the time remainging

const calculateTheTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountdown = () => {
  const [time, setTime] =
    useState<ReturnType<typeof calculateTheTimeRemaining>>();

  useEffect(() => {
    //Calcualte unital time on client
    setTime(calculateTheTimeRemaining(TARGET_DATE));

    const timeInterval = setInterval(() => {
      const newTime = calculateTheTimeRemaining(TARGET_DATE);
      setTime(newTime);
      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timeInterval);
      }

      return () => clearInterval(timeInterval);
    }, 1000);
  }, []);

  if (!time) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-2">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">Loading Deals</h3>
        </div>
      </section>
    );
  }

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    <section className="grid grid-cols-1 md:grid-cols-2 my-2">
      <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">Deal Has Ende</h3>
        <p>This deal is no longer available. Checkout our latest promtions</p>

        <div className="text-center">
          <Button asChild>
            <Link href="/search">View Products</Link>
          </Button>
        </div>
      </div>
      <div className="flex-justify-center">
        <Image
          src="/images/promo.jpg"
          width={300}
          height={200}
          alt="Promotion"
        />
      </div>
    </section>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-2">
      <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">Deal of the Month</h3>
        <p>
          Get ready fot a shppping experience like never before with our Deals
          of the Month! Everypurchase comes with exclusive perks and offers,
          making this month a celebration of savvy choices and amazing deals.
          Don&apos;t miss out! 🛒
        </p>

        <ul className="grid grid-cols-4">
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>

        <div className="text-center">
          <Button asChild>
            <Link href="/search">View Products</Link>
          </Button>
        </div>
      </div>
      <div className="flex-justify-center">
        <Image
          src="/images/promo.jpg"
          width={300}
          height={200}
          alt="Promotion"
        />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="p-4 w-full text-center">
    <p className="text-3xl font-bold">{value}</p>
    <p>{label}</p>
  </li>
);

export default DealCountdown;
