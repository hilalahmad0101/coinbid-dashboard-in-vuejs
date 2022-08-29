<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Banner" />
      <div class="container mx-auto max-w-2xl">
        <router-link to="/banner">
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
          <form @submit.prevent="createBanner">
            <div>
              <div
                class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-0 lg:gap-4"
              >
                <div class="my-2">
                  <label for="title" class="text-md block text-gray-700 font-bold mb-2">Title:</label>
                  <input
                    type="text"
                    class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                    placeholder="Enter Banner Title"
                    v-model="title"
                  />
                </div>
                <div class="my-2">
                  <label for="price" class="text-md block text-gray-700 font-bold mb-2">Color:</label>
                  <input
                    type="color"
                    v-model="color"
                    class="border border-gray-400 rounded-md text-md font-semibold w-full py-2 px-3 outline-green-600 appearance-none"
                    placeholder="Enter Color"
                  />
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
                <img :src="showImage" alt class="w-32" />
              </div>
              <div class="my-2">
                <button
                  class="border border-gray-400 rounded-md font-bold bg-green-700 text-md text-white w-full py-2 px-3 appearance-none capitalize hover:bg-green-800"
                  type="submit"
                >{{isLoading ? 'Loading......':'Save'}}</button>
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
      show: false,
      image: "",
      title: "",
      showImage: "",
      color: "",
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
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.showImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async createBanner() {
      const formdata = new FormData();
      formdata.append("image", this.image);
      formdata.append("title", this.title);
      formdata.append("color", this.color);
      // const data = {
      //   image: this.image,
      //   title: this.title,
      //   color: this.color
      // };
      this.isLoading = true;
      const res = await axios.post(`${BASE_URL}admin/banner`, formdata, {
        headers: {
          "Content-Type": "application/json",
          admin_access_token: localStorage.getItem("token")
        }
      });
      if (res.data.success) {
        this.$swal("success", res.data.message);
        this.image = "";
        this.$router.push("/banner");
      } else {
        this.$swal("error", res.data.message);
      }
      this.isLoading = false;
    }
    // async getPackages() {
    //   const res = await (
    //     await fetch("http://localhost:5000/admin/package/plan", {
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
  components: { Sidebar, Navbar },
  mounted() {
    // this.getPackages();
  }
};
</script>
<style >
</style>