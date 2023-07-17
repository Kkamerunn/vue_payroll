<template>
  <main>
    <h1>This is the home</h1>
    <button @click="logOut">Logout</button>
  </main>
</template>

<script>
import { auth } from '../utils/firebase'
export default {
  name: 'HomeView',
  setup() {
    const logOut = () => {
      auth.signOut()
    }

    return {
      logOut
    }
  }
}
</script>

