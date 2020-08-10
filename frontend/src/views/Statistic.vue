<template>
  <v-row>
    <v-col cols="12">
      <h1>Statisticas</h1>
    </v-col>
    <v-col>
      <v-card>
        <LineChart
          v-if="loaded"
          :chartData="issuesIstatistics"
          :options="chartOptions"
          label="Issues reportadas"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LineChart from '@/components/charts/LineChart';

export default {
  name: 'Statistic',
  components: { LineChart },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    ...mapActions('statistic', ['getStatistics'])
  },
  computed: {
    ...mapState({
      issuesIstatistics: (state) => state.statistic.issuesIstatistics,
      loaded: (state) => state.statistic.loaded
    })
  },
  async mounted() {
    await this.getStatistics();
  }
};
</script>

<style></style>
