"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DonationStatus() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (location.href.includes("success=1")) {
      toast.success("Thanks for your donation!");
      setShow(true);
    }
  }, [show]);

  return <div>DonationStatus</div>;
}
