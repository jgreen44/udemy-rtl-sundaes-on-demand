import { render, screen } from "@testing-library/react";
import Options from "../Options";

describe("Scoop Options test", () => {
  test("displays image for each scoop option from the server", async () => {
    render(<Options optionType={"scoops"} />);

    // find images <-- use getALL because of multiple images
    // name is the alt name
    // $ means 'scoop' is at end of string
    const scoopImages = await screen.findAllByRole("img", {
      name: /scoop$/i,
    });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    // @ts-ignore
    const altText = scoopImages.map((e) => e.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });
});
