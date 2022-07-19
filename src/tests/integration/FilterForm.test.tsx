import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterForm from "../../components/forms/FilterForm"

const columnLabels = {
  diameter: "Diâmetro",
  orbital_period: "Translação",
  population: "População",
  rotation_period: "Rotação",
  surface_water: "Superfície da Água",
};

const operationsLabels = {
  EQUALS: "Igual a",
  GREATER_THAN: "Maior que",
  LOWER_THAN: "Menor que",
};

const onSubmitMock = jest.fn();

beforeEach(() => {
  render(
    <FilterForm
      columnLabels={columnLabels}
      onSubmit={onSubmitMock}
    />
  );
});

describe("covarage 80% of FilterForm", () => {
  it("should render two combo box and one spin button, all elements needs starting with a default value", () => {
    const comboBoxArr = screen.getAllByRole("combobox");
    expect(comboBoxArr).toHaveLength(2);

    const [columnComboBox, comparisonComboBox] = comboBoxArr;
    expect(columnComboBox).toHaveValue("diameter");
    expect(comparisonComboBox).toHaveValue("EQUALS");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(8);

    const columnOptions = options.slice(0, 6);
    const expectedColumnOptionsValue = Object.keys(columnLabels);
    columnOptions.forEach((option, index) => {
      expect(option).toHaveValue(expectedColumnOptionsValue[index]);
    });

    const comparisonOptions = options.slice(5);
    const expectedComparisonOptionsValue = Object.keys(operationsLabels);
    comparisonOptions.forEach((option, index) => {
      expect(option).toHaveValue(expectedComparisonOptionsValue[index]);
    });

    const spinButton = screen.getByRole("spinbutton");
    expect(spinButton).toHaveValue(0);
  });

  it("must be possible to interact with the elements", async () => {
    const comboBoxArr = screen.getAllByRole("combobox");
    const [columnComboBox, comparisonComboBox] = comboBoxArr;

    const nonDefaultColumnOption = screen.getByRole("option", { name: "Translação" });
    userEvent.selectOptions(columnComboBox, nonDefaultColumnOption);
    expect(screen.getAllByRole("combobox")[0]).toHaveValue("orbital_period");

    const nonDefaultComparisonOption = screen.getByRole("option", { name: "Maior que" });
    userEvent.selectOptions(comparisonComboBox, nonDefaultComparisonOption);
    expect(screen.getAllByRole("combobox")[1]).toHaveValue("GREATER_THAN");

    const spinButton = screen.getByRole("spinbutton");
    userEvent.type(spinButton, "100");
    expect(spinButton).toHaveValue(100);
    const submitButton = screen.getByRole("button", { name: "Incluir filtro" });
    userEvent.click(submitButton);
    await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(1));
  });
})
