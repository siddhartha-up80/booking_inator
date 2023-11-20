import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@material-tailwind/react";

export default function Home() {
  

  return (
    <main>
      <h1 className="flex justify-center items-center h-screen">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </h1>
    </main>
  );
}
