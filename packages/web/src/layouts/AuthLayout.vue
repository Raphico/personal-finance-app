<script setup>
import BaseLogo from "@/components/BaseLogo.vue";
</script>

<template>
  <div class="auth-layout">
    <header class="auth-layout__header">
      <BaseLogo size="large" />
    </header>
    <aside class="auth-layout__aside">
      <BaseLogo size="large" />
      <div class="auth-layout__brand">
        <h2 class="text-preset-1">
          Keep track of your money and save your future
        </h2>
        <p class="text-preset-4-regular">
          Personal finance app puts you in control of your spending. Track
          transactions, set budgets, and add to savings pots easily.
        </p>
        >
      </div>
    </aside>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  display: grid;
  min-height: 100vh;
}

.auth-layout__header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-grey-900);
  height: 70px;
}

main {
  background-color: var(--clr-white);
  border-radius: 12px;
  padding: var(--spacing-250);
  width: 95%;
  margin: 0 auto;
  max-width: 560px;
  align-self: flex-start;
}

.auth-layout__aside {
  display: none;
}

@media (min-width: 1024px) {
  .auth-layout__header {
    display: none;
  }

  .auth-layout__aside {
    display: block;
  }

  .auth-layout {
    grid-template-columns: 1fr 2fr;
    padding: var(--spacing-200);
  }

  .auth-layout__aside {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    grid-template-rows: repeat(2, auto);
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    border-radius: 12px;
    background-image: url("@/assets/svg/illustration-authentication.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: var(--spacing-400);
  }

  .auth-layout__brand {
    grid-row: 2 / 3;
    grid-column: 1 / -1;
    align-self: end;
  }

  .auth-layout__aside img:first-child {
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    order: 1;
  }

  .auth-layout__aside :is(h2, p) {
    color: var(--clr-white);
  }

  .auth-layout__aside h2 {
    margin-bottom: var(--spacing-200);
  }

  main {
    grid-column: 2 / 3;
    grid-row: 1 / -1;
    align-self: center;
    padding: var(--spacing-300);
  }
}
</style>
