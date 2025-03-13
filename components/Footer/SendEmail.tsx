"use client";

import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

const SendEmail = () => {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Проста валідація email
    if (!email || !email.includes("@")) {
      toast.error(t("placeholder"));
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(t("send_successfully"));
        setEmail(""); // Очищення поля після успішної відправки
      } else {
        toast.error(result.message || t("send_error_1"));
      }
    } catch {
      toast.error(t("send_error_2"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        className="p-2 rounded min-w-80 text_white_to_black"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {isLoading ? t("sending_btn") : t("send_btn")}
      </button>
    </form>
  );
};

export default SendEmail;
