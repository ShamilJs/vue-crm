<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          @change="changeHandler"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          Данное поле обязательно
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          Введите корректный email
        </small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          @change="changeHandler"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          Данное поле обязательно
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          Минимальное количество символов:
          {{ $v.password.$params.minLength.min }}
        </small>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          @change="changeHandler"
          :class="{
            invalid:
              ($v.name.$dirty && !$v.name.required) ||
              ($v.name.$dirty && !$v.name.minLength),
          }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          Данное поле обязательно
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.name.$dirty && !$v.name.minLength"
        >
          Минимальное количество символов: {{ $v.name.$params.minLength.min }}
        </small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span
            :class="{ 'not-checked': $v.agree.$dirty && !$v.agree.checked }"
          >
            С правилами согласен
          </span>
        </label>
      </p>
    </div>

    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "registr",
  data: () => ({
    name: "",
    email: "",
    password: "",
    agree: false,
  }),
  validations: {
    name: { required, minLength: minLength(3) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    agree: { checked: (v) => v },
  },
  methods: {
    changeHandler() {
      this.$v.$touch();
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch("registr", formData);
        this.$router.push("/");
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
.not-checked {
  &::before {
    border: 2px solid #f44336 !important;
  }
}
</style>
