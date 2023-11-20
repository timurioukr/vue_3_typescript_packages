<script setup lang="ts">
import AnimatedLogo from "./AnimatedLogo.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { useTheme } from "vuetify";
import { useLocalStorageSaver } from "@/composables/functions";
const theme = useTheme();

// Methods
const toggleTheme = (): void => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  useLocalStorageSaver("theme", theme.global.name.value);
};
</script>

<template>
  <v-app-bar border flat app class="px-7">
    <template #prepend>
      <AnimatedLogo />
    </template>

    <template #title>
      <v-app-bar-title>DelivrSearcher</v-app-bar-title>
    </template>

    <template #append>
      <div class="pointer mr-sm-5" @click="toggleTheme">
        <v-icon :color="$vuetify.theme.name" icon="mdi-theme-light-dark">
        </v-icon>
      </div>

      <LanguageSwitcher class="d-none d-sm-block" />
    </template>
  </v-app-bar>
</template>
