<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Tax" />
      <div class="container mx-auto max-w-2xl">
        <router-link to="/tax">
          <button
            class="bg-[#E27425] text-white rounded px-3 py-2 text-[19px] font-bold font-mulish my-4"
          >Go Back</button>
        </router-link>
      </div>
      <div class="bg-white rounded-md shadow my-5 container mx-auto max-w-2xl">
        <div
          class="bg-[#D7D8DB] rounded-t-md px-3 py-3 text-[19px] font-bold font-mulish"
        >Update Tax</div>
        <div class="bg-white px-4 py-3">
          <form @submit.prevent="updateTax">
            <div class="my-2">
              <label for="coins" class="text-md block text-gray-700 font-bold mb-2">Tax:</label>
              <input
                type="text"
                class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                placeholder="Enter tax"
                v-model="taxs"
              />
            </div>
            <div class="my-2">
              <button
                class="border border-gray-400 rounded-md font-bold bg-green-700 text-md text-white w-full py-2 px-6 appearance-none capitalize hover:bg-green-800"
                type="submit"
              >{{isLoading ? 'Loading...':'Save'}}</button>
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
      taxs: "",
      isLoading: false,
      show: false
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
        await fetch(`${BASE_URL}admin/tax/${this.$route.params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      if (res.success) {
        this.taxs = res.tax.taxs;
      }
    },
    async updateTax() {
      const data = {
        taxs: this.taxs
      };
      this.isLoading = true;
      const res = await axios.put(
        `${BASE_URL}admin/tax/${this.$route.params.id}`,
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
        this.coins = "";
        this.$router.push("/tax");
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