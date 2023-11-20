<script lang="ts" setup>
import SearchBar from "@/components/SearchBar.vue";
import Table from "@/components/Table.vue";
import { ref, onMounted } from "vue";
import { useAppStore } from "@/store/app";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

// Interface
interface HeaderItem {
  title: string;
  key: string;
  width: string;
}

// Data
const modal = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout>;
const headers = ref<HeaderItem[]>([
  { title: t("title"), key: "name", width: "15%" },
  { title: t("version"), key: "version", width: "15%" },
  { title: t("scope"), key: "scope", width: "15%" },
  { title: t("searchScore"), key: "searchScore", width: "20%" },
  { title: t("description"), key: "description", width: "30%" },
]);

// Store
const dataStore = useAppStore();

// Hooks
onMounted(() => {
  if (route.query.q) router.push({ query: {} });
});

// Methods
const showModal = (item: Record<string, any>): void => modal.value.openModal(item);

const startSearch = (event: Event | string): void => {
  const params = typeof event === "string" 
    ? event.replace(/\s/g, "") 
    : (event.target as HTMLInputElement).value.replace(/\s/g, "");
  clearTimeout(timer);
  if (!params) {
    dataStore.$reset();
    router.push({ query: {} });
    return;
  }
  router.push({ query: { q: params }});
  timer = setTimeout(() => {
    dataStore.getPackages({ searchText: params });
  }, 1000);
};

const changePage = (page: number, perPage: number): void => {
  const { q } = route.query;
  if (typeof q === "string") {
    const searchFrom = (page - 1) * perPage;
    router.push({ query: { ...route.query, page } });
    dataStore.getPackages({ searchText: q, searchFrom });
  }
};
</script>

<template>
  <div class="d-flex flex-column fill-height justify-start align-center ga-10 px-5 px-sm-0">
    <SearchBar @searchParams="(value) => startSearch(value)" />
    <Table 
      :currentLoading="!dataStore.isLoad" 
      :currentMaxFromSize="500" 
      :currentHeaders="headers"
      :currentData="dataStore.packages" 
      @changePage="(page, perPage) => changePage(page, perPage)"
      @openDetails="(item) => showModal(item)" />
  </div>
  <ModalWindow ref="modal" />
</template>
