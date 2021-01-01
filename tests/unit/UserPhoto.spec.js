import { shallowMount } from "@vue/test-utils";
import UserPhoto from "../../src/components/LayoutElements/UserPhoto.vue";

describe("UserPhoto", () => {
  it("should give back the defaultPhoto if no uid prop provided ", () => {
    const propsData = { uid: "" };
    const wrapper = shallowMount(UserPhoto, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render to a snapshot when list has items", () => {
    const propsData = { uid: "4FJQKFUuWQdnnWTD7GzGFGvAXZ62" };
    const wrapper = shallowMount(UserPhoto, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });
});
