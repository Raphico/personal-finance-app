<script setup>
import IconNavBudgets from "@/components/Icons/IconNavBudgets.vue";
import IconNavOverview from "@/components/Icons/IconNavOverview.vue";
import IconNavPots from "@/components/Icons/IconNavPots.vue";
import IconNavRecurringBills from "@/components/Icons/IconNavRecurringBills.vue";
import IconNavTransactions from "@/components/Icons/IconNavTransactions.vue";
</script>

<template>
  <div class="container">
    <nav>
      <picture class="logo">
        <source
          srcset="@/assets/svg/logo-large.svg"
          media="(min-width: 1025px)"
        />
        <img src="" alt="Company Logo" />
      </picture>
      <ul>
        <li>
          <RouterLink
            active-class="active-link"
            class="text-preset-5-bold"
            to="/overview"
          >
            <IconNavOverview />
            <span class="link-text">overview</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            active-class="active-link"
            class="text-preset-5-bold"
            to="/transactions"
          >
            <IconNavTransactions />
            <span class="link-text">transactions</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="text-preset-5-bold"
            active-class="active-link"
            to="/budgets"
          >
            <IconNavBudgets />
            <span class="link-text">budgets</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="text-preset-5-bold"
            active-class="active-link"
            to="/pots"
          >
            <IconNavPots />
            <span class="link-text">pots</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="text-preset-5-bold"
            active-class="active-link"
            to="/recurring-bills"
          >
            <IconNavRecurringBills />
            <span class="link-text">recurring bills</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
nav {
  background-color: var(--clr-grey-900);
  position: fixed;
  border-radius: 8px 8px 0 0;
  bottom: 0;
  width: 100%;
}

nav a {
  color: var(--clr-grey-300);
  text-decoration: none;
  text-transform: capitalize;
}
nav li {
  display: grid;
  place-content: center;
  width: 68.6px;
  height: 44px;
}

nav li:has(.active-link) {
  background-color: var(--clr-beige-100);
  border-radius: 8px 8px 0 0;
  border-bottom: 4px solid var(--clr-green);
}

nav li:has(.active-link) .link-text {
  color: var(--clr-grey-900);
}

.active-link {
  color: var(--clr-green);
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-100) var(--spacing-150) 0;
  list-style: none;
}

.link-text {
  display: none;
}

.logo {
  display: none;
}

@media (min-width: 768px) {
  .link-text {
    display: block;
  }

  nav li {
    text-align: center;
    width: 104px;
    height: 66px;
  }
}

@media (min-width: 1024px) {
  .logo {
    display: block;
    padding: var(--spacing-400);
  }

  .container {
    display: grid;
    grid-template-columns: 300px 1fr;
    min-height: 100vh;
    gap: var(--spacing-500);
  }

  nav {
    position: initial;
    border-radius: 0 16px 16px 0;
    padding-right: var(--spacing-300);
  }

  nav li {
    place-content: initial;
    width: 100%;
    height: 100%;
    padding: var(--spacing-150) 0 var(--spacing-150) var(--spacing-400);
  }

  nav li:has(.active-link) {
    border-radius: 0 12px 12px 0;
    border-bottom: 0;
    border-left: 4px solid var(--clr-green);
  }

  nav a {
    display: flex;
    gap: var(--spacing-200);
    width: 100%;
  }

  .link-text {
    font-size: var(--fs-400);
    line-height: 1.5;
    letter-spacing: 0;
    font-weight: var(--fw-bold);
  }

  nav ul {
    display: grid;
    gap: var(--spacing-150) 0;
    padding: 0;
    justify-content: initial;
  }
}
</style>
