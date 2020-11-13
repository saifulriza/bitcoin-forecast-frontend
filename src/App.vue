<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
</template>

<style lang="scss">
.apexcharts-tooltip {
  color: black;
}
// svg {
//   position: absolute;
//   margin: auto;
// }
.apexcharts-menu-item {
  color: black;
}

#mask {
  animation: mask 975ms ease infinite;
}
@keyframes mask {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(280px);
  }
}
</style>
