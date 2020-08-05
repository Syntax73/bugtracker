<template>
  <div>
    <h1>Seu perfil</h1>
    <CurrentUser />
  </div>
</template>

<script>
import CurrentUser from '@/components/profile/CurrentUser';

export default {
  name: 'Profile',
  components: { CurrentUser }
};
</script>

<style></style>
