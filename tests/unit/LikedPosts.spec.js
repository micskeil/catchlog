import { shallowMount } from "@vue/test-utils";
import LikedPosts from "../../src/components/View/LikedPosts.vue";

describe("Fish", () => {
  it("should give back error with no postId ", () => {
    const propsData = { postId: undefined };
    const wrapper = shallowMount(Fish, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should give back error with no postId ", () => {
    const propsData = { uid: "" };
    const wrapper = shallowMount(Fish, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });
});
