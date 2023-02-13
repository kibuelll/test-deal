
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TableCarts from "./carts";
import TableProducts from "./products";

export default function Home() {
  const router = useRouter()
  return (
    <>
      {(
        router.route.includes("carts") ? (
          <TableCarts />
        ) : (
          <TableProducts/>
        )
      )}
    </>
  );
}
