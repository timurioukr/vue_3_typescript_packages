<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

// Data
const currentLang = ref(localStorage.getItem("lang") || "en");

// Methods
const changeLanguage = (): void => {
  localStorage.setItem("lang", currentLang.value);
  router.go();
};
</script>

<template>
  <div>
    <v-switch
      v-model="currentLang"
      true-value="ua"
      false-value="en"
      hide-details
      @change="changeLanguage">
      <template #append>
        <div>UA</div>
      </template>
      <template #prepend>
        <div>EN</div>
      </template>
    </v-switch>
  </div>
</template>
