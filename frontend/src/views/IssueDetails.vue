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
        <AddAssigments
          v-if="userRole === 'project_lead' || userRole === 'test_lead' || userRole === 'admin'"
        />
        <ListAssigments v-else />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import IssueDetails from '../components/issues/IssueDetails';
import IssueDescription from '../components/issues/IssueDescription';
import ListComments from '../components/comments/ListComments';
import AddComment from '../components/comments/AddComment';
import MessageSnackBar from '../components/material/MessageSnackBar';
import AddAssigments from '../components/assigments/AddAssigments';
import ListAssigments from '../components/assigments/ListAssigments';

export default {
  name: 'IssuesDetails',
  components: {
    IssueDetails,
    IssueDescription,
    ListComments,
    AddComment,
    MessageSnackBar,
    AddAssigments,
    ListAssigments
  },
  computed: {
    ...mapState({
      userRole: (state) => state.auth.userSession.role
    })
  }
};
</script>

<style></style>
