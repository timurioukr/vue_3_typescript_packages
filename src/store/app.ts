import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ResultsResponse, ResultItem, SearchParams } from "@/models/item.model";
import axios from "axios";

export const useAppStore = defineStore("app", () => {
  // State
  const isLoad = ref<boolean>(true);
  const packages = ref<ResultsResponse[]>([]);

  // При большем количестве роутов, было бы логично использовать
  // process.env.VUE_APP_API с импортом файла перечня эндпоинтов

  // Actions
  async function getPackages(params: SearchParams) {
    isLoad.value = false;
    const { searchText, searchSize = 10, searchFrom = 0 } = params;
    try {
      const response = await axios.get(
        `https://api.npms.io/v2/search?q=${searchText}&size=${searchSize}&from=${searchFrom}`
      );
      packages.value = response.data as ResultsResponse[];
    } catch (error) {
      console.error(error);
    } finally {
      isLoad.value = true;
    }
  }

  // Согласно документации Pinia,
  // composition API не имеет встроенной функции для сброса сторы
  function $reset() {
    packages.value = [];
  }

  // Несмотря на то, что API имеет эндпоинт package/:name
  // на получение всей информации о пакете и учитывая отсутствие
  // требования к использованию именно такого способа получения и вывода доп информации
  // я решил вывести уже имеющуюся информацию используя Геттер

  //Getters
  const packageDetail = computed(() => (name: string) => {
    return packages.value.results?.find(
      (item: ResultItem) => item.package.name === name
    );
  });

  return { packages, isLoad, getPackages, packageDetail, $reset };
});
