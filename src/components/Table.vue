<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

// Data
const page = ref<number>(1);
const perPage = ref<number>(10);

// Props
const props = defineProps({
  currentData: { type: Object, default: () => ({}) },
  currentHeaders: { type: Array, default: () => [] },
  currentMaxFromSize: { type: Number, default: 0 },
  currentLoading: { type: Boolean, default: false },
});

// Emits
const emit = defineEmits(["openDetails", "changePage"]);

// Согласно документации The offset in which to start searching from (max of 5000)
// поэтому было ограничено кол-во записей
// Computed
const pagesQuantity = computed(() =>
  Math.min(
    Math.floor(props.currentMaxFromSize / perPage.value) + 1,
    Math.ceil(props.currentData.total / perPage.value)
  )
);

//Watchers
watch(
  () => route.query.page,
  (newValue) => {
    if (!newValue) page.value = 1;
  }
);

// Methods
const openDetails = (row: unknown): void => {
  if (typeof row === "object" && row !== null) {
    const typedRow = row as { package: unknown };
    emit("openDetails", typedRow.package);
  }
};

const handlePagination = (): void => {
  emit("changePage", page.value, perPage.value);
};
</script>

<template>
  <div class="table-wrapper mb-10 transition">
    <v-data-table
      height="600"
      :loading="currentLoading"
      :headers="currentHeaders"
      :items="currentData.results"
      :no-data-text="$t('noData')"
      @click:row="(item, row) => openDetails(row.item)">
      <template v-if="$vuetify.display.smAndDown" #item="{ item }">
        <div class="d-flex flex-column mobile-table_wrapper">
          <div
            v-for="header in currentHeaders"
            :key="header.key"
            class="d-flex justify-space-between mobile-table_wrapper-info"
            @click="openDetails(item, row)">
            <div class="flex-2 font-weight-medium">{{ $t(header.title) }}</div>
            <div class="flex-1 text-end">{{ item.package[header.key] }}</div>
          </div>
        </div>
      </template>

      <template #item.name="{ item }">
        <div class="text-overflow">{{ item.package.name }}</div>
      </template>

      <template #item.version="{ item }">
        <div class="text-overflow">{{ item.package.version }}</div>
      </template>

      <template #item.scope="{ item }">
        <v-chip :color="item.package.scope === 'unscoped' ? 'red' : 'green'">
          {{ item.package.scope }}
        </v-chip>
      </template>

      <template #item.description="{ item }">
        <div class="text-overflow">{{ item.package.description }}</div>
      </template>

      <template #item.searchScore="{ item }">
        <v-rating
          readonly
          :length="5"
          :size="24"
          :model-value="Math.round(item.searchScore)"
          active-color="primary" />
      </template>

      <template v-slot:bottom>
        <div v-if="currentData.results" class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pagesQuantity"
            :total-visible="$vuetify.display.smAndDown ? 1 : 5"
            @update:modelValue="handlePagination">
          </v-pagination>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
