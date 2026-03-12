"use client";

import React, { useState } from "react";

const COUNTRY_OPTIONS = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
];

const STATE_OPTIONS = [
  { value: "", label: "Select" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "CA", label: "California" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "IL", label: "Illinois" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
  { value: "WA", label: "Washington" },
];

const DEFAULT_VALUES = {
  country: "US",
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  isDefaultAddress: false,
};

const AddressForm = ({
  initialValues = {},
  countries = COUNTRY_OPTIONS,
  states = STATE_OPTIONS,
  onChange,
  onAutofill,
  onSubmit,
  className = "",
}) => {
  const [form, setForm] = useState({ ...DEFAULT_VALUES, ...initialValues });

  const updateField = (name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (onChange) onChange(next);
      return next;
    });
  };

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    updateField(name, type === "checkbox" ? checked : value);
  };

  const handleAutofill = () => {
    if (!onAutofill) return;
    const patch = onAutofill(form);
    if (!patch || typeof patch !== "object") return;
    const next = { ...form, ...patch };
    setForm(next);
    if (onChange) onChange(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  const BaseField = ({
    label,
    name,
    type = "text",
    placeholder,
    hint,
    options = [],
    required = false,
    containerClassName = "",
    inputClassName = "",
    ...rest
  }) => (
    <div className={containerClassName}>
      <label
        htmlFor={name}
        className="mb-2 block text-base font-semibold text-[#111111]"
      >
        {label}
      </label>

      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={form[name]}
          required={required}
          onChange={handleInputChange}
          className={`py-2 w-full rounded-[12px] border border-[#9da3a8] bg-white px-4 text-base leading-none text-[#111111] outline-none focus:border-[#1c6fd9] ${inputClassName}`}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={form[name]}
          required={required}
          placeholder={placeholder}
          onChange={handleInputChange}
          className={`py-2 w-full rounded-[12px] border border-[#9da3a8] bg-white px-4 text-base leading-none text-[#111111] outline-none placeholder:text-[#6c757d] focus:border-[#1c6fd9] ${inputClassName}`}
          {...rest}
        />
      )}

      {hint ? <p className="mt-2 text-[14px] text-[#111111]">{hint}</p> : null}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-[700px] py-12 ${className}`}
    >
      <div className="rounded-[12px] border border-[#58c5d5] bg-[#c9edf5] p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[20px] font-bold text-[#111111]  md:leading-none">
            Save time. Autofill your current location.
          </p>
          <button
            type="button"
            onClick={handleAutofill}
            className="rounded-full border border-[#9da3a8] bg-[#f2f4f5] py-2 px-3 text-sm leading-none text-[#111111] hover:bg-[#e8ecef]"
          >
            Autofill
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <BaseField
          label="Country/Region"
          name="country"
          type="select"
          options={countries}
          required
        />

        <BaseField
          label="Full name (First and Last name)"
          name="fullName"
          placeholder="James"
          required
        />

        <BaseField
          label="Phone number"
          name="phone"
          type="tel"
          placeholder="+18402427954"
          hint="May be used to assist delivery"
          required
        />

        <div>
          <p className="mb-2 text-[18px] font-bold text-[#111111]">Address</p>
          <input
            id="addressLine1"
            name="addressLine1"
            value={form.addressLine1}
            required
            placeholder="Street address or P.O. Box"
            onChange={handleInputChange}
            className="py-2 w-full rounded-[12px] border border-[#9da3a8] bg-white px-4 text-base leading-none text-[#111111] outline-none placeholder:text-[#6c757d] focus:border-[#1c6fd9]"
          />
          <input
            id="addressLine2"
            name="addressLine2"
            value={form.addressLine2}
            placeholder="Apt, suite, unit, building, floor, etc."
            onChange={handleInputChange}
            className="mt-2 py-2 w-full rounded-[12px] border border-[#9da3a8] bg-white px-4 text-base leading-none text-[#111111] outline-none placeholder:text-[#6c757d] focus:border-[#1c6fd9]"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <BaseField
            label="City"
            name="city"
            required
            containerClassName="md:col-span-1"
          />

          <BaseField
            label="State"
            name="state"
            type="select"
            options={states}
            required
            containerClassName="md:col-span-1"
          />

          <BaseField
            label="ZIP Code"
            name="zipCode"
            placeholder=""
            required
            containerClassName="md:col-span-1"
          />
        </div>

        <label
          htmlFor="isDefaultAddress"
          className="flex items-center gap-3 text-[18px] text-[#111111]"
        >
          <input
            id="isDefaultAddress"
            name="isDefaultAddress"
            type="checkbox"
            checked={form.isDefaultAddress}
            onChange={handleInputChange}
            className="h-5 w-5 rounded border border-[#9da3a8]"
          />
          Make this my default address
        </label>
      </div>

      <div className="flex-end">
        <button
          type="submit"
          className="mt-7 py-3 rounded-full bg-[#ffd814] px-7 text-base font-semibold leading-none text-black hover:bg-[#f7ca00] md:px-8"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
