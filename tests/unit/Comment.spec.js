import { shallowMount } from "@vue/test-utils";
import Comment from "../../src/components/Social/Comment";
import "regenerator-runtime/runtime.js";

describe("Comment", () => {
  var wrapper;
  let methods;

  methods = {
    saveComment: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(Comment, {
      methods,
    });
  });

  it("should render a Label ", () => {
    expect(wrapper.get("label").exists()).toBe(true);
  });

  it("should render an input field ", () => {
    expect(wrapper.get("input").exists()).toBe(true);
  });

  it("should render an img ", () => {
    expect(wrapper.get("img").exists()).toBe(true);
  });

  it("should run saveComment funcion on click", async () => {
    wrapper.vm.saveComment = jest.fn();

    await wrapper.find("img").trigger("click");
    expect(wrapper.vm.saveComment).toHaveBeenCalled();
  });

  it("should write into the input field", async () => {
    const input = wrapper.find("input");
    await input.setValue("This is my comment");
    expect(input.element.value).toContain("This is my comment");
  });
});
