import { useEffect, useState } from "react";

import PhoneInputModule from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputModule.default || PhoneInputModule;

const emptyForm = {
  orderId: "",
  customerName: "",
  status: "Pending",
  platform: "Shopify",

  productName: "",
  sku: "",

  quantity: "",
  unitPrice: "",
  category: "",

  customerPhone: "",
  customerEmail: "",
  customerAddress: "",

  paymentMethod: "",
  trackingId: "",
  amount: "",
};

const OrderFormModal = ({
  isOpen,
  onClose,
  mode = "add",
  order = null,
  onSubmit,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && order) {
      setFormData({
        ...emptyForm,
        ...order,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [isOpen, mode, order]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    await onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === "add" ? "Add New Order" : "Edit Order"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {mode === "add"
                ? "Enter customer, product and order information."
                : "Update customer, product and order information."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          {/* SCROLLABLE FORM */}

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <FormSection title="Order Information">
              <FloatingInput
                label="Order ID"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
              />

              <FloatingInput
                label="Order Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
              />

              <FloatingSelect
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={["Pending", "Delivered", "Cancelled"]}
              />

              <FloatingSelect
                label="Platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                options={[
                  "Shopify",
                  "Amazon",
                  "Flipkart",
                  "Meesho",
                  "Deposite",
                ]}
              />
            </FormSection>

            <FormSection>
              <FloatingInput
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />

              {/* PHONE */}

              <div className="w-full">
                <PhoneInput
                  country="in"
                  value={formData.customerPhone || ""}
                  onChange={(phone) =>
                    setFormData((prev) => ({
                      ...prev,
                      customerPhone: phone,
                    }))
                  }
                  enableSearch
                  countryCodeEditable={false}
                  containerClass="!w-full"
                  inputClass="!h-[52px] !w-full !rounded-lg !border-gray-300"
                />
              </div>

              <FloatingInput
                label="Customer Email"
                name="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={handleChange}
              />

              <FloatingTextarea
                label="Customer Address"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
              />
            </FormSection>

            <FormSection>
              <FloatingInput
                label="Product Name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              />

              <FloatingInput
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
              />

              <FloatingInput
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />

              <FloatingInput
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
              />

              <FloatingInput
                label="Unit Price"
                name="unitPrice"
                type="number"
                value={formData.unitPrice}
                onChange={handleChange}
              />
            </FormSection>

            <FormSection>
              <FloatingInput
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              />

              <FloatingInput
                label="Tracking ID"
                name="trackingId"
                value={formData.trackingId}
                onChange={handleChange}
              />
            </FormSection>
          </div>

          {/* FOOTER */}

          <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white"
            >
              {mode === "add" ? "Save Order" : "Update Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormSection = ({ title, children }) => {
  return (
    <section className="border-b py-1 first:pt-0 last:border-0">
      <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
};

const FloatingInput = ({ label, name, type = "text", value, onChange }) => {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder=" "
        className="peer h-[52px] w-full rounded-lg border border-gray-300 px-3 pb-1 pt-5 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
      />

      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-gray-900"
      >
        {label}
      </label>
    </div>
  );
};

const FloatingTextarea = ({ label, name, value, onChange }) => {
  return (
    <div className="relative md:col-span-2">
      <textarea
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder=" "
        rows={3}
        className="peer w-full resize-none rounded-lg border border-gray-300 px-3 pb-2 pt-6 text-sm outline-none focus:border-gray-900"
      />

      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3 top-2 text-xs text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

const FloatingSelect = ({ label, name, value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="h-[52px] w-full rounded-lg border border-gray-300 px-3 pt-4 text-sm outline-none focus:border-gray-900"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label
        htmlFor={name}
        className="pointer-events-none absolute left-3 top-1 text-[10px] text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

export default OrderFormModal;
