<script lang="ts" setup>
import { ref } from "vue";
import { useAppStore } from "@/store/app";
import { useAlphaNumericValue, useLocalStorageSaver } from "@/composables/functions";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// Store
const dataStore = useAppStore();

// Data
const inputValue = ref<string>("");
const bookmarks = ref<string[]>(JSON.parse(localStorage.getItem("bookmarks") || "[]"));
const rules = ref({
  required: (value: string) => useAlphaNumericValue(value) || t("enterLatinPackageName") });
const isShowBookmarksError = ref<boolean>(false);

// Methods
const searchByBookmark = (chipValue: string): void => {
  inputValue.value = chipValue;
  emit("searchParams", chipValue);
};

const addToBookmarks = (): void => {
  if (bookmarks.value.length < 5) {
    const value = inputValue.value.trim();
    if (value.length) bookmarks.value.push(value);
    useLocalStorageSaver("bookmarks", bookmarks.value);
  } else isShowBookmarksError.value = true;
};

const removeFromBookmarks = (value: string): void => {
  const index = bookmarks.value.indexOf(value);
  if (index !== -1) bookmarks.value.splice(index, 1);
  useLocalStorageSaver("bookmarks", bookmarks.value);
};

// Emits
const emit = defineEmits(["searchParams"]);
</script>

<template>
  <v-card flat class="search-input pa-5 mt-10 transition">
    <v-text-field
      v-model.trim="inputValue"
      :label="$t('enterPackageName')"
      :loading="!dataStore.isLoad"
      :append-inner-icon="bookmarks.includes(inputValue)
        ? 'mdi-bookmark-off-outline'
        : 'mdi-bookmark-outline'"
      :rules="inputValue ? [rules.required] : []"
      variant="outlined"
      autofocus
      flat
      @blur="isShowBookmarksError = false"
      @click:append-inner="bookmarks.includes(inputValue)
        ? removeFromBookmarks(inputValue)
        : addToBookmarks()"
      @input="$emit('searchParams', $event)">
    </v-text-field>
    <div>
      <div v-show="isShowBookmarksError" class="error-color fs-12 transition">
        {{ $t("noMoreThanFiveBookmarks") }}
      </div>
      <v-chip-group>
        <v-chip
          v-for="(bookmark, index) in bookmarks"
          closable
          small
          class="transition"
          close-icon="mdi-close"
          :key="index + bookmark"
          @click:close="removeFromBookmarks(bookmark)"
          @click="searchByBookmark(bookmark)">
          {{ bookmark }}
        </v-chip>
      </v-chip-group>
    </div>
  </v-card>
</template>
