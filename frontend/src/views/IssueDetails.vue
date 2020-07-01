<template>
  <v-row>
    <v-col cols="6">
      <ListComments />
    </v-col>
    <v-col cols="6">
      <div class="mb-2">
        <IssueDetails />
      </div>
      <div>
        <ListAssigments />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import IssueDetails from '../components/issues/IssueDetails';
import ListAssigments from '../components/assigments/ListAssigments';
import ListComments from '../components/comments/ListComments';

export default {
  name: 'IssuesDetails',
  components: { IssueDetails, ListAssigments, ListComments }
};
</script>

<style></style>
