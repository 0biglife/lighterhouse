import React from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import Button from "@/components/base/Button";
import { vi } from "vitest";

describe("Button component", () => {
  it("renders label properly", () => {
    render(<Button label="Submit" onClick={() => {}} />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("버튼 클릭 테스트", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("버튼 비활성화 테스트", () => {
    const handleClick = vi.fn();
    render(<Button label="Disabled" onClick={handleClick} disabled />);
    fireEvent.click(screen.getByText("Disabled"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
