// // "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// export default function Home() {
//   const router = useRouter();

//   React.useEffect(() => {

//     if (router) {
//       const payloadData = JSON.parse(router);
//       console.log('Payload Data to save:', payloadData);
//     }

//   }, [router]);

//   return (
//     <main className="w-full  bg-white">eee</main>
//   );
// }
"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();

  // useEffect(() => {
  //   // Ensure the router is ready and the expected query data exists.
  //   if (router.isReady && router.query.data) {
  //     try {
  //       // Assuming `router.query.data` is a stringified JSON,
  //       // You might want to decode URI component if the data is URI encoded.
  //       const payloadData = JSON.parse(decodeURIComponent(router.query.data));
  //       console.log('Payload Data to save:', payloadData);
  //     } catch (error) {
  //       console.error('Error parsing data:', error);
  //       // Handle parsing error, maybe show an error message to the user
  //     }
  //   }
  // }, [router.isReady, router.query.data]);  // Re-run the effect when `router.isReady` or `router.query.data` changes.

  useEffect(() => {
    console.log("Payload Data to save:",  params.get("data"));
    // Ensure the router is ready and the expected query data exists.
    // if (router.query) {
    //   try {
    //     // Assuming `router.query.data` is a stringified JSON,
    //     // You might want to decode URI component if the data is URI encoded.
    //     // const payloadData = JSON.parse(decodeURIComponent(router.query.data));
    //     console.log('Payload Data to save:', router.query);
    //   } catch (error) {
    //     console.error('Error parsing data:', error);
    //     // Handle parsing error, maybe show an error message to the user
    //   }
    // }
  }, []);

  // useEffect(() => {
  //   // Wait until the router object is fully populated
  //   // if (!router.isReady) return;

  //   // Construct full URL
  //   const fullUrl = `${window.location.protocol}//${window.location.host}${router.asPath}`;

  //   console.log("Full URL:", fullUrl);

  //   // Do something with the URL
  // }, []);
  return (
    <div>
      <h1>Home Page</h1>
      {/* Content of the home page */}
    </div>
  );
}
