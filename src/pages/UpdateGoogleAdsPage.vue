<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Google Ads" />
      <div class="container mx-auto max-w-2xl">
        <router-link to="/google/ads">
          <button
            class="bg-[#E27425] text-white rounded px-3 py-2 text-[19px] font-bold font-mulish my-4"
          >Go Back</button>
        </router-link>
      </div>
      <div class="bg-white rounded-md shadow my-5 container mx-auto max-w-2xl">
        <div
          class="bg-[#D7D8DB] rounded-t-md px-3 py-3 text-[19px] font-bold font-mulish"
        >Update Google Ads</div>
        <div class="bg-white px-4 py-3">
          <form @submit.prevent="updateCoin">
            <div class="space-y-4">
              <div class="my-2">
                <label for="app_id" class="text-md block text-gray-700 font-bold mb-2">App id:</label>
                <input
                  type="text"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                  placeholder="Enter App id"
                  v-model="app_id"
                />
              </div>
              <div class="my-2">
                <label for="price" class="text-md block text-gray-700 font-bold mb-2">Ad Unit Id:</label>
                <input
                  type="text"
                  v-model="ad_unit_id"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                  placeholder="Enter Ad Unit Id"
                />
              </div>
              <div class="my-2">
                <label for="coins" class="text-md block text-gray-700 font-bold mb-2">Coins:</label>
                <input
                  type="text"
                  v-model="coins"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                  placeholder="Enter Ad Coins"
                />
              </div>
            </div>
            <div class="my-2">
              <button
                class="border border-gray-400 rounded-md font-bold bg-green-700 text-md text-white w-full py-2 px-6 appearance-none capitalize hover:bg-green-800"
                type="submit"
              >{{isLoading ? 'Loading .....':'Save'}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import axios from "axios";
import { BASE_URL } from "../baseurl";
export default {
  data() {
    return {
      ad_unit_id: "",
      app_id: "",
      conis: "",
      show: false,
      isLoading: false
    };
  },
  methods: {
    showNavBar() {
      this.show = true;
    },
    hidebar() {
      this.show = false;
    },
    async getData() {
      const res = await (
        await fetch(`${BASE_URL}admin/ads/google/${this.$route.params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      if (res.success) {
        this.app_id = res.ad.app_id;
        this.ad_unit_id = res.ad.ad_unit_id;
        this.coins = res.ad.coins;
      }
    },
    async updateCoin() {
      const data = {
        app_id: this.app_id,
        coins: this.coins
      };
      this.isLoading = true;
      const res = await axios.put(
        `${BASE_URL}admin/ads/google/${this.$route.params.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        }
      );
      if (res.data.success) {
        this.$swal("success", res.data.message);
        this.app_id = "";
        this.coins = "";
        this.ad_unit_id = "";
        this.$router.push("/google/ads");
      } else {
        this.$swal("error", res.data.message);
      }
      this.isLoading = false;
    }
  },
  components: { Sidebar, Navbar },
  mounted() {
    this.getData();
  }
};
</script>
<style >
</style>