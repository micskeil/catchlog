import { shallowMount } from "@vue/test-utils";
import UserName from "../../src/components/LayoutElements/UserName.vue";

describe("UserName", () => {
  it("should give back the defaultPhoto if no uid prop provided ", () => {
    const propsData = { uid: undefined };
    const wrapper = shallowMount(UserName, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render to a snapshot when list has items", () => {
    const propsData = { uid: "4FJQKFUuWQdnnWTD7GzGFGvAXZ62" };
    const wrapper = shallowMount(UserName, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });
});
