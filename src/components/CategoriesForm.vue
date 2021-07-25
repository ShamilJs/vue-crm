<template>
  <form @submit.prevent="submitHandler">
    <div class="input-field">
      <input
        type="text"
        :id="'name' + nameBtn"
        v-model="name"
        :class="{ invalid: $v.name.$dirty && !$v.name.required }"
      />
      <label :for="'name' + nameBtn">Название</label>
      <small
        class="helper-text invalid"
        v-if="$v.name.$dirty && !$v.name.required"
      >
        Данное поле обязательно
      </small>
    </div>
    <div class="input-field">
      <input
        :id="'limit' + nameBtn"
        type="number"
        v-model.number="limit"
        :class="{
          invalid:
            ($v.limit.$dirty && !$v.limit.required) ||
            ($v.limit.$dirty && !$v.limit.minValue),
        }"
      />
      <label :for="'limit' + nameBtn">Лимит</label>
      <small
        class="helper-text invalid"
        v-if="$v.limit.$dirty && !$v.limit.required"
      >
        Данное поле обязательно
      </small>
      <small
        class="helper-text invalid"
        v-else-if="$v.limit.$dirty && !$v.limit.minValue"
      >
        Минимальное значение:
        {{ $v.limit.$params.minValue.min }}
      </small>
    </div>
    <button class="btn waves-effect waves-light" type="submit">
      {{ nameBtn }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import M from "materialize-css";
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "CategoriesForm",
  props: ["nameBtn"],
  data: () => ({
    name: "",
    limit: 100,
  }),
  validations: {
    name: { required },
    limit: { required, minValue: minValue(500) },
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        name: this.name,
        limit: this.limit,
      };
      this.$emit("handleSubmit", formData);
    },
  },
};
</script>
