<script setup lang="ts">
import { useCurrentDate } from "@/composables/functions";
import { ref } from "vue";

// Data
const dialog = ref<boolean>(false);
const packageDetailsInfo = ref<any>({});
const links = ref<string[]>(["npm", "homepage", "repository", "bugs"]);

// Props
defineProps({
  packageDetails: { type: Object, default: () => ({}) },
});

// Methods
const openModal = (item: Record<string, any>) => {
  dialog.value = true;
  packageDetailsInfo.value = { ...item };
};

// Expose
defineExpose({ openModal });
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="700px"
    transition="dialog-bottom-transition">
    <v-card>
      <div class="pa-5">
        <div class="d-flex flex-wrap justify-space-between">
          <div>
            <v-card-title>
              {{ $t("packageName") }}: {{ packageDetailsInfo.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ $t("publisherName") }}: {{ packageDetailsInfo.publisher.username }}
              </v-card-subtitle>
            <v-card-subtitle>
              {{ $t("publisherEmail") }}: {{ packageDetailsInfo.publisher.email }}
            </v-card-subtitle>
          </div>
          <v-avatar class="ma-3" size="125" rounded="0">
            <v-img
              :src="`https://github.com/${packageDetailsInfo.publisher.username}.png`"
              alt="publisher-avatar">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5">
                  </v-progress-circular>
                </v-row>
              </template>
              <template v-slot:error>
                <div>
                  <v-img src="@/assets/cry-smile.svg" width="100" alt="error-avatar"></v-img>
                </div>
              </template>
            </v-img>
          </v-avatar>
        </div>
        <hr />
        <div>
          <v-card-title>{{ $t("detailInfo") }}</v-card-title>
          <v-card-text>
            <span class="font-weight-bold">{{ $t("version") }}: </span>{{ packageDetailsInfo.version }}
          </v-card-text>
          <v-card-text>
            <span class="font-weight-bold">{{ $t("description") }}: </span>{{ packageDetailsInfo.description }}</v-card-text>
          <v-card-text>
            <span class="font-weight-bold">{{ $t("keywords") }}: </span>{{ packageDetailsInfo.keywords?.join(", ") }}</v-card-text>
          <v-card-text>
            <span class="font-weight-bold">{{ $t("date") }}: </span>{{ useCurrentDate(packageDetailsInfo?.date) }}
          </v-card-text>
          <hr />
          <v-card-title>{{ $t("links") }}</v-card-title>
          <v-card-text v-for="link in links" :key="link">
            {{ $t(`${link}`) }}:
            <a target="_blank" :href="`${packageDetailsInfo.links[link]}`">{{ packageDetailsInfo.links[link] }}</a>
          </v-card-text>
          <hr />
          <v-card-title>{{ $t("maintainers") }}</v-card-title>
          <v-card-text
            v-for="maintainer in packageDetailsInfo.maintainers"
            :key="maintainer.username">
            <span>{{ $t("username") }}: {{ maintainer.username }}</span>
            <br />
            <span>{{ $t("email") }}: {{ maintainer.email }}</span>
          </v-card-text>
        </div>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">{{ $t("close")}}</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>
