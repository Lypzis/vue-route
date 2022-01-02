<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return { changesSaved: false };
  },
  methods: {
    confirmInput() {
      this.$router.push('/teams');

      // check the docs :D
      // this.$router.back();
      // this.$router.forward();
    },
    saveChanges() {
      this.changesSaved = true;
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('user list before route enter');
    console.log(to, from);

    next();
  },
  // useful for user experience
  beforeRouteLeave(to, from, next) {
    console.log('user list before route leave');
    console.log(to, from);

    if (this.changesSaved) next();
    else {
      // Remember: confirm is a built in javascript browser feature
      // which returns a boolean
      const userWantsToLeave = confirm(
        'Are you sure? You got unsaved changes!'
      );

      next(userWantsToLeave);
    }
  },
  unmounted() {
    console.log('unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
