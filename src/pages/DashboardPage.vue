<script setup>
import Navbar from "../components/Navbar.vue";
import Dashboard from "../components/Dashboard.vue";
import UserPage from "./UserPage.vue";
import UserWithDrawRequest from "./UserWithDrawRequest.vue";
import VerifyPage from "./VerifyPage.vue";
import Sidebar from "../components/Sidebar.vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";
import { onMounted, watch, watchEffect } from "vue";
const store = useStore();
const router = useRouter();
onMounted(() => {
  store.getAdmin();
  //   console.log(store.admin.success);
  //   if (store.admin.success == true) {
  //     console.log(store.admin);
  //   } else {
  //     // store.logout();
  //     // router.push("/");
  //     console.log("false");
  //   }
});
watch(() => {
  store.getAdmin();
});
</script>

<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Dashboard" />
      <Dashboard />
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardPage",
  data() {
    return {
      show: false
    };
  },
  methods: {
    showNavBar() {
      this.show = true;
    },
    hidebar() {
      this.show = false;
    }
  }
};
</script>
<style>
</style>