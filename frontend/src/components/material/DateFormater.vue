<template>
  <div>{{ newDate }}</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DateFormater',
  props: {
    date: String
  },
  data() {
    return { newDate: '' };
  },
  methods: {
    format() {
      this.newDate = moment(this.date).format('DD-MM-YYYY HH:mm');
    }
  },
  mounted() {
    this.format();
  }
};
</script>
