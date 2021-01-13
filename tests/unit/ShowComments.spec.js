import { mount } from "@vue/test-utils";
import ShowComments from "../../src/components/Social/ShowComments";
import "regenerator-runtime/runtime.js";

describe("ShowComments", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ShowComments, {
      propsData: { postId: "125" },
    });
  });

  it("should run loadComments at mounting", () => {
    console.log(wrapper);
    wrapper.componentVM.loadComments = jest.fn();
    expect(wrapper.componentVM.loadComments).toHaveBeenCalled();
  });
});
