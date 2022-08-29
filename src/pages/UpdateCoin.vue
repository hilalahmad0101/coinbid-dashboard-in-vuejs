<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Coin" />
      <div class="container mx-auto max-w-2xl">
        <router-link to="/coin">
          <button
            class="bg-[#E27425] text-white rounded px-3 py-2 text-[19px] font-bold font-mulish my-4"
          >Go Back</button>
        </router-link>
      </div>
      <div class="bg-white rounded-md shadow my-5 container mx-auto max-w-2xl">
        <div
          class="bg-[#D7D8DB] rounded-t-md px-3 py-3 text-[19px] font-bold font-mulish"
        >Update Coin</div>
        <div class="bg-white px-4 py-3">
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
          <form @submit.prevent="updateCoin" v-else>
            <div
              class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-0 lg:gap-4"
            >
              <div class="my-2">
                <label for="coins" class="text-md block text-gray-700 font-bold mb-2">Coins:</label>
                <input
                  type="text"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                  placeholder="Enter Coins"
                  v-model="coins"
                />
              </div>
              <div class="my-2">
                <label for="price" class="text-md block text-gray-700 font-bold mb-2">Price:</label>
                <input
                  type="text"
                  v-model="price"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                  placeholder="Enter Enter banner Price"
                />
              </div>
            </div>
            <div class="my-2">
              <label for="package" class="text-md block text-gray-700 font-bold mb-2">User:</label>
              <select
                class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                v-model="user"
              >
                <option value selected>Select User</option>
                <option
                  class="flex justify-between items-center"
                  v-for="(user, index) in users"
                  :key="index"
                  :value="user._id"
                >{{user.name}}</option>
              </select>
            </div>
            <div class="my-2">
              <button
                class="border border-gray-400 rounded-md font-bold bg-green-700 text-md text-white w-full py-2 px-6 appearance-none capitalize hover:bg-green-800"
                type="submit"
              >{{updateLoading ? 'Loading .....':'Save'}}</button>
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
      coins: "",
      price: "",
      user: null,
      show: false,
      isLoading: false,
      updateLoading: false
    };
  },
  methods: {
    showNavBar() {
      this.show = true;
    },
    hidebar() {
      this.show = false;
    },
    async getUser() {
      this.isLoading = true;
      const res = await (
        await fetch(`${BASE_URL}admin/user/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      if (res.success) {
        this.users = res.users;
        this.isLoading = false;
      }
    },
    async getData() {
      const res = await (
        await fetch(`${BASE_URL}admin/coin/${this.$route.params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      if (res.success) {
        this.coins = res.coins.coins;
        this.price = res.coins.price;
        this.user = res.coins.users;
      }
    },
    async updateCoin() {
      const data = {
        coins: this.coins,
        price: this.price,
        users: this.user
      };
      console.log(data);
      this.updateLoading = true;
      const res = await axios.put(
        `${BASE_URL}admin/coin/${this.$route.params.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        }
      );
      console.log(res.data);
      if (res.data.success) {
        this.$swal("success", res.data.message);
        this.coins = "";
        this.price = "";
        this.user = "";
        this.$router.push("/coin");
      } else {
        this.$swal("error", res.data.message);
      }
      this.updateLoading = false;
    }
  },
  components: { Sidebar, Navbar },
  mounted() {
    this.getData();
    this.getUser();
  }
};
</script>
<style >
</style>