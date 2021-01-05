import { shallowMount } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Login from "../../src/views/Login.vue";
import "regenerator-runtime/runtime";
import { convertCompilerOptionsFromJson } from "typescript";

describe("Login", () => {
  it("set the value for e-mail input ", () => {
    const wrapper = shallowMount(Login);
    const input = wrapper.find(".email-input");
    input.setValue("my@mail.com");

    expect(input.element.value).toBe("my@mail.com");
  });

  it("set the value for password input is empty", () => {
    const wrapper = shallowMount(Login);
    const input = wrapper.find(".password-input");
    input.setValue("password");

    expect(input.element.value).toBe("password");
  });
  it("set the value for e-mail input ", () => {
    const wrapper = shallowMount(Login);
    const input = wrapper.find(".email-input");
    input.setValue("my@mail.com");

    expect(input.element.value).toBe("my@mail.com");
  });

  it("try to log in with wrong email ", async () => {
    const wrapper = mount(Login);
    const input = wrapper.find(".email-input");
    await input.setValue("wrongmail");

    const submit = wrapper.find("base-button");
    await submit.trigger("click");

    const warning = await wrapper.find(".warning");
    expect(warning.element.value).toBe();
  });

  it("try to log in with wrong details ", async () => {
    const wrapper = mount(Login);
    const input = wrapper.find(".email-input");
    await input.setValue("bad@gmail.com");

    const password = wrapper.find(".password-input");
    await password.setValue("12345678");

    const submit = wrapper.find("base-button");
    await submit.trigger("click");

    const warning = await wrapper.find(".warning");
    expect(warning.element.value).toBe();
  });

  it("try to log in with good details ", async () => {
    const mockRoute = {
      params: {
        id: 1,
      },
    };
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = mount(Login, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    const input = wrapper.find(".email-input");
    await input.setValue("micskeil@gmail.com");

    const password = wrapper.find(".password-input");
    await password.setValue("123456");

    const submit = wrapper.find("base-button");
    await submit.trigger("click");

    setTimeout(() => {
      expect(mockRouter.push).toHaveBeenCalled();
    }, 500);
  });
});
