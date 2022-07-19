import React, { ReactNode } from "react";
import App from "../../App";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { data } from "../mocks/dataFetch";
import { renderHook } from "@testing-library/react-hooks";
import PlanetsProvider, { usePlanets } from "../../context/usePlanets";
// import { act } from "react-test-renderer";

const customRenderHook = <TProps, TResult>(
	callback: (props: TProps) => TResult
) => {
	const wrapper = ({ children }: { children?: ReactNode }) => (
		<PlanetsProvider>
      {children}
    </PlanetsProvider>
	);

	return renderHook(callback, { wrapper });
};


describe('descrição', () => {

  // beforeEach(() => {
  //   jest.spyOn(global, "fetch").mockResolvedValue({
  //     json: () => jest.fn().mockResolvedValue({ data })
  //   });
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

});
