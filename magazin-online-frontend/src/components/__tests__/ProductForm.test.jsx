import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "../productForm/ProductForm";
import { vi } from "vitest";

describe("ProductForm", () => {
  test("renders all form fields", () => {
    render(<ProductForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Description$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Category$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Subcategory$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Seller Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Price$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Quantity$/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  test("submits correct form values", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<ProductForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/^Name$/i), "Laptop");
    await user.type(screen.getByLabelText(/^Description$/i), "Great product");
    await user.type(screen.getByLabelText(/^Category$/i), "Electronics");
    await user.type(screen.getByLabelText(/^Subcategory$/i), "Computers");
    await user.type(screen.getByLabelText(/^Seller Name$/i), "Alex Store");
    await user.type(screen.getByLabelText(/^Price$/i), "2999.99");
    await user.type(screen.getByLabelText(/^Quantity$/i), "5");

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Laptop",
      description: "Great product",
      category: "Electronics",
      subcategory: "Computers",
      sellerName: "Alex Store",
      price: 2999.99,
      quantity: 5,
    });
  });


  test("error message appears for wrong values ", async () => {
    const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<ProductForm onSubmit={handleSubmit} />);

  await user.type(screen.getByLabelText(/^Price$/i), "-30");
  await user.type(screen.getByLabelText(/^Quantity$/i), "-9");

  await user.click(screen.getByRole("button", { name: /save/i }));


  expect(handleSubmit).not.toHaveBeenCalled();

  expect(screen.getByText(/^Name is required$/i)).toBeInTheDocument();
  expect( screen.getByText(/^Description is required$/i)).toBeInTheDocument();
  expect(screen.getByText(/^Category is required$/i)).toBeInTheDocument();
  expect(screen.getByText(/^Subcategory is required$/i)).toBeInTheDocument();
  expect(screen.getByText(/^Seller name is required$/i)).toBeInTheDocument();
  expect(screen.getByText(/^Cannot be negative$/i)).toBeInTheDocument();
  expect(screen.getByText(/^Must be at least 0$/i)).toBeInTheDocument();

  });
});