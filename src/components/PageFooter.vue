<script setup lang="ts">
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { ref } from "vue";

// Data
const icons = ref<string[]>(["phone", "email", "linkedin", "github"]);

// Methods
const openLink = (iconName: string): void => {
  const actions: { [key: string]: () => void } = {
    phone: () => window.open("tel:+380983731057"),
    email: () => window.open("mailto:youremail@example.com"),
    linkedin: () => window.open("https://www.linkedin.com/", "_blank"),
    github: () => window.open("https://github.com/", "_blank"),
  };
  const action = actions[iconName];
  if (action) action();
};
</script>

<template>
  <v-footer
    border
    :theme="$vuetify.theme.name"
    class="text-center d-flex flex-column">
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="`mdi-${icon}`"
        class="mx-4"
        variant="text"
        @click="openLink(icon)">
      </v-btn>
    </div>
    <v-divider></v-divider>
    <div class="footer-link">
      <a href="https://github.com/timurioukr" target="_blank">
        <strong>Shekhovtsov Timur</strong>
      </a>
      <br />
      {{ new Date().getFullYear() }}
    </div>
    <LanguageSwitcher class="d-sm-none" />
  </v-footer>
</template>
