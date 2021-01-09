import { shallowMount } from "@vue/test-utils";
import Comment from "../../src/components/Social/Comment";

describe("Comment", () => {
  it("should give back error with no postId ", () => {
    const propsData = { postId: undefined };
    const wrapper = shallowMount(Comment, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should give back error with no postId ", () => {
    const propsData = { uid: "" };
    const wrapper = shallowMount(Comment, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });
});
