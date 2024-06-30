import { render, userEvent, act } from "@/testing/test-utils";

import { Textarea } from "../Textarea";

describe("TextArea Component", () => {
  test("renders without errors", () => {
    const { getByText } = render(<Textarea label="Test label" />);
    expect(getByText("Test label")).toBeInTheDocument();
  });

  test("onChange should be called", async () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <Textarea label="Test label" onChange={onChange} />
    );

    const textAreaElement = getByRole("textbox");

    await act(async () => {
      await userEvent.type(textAreaElement, "test input");
    });

    expect(onChange).toHaveBeenCalled();
    expect(textAreaElement).toHaveValue("test input");
  });
});
