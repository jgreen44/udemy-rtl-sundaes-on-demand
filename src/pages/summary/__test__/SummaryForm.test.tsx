import { SummaryForm } from "../SummaryForm";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("test the Summary Form", () => {
  test("initial conditions", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(confirmButton).toBeDisabled();
  });

  test("Checkbox enables on first click, disables on subsequent click", async () => {
    render(<SummaryForm />);
    //create the user
    const user = userEvent.setup();

    // get the checkbox
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    // get the button
    const button = screen.getByRole("button", { name: /confirm order/i });

    // check the checkbox
    await user.click(checkbox);

    // check that the button is now enabled
    expect(button).toBeEnabled();

    // uncheck the checkbox
    await user.click(checkbox);

    // check that the button is disabled again
    expect(button).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouseout
    await userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
