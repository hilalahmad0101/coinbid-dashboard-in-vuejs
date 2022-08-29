
<template>
  <!-- content -->
  <div class="container mx-auto">
    <div class="mx-5 mt-10">
      <DashboardCard />
      <GraphCard />
      <WithDraw />
    </div>
  </div>
</template>
<script>
import DashboardCard from "./DashboardCard.vue";
import GraphCard from "./GraphCard.vue";
import WithDraw from "./WithDraw.vue";
import { useStore } from "../store";
import { onMounted } from "vue";
export default {
  name: "DashboardComp",
  components: { DashboardCard, GraphCard, WithDraw }
};
</script>
<style>
</style>