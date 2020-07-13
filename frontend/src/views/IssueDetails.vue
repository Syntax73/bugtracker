<template>
  <v-row>
    <MessageSnackBar />
    <v-col cols="12">
      <IssueDescription />
    </v-col>
    <v-col cols="8">
      <div class="mb-2">
        <ListComments />
      </div>
      <div>
        <AddComment />
      </div>
    </v-col>
    <v-col cols="4">
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
import IssueDescription from '../components/issues/IssueDescription';
import ListAssigments from '../components/assigments/ListAssigments';
import ListComments from '../components/comments/ListComments';
import AddComment from '../components/comments/AddComment';
import MessageSnackBar from '../components/material/MessageSnackBar';

export default {
  name: 'IssuesDetails',
  components: {
    IssueDetails,
    IssueDescription,
    ListAssigments,
    ListComments,
    AddComment,
    MessageSnackBar
  }
};
</script>

<style></style>
