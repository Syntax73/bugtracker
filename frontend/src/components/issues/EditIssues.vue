<template>
  <div>
    <v-card>
      <v-card-title>Nova Issue</v-card-title>
      <v-card-text>
        <MessageSnackBar />
        <v-form ref="form" v-model="valid">
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
                v-if="issue.id"
                v-model="issue.type.type"
                :items="type"
                :rules="[(v) => !!v || 'Tipo é requerido']"
                label="Tipo"
                required
              ></v-select>
              <v-select
                v-else
                v-model="issue.type"
                :items="type"
                :rules="[(v) => !!v || 'Tipo é requerido']"
                label="Tipo"
                required
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-if="issue.id"
                v-model="issue.priority.priority"
                :items="priority"
                :rules="[(v) => !!v || 'Prioridade é requerida']"
                label="Prioridade"
                required
              ></v-select>
              <v-select
                v-else
                v-model="issue.priority"
                :items="priority"
                :rules="[(v) => !!v || 'Prioridade é requerida']"
                label="Prioridade"
                required
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-if="issue.id"
                v-model="issue.severity.severity"
                :items="severity"
                :rules="[(v) => !!v || 'Gravidade é requerida']"
                label="Gravidade"
                required
              ></v-select>
              <v-select
                v-else
                v-model="issue.severity"
                :items="severity"
                :rules="[(v) => !!v || 'Gravidade é requerida']"
                label="Gravidade"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="issue.id" :disabled="!valid" color="success" class="mr-2" @click="updateIssue"
          >Editar</v-btn
        >
        <v-btn v-else :disabled="!valid" color="success" class="mr-2" @click="createIssue"
          >Criar</v-btn
        >
        <v-btn color="error" @click="reset">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { SET_ISSUE } from '@/store/multation-types';
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
    type: [
      {
        text: 'Bug',
        value: 'bug'
      },
      {
        text: 'Feature',
        value: 'feature'
      },
      {
        text: 'Duplicate',
        value: 'duplicate'
      },
      {
        text: 'Documentation',
        value: 'documentation'
      }
    ],
    priority: [
      {
        text: 'Low',
        value: 'low'
      },
      {
        text: 'Medium',
        value: 'medium'
      },
      {
        text: 'High',
        value: 'high'
      }
    ],
    severity: [
      {
        text: 'Critical',
        value: 'critical'
      },
      {
        text: 'Major',
        value: 'major'
      },
      {
        text: 'Moderate',
        value: 'moderate'
      },
      {
        text: 'Minor',
        value: 'minor'
      },
      {
        text: 'Cosmect',
        value: 'cosmect'
      }
    ]
  }),

  computed: {
    ...mapState({
      issue: (state) => state.issue.issue
    })
  },

  methods: {
    ...mapActions('issue', ['create', 'update']),
    ...mapActions('app', ['toggleSnackbar']),
    ...mapMutations('issue', [SET_ISSUE]),

    async createIssue() {
      try {
        const id = this.$route.params.idProject;
        const newIssue = this.issue;
        await this.create({ id, newIssue });
        this.$router.go(-1);
      } catch (err) {
        this.toggleSnackbar({
          message: err,
          alertType: 'warning'
        });
      }
    },
    async updateIssue() {
      try {
        const id = this.$route.params.idProject;
        const editedIssue = this.issue;
        await this.update({ id, editedIssue });
        this.$router.go(-1);
      } catch (err) {
        this.toggleSnackbar({
          message: err,
          alertType: 'warning'
        });
      }
    },
    reset() {
      this.$router.go(-1);
      this.$refs.form.reset();
      this.SET_ISSUE({});
    }
  }
};
</script>

<style></style>
