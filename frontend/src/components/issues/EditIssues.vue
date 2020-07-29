<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field :counter="10" :rules="titleRules" label="Titulo" required></v-text-field>
          <v-textarea
            :counter="100"
            :rules="descriptionRules"
            label="Descrição"
            required
          ></v-textarea>
        </v-col>
        <v-col>
          <v-select
            :items="type"
            :rules="[(v) => !!v || 'Tipo é requerido']"
            label="Tipo"
            required
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="priority"
            :rules="[(v) => !!v || 'Prioridade é requerida']"
            label="Prioridade"
            required
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="severity"
            :rules="[(v) => !!v || 'Gravidade é requerida']"
            label="Gravidade"
            required
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>
          <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
          <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'EditIssues',
  data: () => ({
    valid: true,
    titleRules: [
      (v) => !!v || 'Titulo é requerido',
      (v) => (v && v.length <= 60) || 'Titulo deve ter menos de 60 caracteres'
    ],
    descriptionRules: [
      (v) => !!v || 'Descrição é requerida',
      (v) => (v && v.length <= 100) || 'Descrição deve ter menos de 100 caracteres'
    ],
    type: ['bug', 'feature', 'duplicate', 'documentation'],
    priority: ['low', 'medium', 'high'],
    severity: ['critical', 'major', 'moderate', 'minor', 'cosmect']
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style></style>
