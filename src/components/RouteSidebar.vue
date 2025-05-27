<template>
  <div class="sidebar">
    <h2>노선 검색</h2>
    <input
        type="text"
        v-model="categoryKeyword"
        placeholder="카테고리명 입력 (예: 紅幹線)"
    />
    <ul>
      <li v-for="route in matchedRoutes" :key="route.RouteCode">
        {{ route.RouteName }}
      </li>
    </ul>
    <hr/>

    <div v-if="selectedRoute">
      <p><strong>노선명:</strong> {{ selectedRoute.name }}</p>
      <b-button
          size="sm"
          variant="dark"
          @click="queryBusInfo"
      >
        노선 정보
      </b-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const categoryKeyword = ref('');
const categories = ref([]); // AllBusRoutes.json 전체 데이터

onMounted(async () => {
  const res = await fetch('/AllBusRoutes.json');
  categories.value = await res.json();
});

const matchedRoutes = computed(() => {
  if (!categoryKeyword.value) return [];

  const matched = categories.value.find(c =>
      c.categoryName.includes(categoryKeyword.value)
  );

  return matched?.routes || [];
});

</script>

<style scoped>
.sidebar {
  width: 300px;
  height: 100vh;
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 1000;
}

.route-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.route-list li {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.route-list li:hover {
  background-color: #f0f0f0;
}
</style>
