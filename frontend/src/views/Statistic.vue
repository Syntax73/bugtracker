<template>
  <v-row>
    <v-col cols="12">
      <h1>Statisticas</h1>
    </v-col>
    <v-col cols="8">
      <v-card>
        <v-card-title>Todas as issues reportadas</v-card-title>
        <LineChart
          v-if="loaded"
          :chartData="issuesIstatistics"
          :options="chartOptions"
          label="Issues reportadas"
        />
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Status das issues</v-card-title>
        <PieChart
          v-if="loaded"
          :chartData="issuesStatusIstatistics"
          :options="chartOptions"
          :chartColors="issuesStatusColors"
          label="Status das issues"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';

export default {
  name: 'Statistic',
  components: { LineChart, PieChart },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      issuesStatusColors: {
        borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)'],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)']
      }
    };
  },
  methods: {
    ...mapActions('statistic', ['getStatistics'])
  },
  computed: {
    ...mapState({
      issuesIstatistics: (state) => state.statistic.issuesIstatistics,
      issuesStatusIstatistics: (state) => state.statistic.issuesStatusIstatistics,
      loaded: (state) => state.statistic.loaded
    })
  },
  async mounted() {
    await this.getStatistics();
  }
};
</script>

<style></style>
