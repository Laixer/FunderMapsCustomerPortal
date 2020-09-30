<template>
  <footer class="Footer">
    <slot />
  </footer>
</template>

<style lang="scss">
.Footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  border-top: 1px solid #d4daf0;
  padding: 0 20px;
  display: flex;
  background: white;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: $BREAKPOINT) {
    position: sticky;

    height: 115px;
    padding: 0 80px;
  }
}
</style>