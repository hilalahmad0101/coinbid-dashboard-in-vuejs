<template >
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Users" />
      <div class="container mx-auto max-w-2xl sm:px-0 px-7">
        <router-link to="/user">
          <button
            class="bg-[#E27425] text-white rounded px-3 sm:py-2 py-1 sm:text-[19px] text-sm font-bold font-mulish sm:my-4 my-2 mb-0"
          >Go Back</button>
        </router-link>
      </div>
      <div class="bg-white rounded-md shadow my-5 container mx-auto max-w-2xl sm:px-0 px-7">
        <div
          class="bg-[#D7D8DB] rounded-t-md px-3 py-3 sm:text-[19px] text-sm font-bold font-mulish"
        >Update User</div>
        <div class="bg-white px-4 border rounded-b-md">
          <form @submit.prevent="updateUser">
            <div
              class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-0 lg:gap-4"
            >
              <div class="my-2">
                <label for="name" class="text-md block text-gray-700 font-bold mb-2">Name:</label>
                <input
                  type="text"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                  placeholder="Enter Name"
                  v-model="name"
                />
              </div>
              <div class="my-2">
                <label for="email" class="text-md block text-gray-700 font-bold mb-2">Email:</label>
                <input
                  type="text"
                  v-model="email"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div
              class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-0 lg:gap-4"
            >
              <div class="my-2">
                <label
                  for="contact"
                  class="text-md block text-gray-700 font-bold mb-2"
                >Contact Number:</label>
                <input
                  type="text"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                  placeholder="Enter Contact Number"
                  v-model="mobile"
                />
              </div>
              <div class="my-2">
                <label for="state" class="text-md block text-gray-700 font-bold mb-2">State:</label>
                <input
                  type="text"
                  class="border border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 outline-green-600 appearance-none"
                  placeholder="Enter State"
                  v-model="state"
                />
              </div>
            </div>
            <div class="my-2">
              <label for="city" class="text-md block text-gray-700 font-bold mb-2">City:</label>
              <input
                type="text"
                class="border outline-green-600 border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 appearance-none"
                placeholder="Enter City"
                v-model="city"
              />
            </div>
            <div class="my-2">
              <label for="city" class="text-md block text-gray-700 font-bold mb-2">Upload Profile:</label>
              <input
                type="file"
                class="border outline-green-600 border-gray-400 rounded-md text-md font-semibold w-full sm:py-2 sm:px-6 py-1 px-3 appearance-none"
                @change="onSelectImage"
              />
            </div>

            <img :src="profile" class="w-32" alt />
            <div class="flex items-center justify-center" v-if="isLoading">
              <button
                type="button"
                class="inline-flex items-center justify-center border border-gray-400 rounded-md font-bold bg-green-700 text-md text-white w-full sm:py-2 sm:px-6 py-1 px-3 my-2 appearance-none capitalize hover:bg-green-800 cursor-not-allowed"
                disabled
              >
                <svg
                  class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </button>
            </div>
            <div class="my-2" v-else>
              <button
                class="border border-gray-400 rounded-md font-bold bg-green-700 text-md text-white w-full sm:py-2 sm:px-6 py-1 px-3 my-2 appearance-none capitalize hover:bg-green-800"
                type="submit"
              >Save</button>
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
import { BASE_URL } from "../baseurl";
export default {
  data() {
    return {
      name: null,
      email: null,
      state: null,
      city: null,
      profile: null,
      mobile: null,
      isLoading: false,
      show: false
    };
  },
  methods: {
    onSelectImage(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.profile = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    showNavBar() {
      this.show = true;
    },
    hidebar() {
      this.show = false;
    },

    async getUser() {
      this.isLoading = true;
      const res = await (
        await fetch(`${BASE_URL}admin/edit/users/${this.$route.params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      if (res.success) {
        this.name = res.users.name;
        this.email = res.users.email;
        this.state = res.users.state;
        this.city = res.users.city;
        this.profile = res.users.profile;
        this.mobile = res.users.mobile;
      }
      this.isLoading = false;
    },
    async updateUser() {
      // const formdata = new FormData();
      // formdata.append("name", this.name);
      // formdata.append("email", this.email);
      // formdata.append("state", this.state);
      // formdata.append("city", this.city);
      // formdata.append("profile", this.profile);
      // formdata.append("mobile", this.mobile);
      const data = {
        name: this.name,
        email: this.email,
        state: this.state,
        city: this.city,
        profile: this.profile,
        mobile: this.mobile
      };
      this.isLoading = true;
      const res = await (
        await fetch(`${BASE_URL}admin/update/users/${this.$route.params.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      if (res.success) {
        this.$swal("success", res.message);
        this.isLoading = false;
        this.name = "";
        this.email = "";
        this.state = "";
        this.city = "";
        this.profile = "";
        this.mobile = "";
        this.$router.push("/user");
      }
    }
  },
  mounted() {
    this.getUser();
  },
  components: { Sidebar, Navbar }
};
</script>
<style>
</style>