<script lang="ts" setup>
import PageHeader from "./components/PageHeader.vue";
import PageFooter from "./components/PageFooter.vue";
</script>

<template>
  <v-app>
    <PageHeader />
    <v-main>
      <RouterView />
    </v-main>
    <PageFooter />
  </v-app>
</template>
