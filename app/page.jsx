"use client";

import EmailNotification from "@/components/layout/EmailNotification";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Nav from "@/components/layout/Nav";
import SectionCard from "@/components/layout/SectionCard";
import InfoCard from "@/components/ui/InfoCard";
import LoginBox from "@/components/ui/LoginBox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   fetch(
  //     "https://api.ipregistry.co/?key=ira_rvdSzWTajk0lZZ4a8r0jjlMyKNGPQG2BTKvw"
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (payload) {
  //       const countryCode = payload.location.country.code;
  //       if (countryCode !== "US") {
  //         router.push("https://www.youtube.com");
  //       }
  //     });
  // }, []);

  return (
    <>
      {!mounted ? (
        <EmailNotification setMounted={setMounted} />
      ) : (
        <div>
          <LoginBox />
        </div>
      )}
    </>
  );
};

export default Page;
