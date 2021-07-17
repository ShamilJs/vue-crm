<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="userName"
          :class="{
            invalid:
              ($v.userName.$dirty && !$v.userName.required) ||
              ($v.userName.$dirty && !$v.userName.minLength),
          }"
        />
        <label for="description">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.userName.$dirty && !$v.userName.required"
        >
          Данное поле обязательно
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.userName.$dirty && !$v.userName.minLength"
        >
          Минимальное количество символов:
          {{ $v.userName.$params.minLength.min }}
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "profile",
  data: () => ({
    userName: "",
  }),
  validations: {
    userName: { required, minLength: minLength(3) },
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        userName: this.userName,
      };
      console.log("formData: ", formData);
      this.clearData();
    },
    clearData() {
      this.userName = "";
    },
  },
};
</script>
