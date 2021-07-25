<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i
            class="material-icons black-text"
            :class="{ opened: value, closed: !value }"
          >
            dehaze
          </i>
        </a>
        <span class="black-text">
          {{ date | date }}, {{ date | date("time") }}
        </span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link custom v-slot="{ navigate, href }" to="/profile">
                <a :href="href" class="black-text" @click="navigate">
                  <i class="material-icons">account_circle</i>Профиль
                </a>
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from "materialize-css";

export default {
  name: "Navbar",
  props: ["value"],
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
.opened {
  transform: rotate(-0deg);
  transition: transform 300ms;
}
.closed {
  transform: rotate(180deg);
  transition: transform 300ms;
}
</style>
