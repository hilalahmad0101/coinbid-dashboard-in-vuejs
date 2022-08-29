<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Video Ads" />
      <div class="container mx-auto max-w-2xl">
        <router-link to="/video-ads">
          <button
            class="bg-[#E27425] text-white rounded px-3 py-2 text-[19px] font-bold font-mulish my-4"
          >Go Back</button>
        </router-link>
      </div>
      <div class="bg-white rounded-md shadow my-5 container mx-auto max-w-2xl">
        <div
          class="bg-[#D7D8DB] rounded-t-md px-3 py-3 text-[19px] font-bold font-mulish"
        >Create Ads</div>
        <div class="bg-white px-4 py-3">
          <form @submit.prevent="createAds">
            <div>
              <div
                class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-0 lg:gap-4"
              >
                <div class="my-2">
                  <label for="title" class="text-md block text-gray-700 font-bold mb-2">Title:</label>
                  <input
                    type="text"
                    class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                    placeholder="Enter Ads Title"
                    v-model="title"
                  />
                </div>
                <div class="my-2">
                  <label for="coins" class="text-md block text-gray-700 font-bold mb-2">Coins:</label>
                  <input
                    type="number"
                    v-model="coins"
                    class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                    placeholder="Enter Coins"
                  />
                </div>
              </div>
              <!-- <div class="my-2">
                <label for="package" class="text-md block text-gray-700 font-bold mb-2">Package:</label>
                <select
                  class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                  v-model="pack_id"
                >
                  <option value selected disabled>Select Packages</option>
                  <option
                    class="flex justify-between items-center"
                    v-for="(pk, index) in packages"
                    :key="index"
                    :value="pk._id"
                  >
                    {{pk.title}},
                    {{pk.price}} Price
                  </option>
                </select>
              </div>-->
              <!-- <div class="my-2">
                <label
                  for="images"
                  class="text-md block text-gray-700 font-bold mb-2"
                >Upload Video:</label>
                <input
                  type="file"
                  class="border outline-green-600 border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 appearance-none"
                  placeholder="Upload Image"
                  multiple
                  @change="onFileChange"
                />
              </div>-->
              <div class="my-2">
                <label for="video" class="text-md block text-gray-700 font-bold mb-2">Upload Video:</label>
                <input
                  type="file"
                  class="border outline-green-600 border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 appearance-none"
                  placeholder="Upload Video"
                  multiple
                  @change="onChangeVideo"
                />
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
      title: "",
      coins: "",
      //   image: "",
      video: "",
      packages: [],
      //   pack_id: "",
      video: "",
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
    onChangeVideo(e) {
      this.video = e.target.files[0];
    },
    async createAds() {
      const formdata = new FormData();
      formdata.append("title", this.title);
      formdata.append("coins", this.coins);
      formdata.append("video", this.video);

      this.isLoading = true;
      const res = await axios.post(`${BASE_URL}admin/video/ads`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          admin_access_token: localStorage.getItem("token")
        }
      });
      if (res.data.success) {
        this.$swal("success", res.data.message);
        this.video = "";
        this.title = "";
        this.coins = "";
        this.$router.push("/video-ads");
      } else {
        this.$swal("error", res.data.message);
      }
      this.isLoading = false;
    }
    // async getPackages() {
    //   const res = await (
    //     await fetch(`${BASE_URL}admin/package/plan`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         admin_access_token: localStorage.getItem("token")
    //       }
    //     })
    //   ).json();
    //   if (res.success) {
    //     this.packages = res.packages;
    //   }
    // }
  },
  components: { Sidebar, Navbar }
  //   mounted() {
  //     this.getPackages();
  //   }
};
</script>
<style >
</style>