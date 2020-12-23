<template>
  <div class="container-fluid d-flex flex-column align-items-center ">
    <slot name="header"></slot>

    <div class="container  d-flex justify-content-between row">
      <div
        class="content col-md-8 d-flex flex-column align-items-center m-0 pr-2 pl-2"
      >
        <slot name="main"></slot>
      </div>

      <div class="side-bar d-none d-md-block col-md-4 p-3 pl-3">
        <div class="side-bar-content">
          <slot name="sidebar"> </slot>

          <footer class="footer pt-3">
            ©2020 ❤-el készítette
            <a href="mailto:micskeil@gmail.com">Lali Micskei</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side-bar-content {
  position: sticky;
  top: 2rem;
}

.footer {
  font-size: 0.75rem;
}
</style>
