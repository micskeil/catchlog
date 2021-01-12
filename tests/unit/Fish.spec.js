import { shallowMount } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Fish from "../../src/components/CatchFish/Fish.vue";
import "regenerator-runtime/runtime.js";

describe("Fish", () => {
  let wrapper;

  let methods = {
    loadPost: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(Fish, {
      propsData: {
        postId: "23232",
      },
      methods,
    });
  });

  it("should be there one base-card element", () => {
    expect(wrapper.get("base-card").exists()).toBe(true);
  });
});
