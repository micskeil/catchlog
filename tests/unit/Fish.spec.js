import { shallowMount } from "@vue/test-utils";
import Fish from "../../src/components/CatchFish/Fish.vue";
import "regenerator-runtime/runtime";

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

  it("open comment section when click comment button ", async () => {
    const propsData = { postId: "10VwrTmGTrHTOyn4EuKf" };
    const wrapper = shallowMount(Fish, { propsData });
    const commentButton = await wrapper.find(".comment-button");

    await commentButton.trigger("click");

    const commentInput = await wrapper.find("comment");
    expect(commentInput.element.value).toBe();
  });
});
