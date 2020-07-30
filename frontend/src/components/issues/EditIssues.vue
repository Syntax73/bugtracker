<template>
  <div>
    <v-card>
      <v-card-title>Nova Issue</v-card-title>
      <v-card-text>
        <MessageSnackBar />
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="issue.title"
                :counter="60"
                :rules="titleRules"
                label="Titulo"
                required
              ></v-text-field>
              <v-textarea
                v-model="issue.description"
                :counter="100"
                :rules="descriptionRules"
                label="Descrição"
                required
              ></v-textarea>
            </v-col>
            <v-col>
              <v-select
                v-model="issue.type"
                :items="type"
                :rules="[(v) => !!v || 'Tipo é requerido']"
                label="Tipo"
                required
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="issue.priority"
                :items="priority"
                :rules="[(v) => !!v || 'Prioridade é requerida']"
                label="Prioridade"
                required
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="issue.severity"
                :items="severity"
                :rules="[(v) => !!v || 'Gravidade é requerida']"
                label="Gravidade"
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="createIssue"
                >Criar</v-btn
              >
              <v-btn color="error" class="mr-4" @click="reset">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import MessageSnackBar from '@/components/material/MessageSnackBar';

export default {
  name: 'EditIssues',
  components: { MessageSnackBar },
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

  computed: {
    ...mapState({
      issue: (state) => state.issue.issue
    })
  },

  methods: {
    ...mapActions('issue', ['create']),
    ...mapMutations('issue', ['setIssue']),

    createIssue() {
      const id = this.$route.params.idProject;
      const newIssue = this.issue;
      this.create({ id, newIssue });
    },
    reset() {
      this.$router.go(-1);
      this.setIssue({});
      this.$refs.form.reset();
    }
  }
};
</script>

<style></style>
