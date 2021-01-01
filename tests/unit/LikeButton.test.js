import { shallowMount } from "@vue/test-utils/";
import LikeButton from "../../src/components/Social/LikeButton.vue";

describe("LikeButton.vue", async () => {
  it("counter increased by 1", () => {
    const catchId = "22122121211";
    const wrapper = shallowMount(LikeButton, {
      props: { catchId },
    });

      await wrapper.trigger('click')
    
  });
});
