<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="WithDrawal Posted" />
      <div class="bg-white px-4 py-7 rounded-md shadow my-4 mx-9">
        <div class="font-extrabold text-4xl text-center">Withdrawl Request Verfication</div>
        <form action @submit.prevent="uploadFile">
          <div
            class="container mx-auto max-w-4xl bg-red-200 rounded-lg border border-red-500 mt-20"
          >
            <div class="flex flex-col w-full items-center justify-center bg-grey-lighter p-20">
              <label
                class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue text-black"
              >
                <svg
                  class="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                  />
                </svg>
                <span class="mt-2 text-base leading-normal">Select a file</span>
                <input type="file" class="hidden" @change="onFileChange" />
              </label>
              <h1 class="mt-9 text-xl">file size megabyte 2mb maximum or less than</h1>
            </div>
          </div>
          <div class="flex justify-end container mx-auto max-w-4xl mt-4">
            <button
              class="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
            >{{isLoading ? 'Loading...':'Verify'}}</button>
          </div>
        </form>
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
  name: "verifyPage",
  components: { Sidebar, Navbar },
  data() {
    return {
      show: false,
      file: "",
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
    async onFileChange(e) {
      this.file = e.target.files[0];
    },
    async uploadFile() {
      const formdata = new FormData();
      formdata.append("file", this.file);
      this.isLoading = true;
      const res = await axios.post(`${BASE_URL}admin/verify`, formdata, {
        headers: {
          admin_access_token: localStorage.getItem("token")
        }
      });
      this.$swal("success", "Approved Successfully");
      this.isLoading = false;
    }
  }
};
</script>
<style >
</style>