"use client";

import { CoffeeIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { createDonation } from "@/actions/donationActions";

export default function DonationForm({ email }: { email: string }) {
  const [inputValue, setInputValue] = useState("");
  const [amount, setAmount] = useState(1);
  const [crypto, setCrypto] = useState("BTC");

  useEffect(() => {
    if (inputValue) {
      setAmount(parseInt(inputValue));
    }
  }, [inputValue]);

  async function handleFormSubmit(formData: FormData) {
    formData.set("amount", amount.toString());
    formData.set("crypto", crypto);
    formData.set("email", email);
    console.log({ formData });

    const url = await createDonation(formData);

    if (!url) return;

    redirect(url);
  }

  return (
    <form action={handleFormSubmit}>
      <div className="flex items-center space-x-3 border border-yellow-400 bg-yellow-400/10 rounded-xl p-4">
        <CoffeeIcon className="size-10 mb-1" />
        <XIcon className="size-6 mt-2" />
        <button
          type="button"
          onClick={() => setAmount(1)}
          className={`donation-button ${amount === 1 && "active"}`}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => setAmount(3)}
          className={`donation-button ${amount === 3 && "active"}`}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => setAmount(5)}
          className={`donation-button ${amount === 5 && "active"}`}
        >
          5
        </button>
        <input
          type="number"
          placeholder="10"
          min={6}
          max={99}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="font-bold text-xl text-center w-14 h-14 border-4 border-yellow-400 rounded-xl focus:outline-none focus:ring-0"
        />
      </div>

      <div className="mt-4 space-y-2">
        <input name="name" type="text" placeholder="Your name" />
        <textarea name="message" placeholder="Your message" />
      </div>

      <div className="mt-4 space-x-2 flex">
        <button
          onClick={() => setCrypto("BTC")}
          type="button"
          className={`crypto-button ${crypto === "BTC" && "active"}`}
        >
          BTC
        </button>
        <button
          onClick={() => setCrypto("ETH")}
          type="button"
          className={`crypto-button ${crypto === "ETH" && "active"}`}
        >
          ETH
        </button>
        <button
          onClick={() => setCrypto("LTC")}
          type="button"
          className={`crypto-button ${crypto === "LTC" && "active"}`}
        >
          LTC
        </button>
      </div>

      <button
        type="submit"
        className="mt-2 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-xl"
      >
        Donate ${amount * 3}
      </button>
    </form>
  );
}
