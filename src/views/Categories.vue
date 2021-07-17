<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Создать</h4>
            </div>

            <CategoriesForm
              :nameBtn="nameBtn.create"
              @handleSubmit="createCategory"
            />
          </div>
        </div>
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Редактировать</h4>
            </div>
            <div class="input-field">
              <select>
                <option>Category</option>
              </select>
              <label>Выберите категорию</label>
            </div>

            <CategoriesForm
              :nameBtn="nameBtn.update"
              @handleSubmit="editCategory"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesForm from "@/components/app/CategoriesForm";

export default {
  name: "categories",
  components: { CategoriesForm },
  data: () => ({
    nameBtn: {
      create: "Создать",
      update: "Обновить",
    },
  }),
  methods: {
    createCategory({ name, limit }) {
      console.log(name, limit);
    },
    editCategory({ name, limit }) {
      console.log(name, limit);
    },
  },
};
</script>
