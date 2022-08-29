<template>
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Live Update" />
      <div class="bg-white rounded-md shadow mx-10 my-5" :class="!isLoading ? 'p-0':'p-10'">
        <div class="text-center my-5" v-if="isLoading">
          <div role="status">
            <svg
              class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div class="h-[400px] overflow-y-scroll container mx-auto max-w-xl">
            <div v-for="(notify, index) in notification" :key="index">
              <div class="px-4 py-3 rounded-md my-2 bg-green-300">
                <strong>{{notify.message}}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import { BASE_URL } from "../baseurl";
export default {
  name: "BannerPage",
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      show: false,
      notification: [],
      isLoading: false,
      path: "http://localhost:500/uploads/"
    };
  },
  methods: {
    showNavBar() {
      this.show = true;
    },
    hidebar() {
      this.show = false;
    },
    async getAds() {
      this.isLoading = true;
      const res = await (
        await fetch(`${BASE_URL}admin/notification`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      console.log(res);
      if (res.success) {
        this.notification = res.notifications;
      }
      this.isLoading = false;
    }
    // async deleteAds(id) {
    //   const res = await (
    //     await fetch(`${BASE_URL}admin/notification`, {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         admin_access_token: localStorage.getItem("token")
    //       }
    //     })
    //   ).json();
    //   if (res.success) {
    //     alert(res.message);
    //     this.getAds();
    //   } else {
    //     alert(res.message);
    //   }
    // }
  },
  mounted() {
    this.getAds();
  }
};
</script>
<style >
</style>