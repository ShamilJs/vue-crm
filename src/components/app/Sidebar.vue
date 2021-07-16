<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      custom
      v-slot="{ navigate, isActive, isExactActive, href }"
      :key="link.to"
      active-class="active"
      :to="link.to"
      :exact="link.exact"
    >
      <li role="link" :class="[(isActive || isExactActive) && 'active']">
        <a
          :href="href"
          :class="[
            (isActive || isExactActive) && 'waves-orange pointer waves-effect',
          ]"
          @click="navigate"
        >
          {{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["value"],
  data: () => ({
    links: [
      { title: "Счет", to: "/", exact: true },
      { title: "История", to: "/history" },
      { title: "Планирование", to: "/planning" },
      { title: "Новая запись", to: "/record" },
      { title: "Категории", to: "/categories" },
    ],
  }),
};
</script>
