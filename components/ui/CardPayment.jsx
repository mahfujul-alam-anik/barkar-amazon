"use client";

import React, { useMemo, useState } from "react";

const CardPayment = ({ onClose, onAddCard, onLinkCard }) => {
  const [form, setForm] = useState({
    cardNumber: "",
    nameOnCard: "",
    month: "01",
    year: "2026",
    cvv: "",
    bank: "",
  });

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    [],
  );

  const years = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(2026 + i)),
    [],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (onAddCard) onAddCard(form);
  };

  const handleLinkCard = () => {
    if (onLinkCard) onLinkCard(form.bank);
  };

  return (
    <section className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-lg border border-[#b7b8ba] my-10">
      <header className="flex items-center justify-between border-b border-[#c7c9cb] px-7 py-5 md:px-8 md:py-6 bg-[#f2f3f3]">
        <h2 className="text-lg font-bold leading-none text-[#111111] ">
          Add a credit or debit card
        </h2>
      </header>

      <div className="grid gap-0 px-7 py-10 md:grid-cols-[1.25fr_1fr] md:px-8">
        <form onSubmit={handleAddCard} className="pr-0 md:pr-8">
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-[230px_1fr] md:items-center md:gap-y-5">
            <label
              htmlFor="cardNumber"
              className="text-base font-semibold text-[#111111] md:text-base md:leading-none text-end pr-6"
            >
              Card number
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              className="h-[40px] w-full max-w-[520px] rounded-lg border border-[#9da3a8]   px-4 text-base text-[#111111] outline-none focus:border-[#1c6fd9] focus:shadow-[0_0_0_3px_rgba(28,111,217,0.2)]"
            />

            <label
              htmlFor="nameOnCard"
              className="text-base font-semibold text-[#111111] md:text-base md:leading-none text-end pr-6"
            >
              Name on card
            </label>
            <input
              id="nameOnCard"
              name="nameOnCard"
              value={form.nameOnCard}
              onChange={handleChange}
              className="h-[40px] w-full max-w-[520px] rounded-lg border border-[#9da3a8]   px-4 text-base text-[#111111] outline-none focus:border-[#1c6fd9] focus:shadow-[0_0_0_3px_rgba(28,111,217,0.2)]"
            />

            <p className="text-base font-semibold text-[#111111] md:text-base md:leading-none text-end pr-6">
              Expiration date
            </p>
            <div className="flex gap-3">
              <select
                name="month"
                value={form.month}
                onChange={handleChange}
                className="h-[40px] w-[92px] rounded-lg border border-[#9da3a8]   px-3 text-base text-[#111111] outline-none focus:border-[#1c6fd9] md:w-[110px] "
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="h-[40px] w-[120px] rounded-lg border border-[#9da3a8]   px-3 text-base text-[#111111] outline-none focus:border-[#1c6fd9] md:w-[118px] "
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <label
              htmlFor="cvv"
              className="max-w-[220px] text-base font-semibold leading-tight text-[#111111] md:text-base"
            >
              Security Code (CVV/CVC)
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <input
                id="cvv"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                className=" w-[100px] rounded-lg border border-[#9da3a8]   px-4 text-base text-[#111111] outline-none focus:border-[#1c6fd9] h-[40px]"
              />
              <button type="button" className="text-sm text-[#2162a1]">
                (What&apos;s this?)
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-7 py-3 rounded-full bg-[#ffd814] px-7 text-base font-semibold leading-none text-black hover:bg-[#f7ca00] md:px-8"
          >
            Add your card
          </button>
        </form>

        <aside className="mt-7 border-t border-[#d4d7da] pt-6 md:mt-0 md:border-l md:border-t-0 md:border-[#d4d7da] md:pl-8 md:pt-0">
          <p className="text-sm leading-tight text-[#111111] md:leading-none text-end pr-6">
            This platform accepts all major credit and debit cards:
          </p>

          <div className="mt-4 grid grid-cols-4 gap-2 md:mt-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[44px] rounded-md border border-[#d0d4d7] bg-white md:h-[52px]"
              />
            ))}
          </div>

          <hr className="my-6 border-[#d0d4d7]" />

          <p className="text-sm font-bold leading-tight text-[#111111] md:leading-none  pr-6">
            Link your credit card from your bank{" "}
            <button
              type="button"
              className="font-normal text-[#2162a1] hover:underline"
            >
              Learn more
            </button>
          </p>

          <div className="mt-5 flex flex-wrap gap-4 md:mt-6">
            <select
              name="bank"
              value={form.bank}
              onChange={handleChange}
              className="rounded-lg border border-[#9da3a8]   px-2 text-sm text-[#111111] outline-none focus:border-[#1c6fd9] p-1"
            >
              <option value="">Choose bank</option>
              <option value="Bank One">Bank One</option>
              <option value="Bank Two">Bank Two</option>
              <option value="Bank Three">Bank Three</option>
            </select>

            <button
              type="button"
              onClick={handleLinkCard}
              className="rounded-full border border-[#9da3a8]   px-2 text-sm text-[#111111] outline-none focus:border-[#1c6fd9] p-1"
            >
              Link your card
            </button>
          </div>
        </aside>
      </div>

      <footer className="border-t border-[#c7c9cb] bg-[#e8e8e8] px-7 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[980px] text-sm text-[#4b4f53] ">
            To avoid interruptions to your service, your added card may be used
            as a backup if another payment method fails. You can change this
            setting any time.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#9da3a8]   px-4 text-sm text-[#111111] outline-none focus:border-[#1c6fd9] h-[35px]"
          >
            Cancel
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CardPayment;
