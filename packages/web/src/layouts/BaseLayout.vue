<script setup>
import { ref, computed } from "vue";
import IconMinimizeMenu from "@/components/Icons/IconMinimizeMenu.vue";
import IconNavBudgets from "@/components/Icons/IconNavBudgets.vue";
import IconNavOverview from "@/components/Icons/IconNavOverview.vue";
import IconNavPots from "@/components/Icons/IconNavPots.vue";
import IconNavRecurringBills from "@/components/Icons/IconNavRecurringBills.vue";
import IconNavTransactions from "@/components/Icons/IconNavTransactions.vue";

const isMenuMinimize = ref(false);

function toggleIsMenuMinimize() {
  isMenuMinimize.value = !isMenuMinimize.value;
}

const getLogo = computed(() =>
  isMenuMinimize.value
    ? "/src/assets/svg/logo-small.svg"
    : "/src/assets/svg/logo-large.svg"
);

const links = [
  {
    to: "/overview",
    name: "overview",
    icon: IconNavOverview,
  },
  {
    to: "/transactions",
    name: "transactions",
    icon: IconNavTransactions,
  },
  {
    to: "/budgets",
    name: "budgets",
    icon: IconNavBudgets,
  },
  {
    to: "/pots",
    name: "pots",
    icon: IconNavPots,
  },
  {
    to: "/recurring-bills",
    name: "recurring bills",
    icon: IconNavRecurringBills,
  },
];
</script>

<template>
  <div class="container">
    <nav
      id="primary-navigation"
      :data-minimize="isMenuMinimize"
      :aria-expanded="!isMenuMinimize"
    >
      <Transition name="fade" mode="out-in">
        <picture class="logo" :key="`logo-${isMenuMinimize}`">
          <source :srcset="getLogo" media="(min-width: 1025px)" />
          <img src="" alt="Company Logo" height="22" />
        </picture>
      </Transition>
      <ul>
        <li v-for="link in links" :key="link.name">
          <RouterLink
            active-class="active-link"
            class="text-preset-5-bold"
            :to="link.to"
          >
            <component :is="link.icon" />
            <span class="link-text">{{ link.name }}</span>
          </RouterLink>
        </li>
      </ul>
      <button
        class="minimize-menu text-preset-3"
        :aria-label="isMenuMinimize ? 'Maximize Menu' : 'Minimize Menu'"
        aria-controls="primary-navigation"
        :data-minimize="isMenuMinimize"
        @click="toggleIsMenuMinimize"
      >
        <IconMinimizeMenu />
        <span class="minimize-menu-text">minimize menu</span>
      </button>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
main {
  padding: var(--spacing-300) var(--spacing-200) 4.75em var(--spacing-200);
  width: 100%;
}

nav {
  background-color: var(--clr-grey-900);
  position: fixed;
  border-radius: 8px 8px 0 0;
  bottom: 0;
  width: 100%;
  z-index: 50;
}

nav a {
  color: var(--clr-grey-300);
  text-decoration: none;
  text-transform: capitalize;
  transition-property: color;
  transition-timing-function: var(--transition-easing);
  transition-duration: var(--transition-duration);
}

nav a:is(:hover, :focus):not(.active-link) {
  color: var(--clr-white);
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
  text-wrap: nowrap;
}

.logo {
  display: none;
}

.minimize-menu {
  display: none;
}

@media (min-width: 768px) {
  main {
    padding-bottom: 6.75em;
    padding-inline: var(--spacing-400);
  }

  .link-text {
    display: block;
  }

  nav li {
    text-align: center;
    width: 104px;
    height: 66px;
  }
}

@media (min-width: 1100px) {
  .container {
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity;
    transition-timing-function: var(--transition-easing);
    transition-duration: var(--transition-duration);
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: none;
  }

  .logo {
    display: block;
    padding: var(--spacing-400);
  }

  .container {
    display: grid;
    grid-template-columns: 300px 1fr;
    transition-property: grid-template-columns;
    transition-timing-function: var(--transition-easing);
    transition-duration: var(--transition-duration);
  }

  .container:has(nav[data-minimize="true"]) {
    grid-template-columns: 88px 1fr;
  }

  main {
    grid-column: 2 / 3;
    padding-bottom: 2em;
    max-width: 100%;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-300);
    border-radius: 0 16px 16px 0;
    width: 300px;
    height: 100%;
    top: 0;
    left: 0;
    padding-right: var(--spacing-300);
    padding-bottom: var(--spacing-500);
    transition-property: all;
    transition-timing-function: var(--transition-easing);
    transition-duration: var(--transition-duration);
  }

  nav[data-minimize="true"] {
    width: 88px;
  }

  nav li {
    overflow: hidden;
    place-content: initial;
    width: 100%;
    height: 48px;
    padding: 0 0 0 var(--spacing-400);
  }

  nav li:has(.active-link) {
    border-radius: 0 12px 12px 0;
    border-bottom: 0;
    border-left: 4px solid var(--clr-green);
  }

  nav a {
    display: flex;
    align-items: center;
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

  .minimize-menu {
    cursor: pointer;
    border: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    gap: var(--spacing-200);
    padding-left: var(--spacing-400);
    color: var(--clr-grey-300);
    text-transform: capitalize;
    transition-property: color;
    transition-timing-function: var(--transition-easing);
    transition-duration: var(--transition-duration);
    margin-top: auto;
    text-wrap: nowrap;
  }

  .minimize-menu svg {
    transition: transform var(--transition-duration) var(--transition-easing);
  }

  .minimize-menu:hover,
  .minimize-menu:focus {
    color: var(--clr-white);
  }

  .minimize-menu-text {
    transition:
      opacity var(--transition-duration) var(--transition-easing),
      visibility var(--transition-duration) var(--transition-easing);
    position: relative;
  }

  .minimize-menu[data-minimize="true"] .minimize-menu-text {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }

  .minimize-menu[data-minimize="true"] svg {
    transform: rotate(180deg);
  }
}
</style>
