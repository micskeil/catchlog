<template>
  <header
    class="header shadow p-0 m-0 container-fluid d-flex bg-light justify-content-center border sticky-top"
  >
    <nav
      class="container navbar navbar-expand-sm navbar-light bg-light d-flex justify-content-between  align-content-center"
    >
      <div
        class="navbar-brand d-flex align-content-center p-0"
        href="./index.html"
      >
        <img src="../../assets/logo.png" class="logo" alt="logo" />
        <a class="brand-name nav-brandname pl-3">Fishing log</a>
      </div>

      <div>
        <div class="bottomNav bg-light ">
          <ul class="navbar-nav bottomList mr-3 mt-1 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="./index.html"
                ><img class="nav-icon" src="../../assets/home.png" alt="home"
              /></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@media screen and (max-width: 576px) {
  .bottomNav {
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0px;
    left: 0px;
    width: 100%;
    border: 1px solid #dee2e6;
  }
  .bottomList {
    padding: 0.5rem 1rem 0.5rem 1rem;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 100%;
  }
}
.logo {
  width: 3rem;
  height: 3rem;
}
.nav-brandname {
  font-size: 1.75rem;
  color: #3c3c3c;
  text-decoration: none;
  opacity: 0.6;
}
.nav-icon {
  width: 2rem;
  opacity: 0.4;
}
</style>
