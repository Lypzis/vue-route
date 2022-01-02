<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  // now this is not strictly tied to the rout anymore, instead of using $route
  // for better programming practices, consider using this option :D
  props: ['teamId'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      // this.$route.path // /teams/1
      const selectedTeam = this.teams.find((team) => team.id === teamId);

      if (selectedTeam && typeof selectedTeam !== 'undefined') {
        const { members } = selectedTeam;

        const selectedMembers = [];

        for (const member of members) {
          const selectedUser = this.users.find((user) => user.id === member);

          selectedMembers.push(selectedUser);
        }

        this.members = selectedMembers;
        this.teamName = selectedTeam.name;
      } else {
        this.teamName = 'This team has no members D:';
      }
    },
  },
  created() {
    this.loadTeamMembers(this.teamId);
    console.log('Route Query Parameter: ', this.$route.query);
  },
  // a possibility, though, this gets tied to route
  // beforeRouteUpdate(to, from, next) {
  //   console.log('team members before route update');
  //   console.log(to, from);
  //   this.loadTeamMembers(to.params.teamId);

  //   next();
  // },
  watch: {
    // watching changes to the this.$route (the route :) )
    teamId(newTeamId) {
      this.loadTeamMembers(newTeamId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
