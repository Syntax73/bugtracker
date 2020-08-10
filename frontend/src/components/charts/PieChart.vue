<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: {
    chartData: Array,
    options: Object,
    chartColors: Object
  },
  mounted() {
    const pieLable = this.chartData.map((d) => d.label);
    const count = this.chartData.map((d) => d.total);

    const { borderColor, backgroundColor } = this.chartColors;

    this.renderChart(
      {
        labels: pieLable,
        datasets: [
          {
            borderColor,
            backgroundColor,
            data: count
          }
        ]
      },
      this.options
    );
  }
};
</script>
