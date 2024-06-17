"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Index() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    router.push("/signin");
  }, [router]);

  return <></>;
}
