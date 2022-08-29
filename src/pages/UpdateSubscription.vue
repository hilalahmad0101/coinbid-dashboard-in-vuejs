<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Subscription" />
      <div class="container mx-auto max-w-2xl sm:px-0 px-7">
        <router-link to="/subscription">
          <button
            class="bg-[#E27425] text-white rounded px-3 sm:py-2 py-1 sm:text-[19px] text-sm font-bold font-mulish sm:my-4 my-2 mb-0"
          >Go Back</button>
        </router-link>
      </div>
      <div class="bg-white rounded-md shadow my-5 container mx-auto max-w-2xl sm:px-0 px-7">
        <div
          class="bg-[#D7D8DB] rounded-t-md px-3 py-3 sm:text-[19px] text-sm font-bold font-mulish"
        >Update SubScription</div>
        <div class="bg-white px-4 py-3 border rounded-b-md">
          <form @submit.prevent="updatePackage">
            <div>
              <div
                class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-0 lg:gap-4"
              >
                <div class="my-2">
                  <label for="title" class="text-md block text-gray-700 font-bold mb-2">Title:</label>
                  <input
                    type="text"
                    class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                    placeholder="Enter Package Title"
                    v-model="title"
                  />
                </div>
                <div class="my-2">
                  <label for="price" class="text-md block text-gray-700 font-bold mb-2">Price:</label>
                  <input
                    type="number"
                    v-model="price"
                    class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                    placeholder="Enter Price"
                  />
                </div>
                <div class="my-2">
                  <label
                    for="total_ads"
                    class="text-md block text-gray-700 font-bold mb-2"
                  >Total ads:</label>
                  <input
                    type="number"
                    v-model="total_ads"
                    class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                    placeholder="Enter Total Ads"
                  />
                </div>

                <div class="my-2">
                  <label for="exp" class="text-md block text-gray-700 font-bold mb-2">Expired Date:</label>
                  <input
                    type="number"
                    v-model="exp"
                    class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                    placeholder="Enter Expired Date"
                  />
                </div>
                <div>
                  <div class="my-2">
                    <label for="price" class="text-md block text-gray-700 font-bold mb-2">Coins:</label>
                    <input
                      type="number"
                      v-model="coins"
                      class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                      placeholder="Enter Coins in package"
                    />
                  </div>
                </div>
                <div class="flex items-center">
                  <input
                    v-model="recommended"
                    id="checked-checkbox"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-black"
                  >Is Recommended</label>
                </div>
              </div>
              <div class="my-2">
                <label
                  for="images"
                  class="text-md block text-gray-700 font-bold mb-2"
                >Upload Images:</label>
                <input
                  type="file"
                  class="border outline-green-600 border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 appearance-none"
                  placeholder="Upload Image"
                  multiple
                  @change="onFileChange"
                />
                <img :src="old_image" class="h-12 w-12" alt />
              </div>
              <div class="my-2">
                <button
                  class="border border-gray-400 rounded-md font-bold bg-green-700 text-md text-white w-full py-2 px-3 appearance-none capitalize hover:bg-green-800"
                  type="submit"
                >{{isLoading ? 'Loading...':'Save'}}</button>
              </div>
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
      title: null,
      price: null,
      icon: null,
      exp: null,
      coins: null,
      recommended: false,
      old_image: null,
      total_ads: null,
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
    onFileChange(e) {
      this.image = e.target.files[0];
    },

    // onDateChange(e) {
    //   const date = new Date(e.target.value);
    //   const currentDate = new Date();
    //   const diff = date.getTime() - currentDate.getTime();
    //   const total = Math.ceil(diff / (1000 * 3600 * 24));
    //   this.totalDays = total + " is remaining";
    // },

    async getData() {
      const res = await (
        await fetch(`${BASE_URL}admin/package/plan/${this.$route.params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      if (res.success) {
        this.title = res.packages.title;
        this.price = res.packages.price;
        this.exp = res.packages.expire_date;
        this.old_image = res.packages.icon;
        this.coins = res.packages.coins;
        this.total_ads = res.packages.total_ads;
        this.recommended = res.packages.recommended;
      }
    },
    async updatePackage() {
      const formdata = new FormData();
      formdata.append("image", this.image);
      formdata.append("title", this.title);
      formdata.append("price", this.price);
      formdata.append("total_ads", this.total_ads);
      formdata.append("expire_date", this.exp);
      formdata.append("recommended", this.recommended ? true : false);
      formdata.append("coins", this.coins);
      // const data = {
      //   title: this.title,
      //   price: this.price,
      //   expire_date: this.exp,
      //   recommended: this.recommended ? true : false,
      //   coins: this.coins
      // };
      this.isLoading = true;
      const res = await axios.put(
        `${BASE_URL}admin/package/plan/${this.$route.params.id}`,
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        }
      );
      if (res.data.success) {
        this.$swal("success", res.data.message);
        this.title = "";
        this.price = "";
        this.exp = "";
        this.$router.push("/subscription");
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
