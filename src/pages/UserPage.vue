<script setup>
import { inject, onMounted, ref } from "vue";
import { useStore } from "../store";
const store = useStore();
const swal = inject("$swal");
const users = ref([]);
const page = ref(1);
const limit = ref(20);
const loading = ref(false);

const getUser = async () => {
  loading.value = true;
  const res = await (
    await fetch(
      `${BASE_URL}admin/users?page=${page.value}&limit=${limit.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          admin_access_token: localStorage.getItem("token")
        }
      }
    )
  ).json();
  users.value = res.users;
  loading.value = false;
};

const prev = async () => {
  loading.value = true;
  const res = await (
    await fetch(
      `${BASE_URL}admin/users?page=${page.value - 1}&limit=${limit.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          admin_access_token: localStorage.getItem("token")
        }
      }
    )
  ).json();
  users.value = res.users;
  loading.value = false;
};
const next = async () => {
  loading.value = true;
  const res = await (
    await fetch(
      `${BASE_URL}admin/users?page=${page.value + 1}&limit=${limit.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          admin_access_token: localStorage.getItem("token")
        }
      }
    )
  ).json();
  users.value = res.users;
  loading.value = false;
};

onMounted(() => {
  getUser();
});

const deleteUser = async id => {
  const res = await (
    await fetch(`${BASE_URL}admin/delete/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        admin_access_token: localStorage.getItem("token")
      }
    })
  ).json();
  if (res.success) {
    swal("success", res.message);
    getUser();
  } else {
    swal("error", res.message);
  }
};
// const showDrop = id => {
//   store.users.filter(val => {
//     if (val._id !== id) {
//       drop.value = false;
//     } else {
//       drop.value = true;
//     }
//   });
// };
</script>
<template>
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Users" />
      <div class="bg-white rounded-md shadow mx-10 my-5 overflow-y-scroll lg:overflow-y-hidden">
        <div class="text-center my-5" v-if="loading">
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
          <table class="w-full">
            <thead class="bg-[#D7D8DB] px-3 py-4">
              <tr>
                <td class="text-left sm:px-6 sm:py-5 px-3 py-2">User Name</td>
                <td class="text-left sm:px-6 sm:py-5 px-3 py-2">Contact Number</td>
                <td class="text-left sm:px-6 sm:py-5 px-3 py-2">State</td>
                <td class="text-left sm:px-6 sm:py-5 px-3 py-2">District</td>
                <td class="text-left sm:px-6 sm:py-5 px-3 py-2">City</td>
                <td class="text-left sm:px-6 sm:py-5 px-3 py-2"></td>
              </tr>
            </thead>
            <tbody v-for="(user, index) in users" :key="index" class="border-b">
              <tr>
                <td
                  class="text-[16px] font-[700] text-gray-900 whitespace-nowrap flex items-center px-6 py-5"
                >
                  <img :src="user.profile" class="w-8 h-8 rounded-full" alt />
                  <span class="ml-4 text-[16px] font-semibold font-mulish">{{user.name}}</span>
                </td>
                <td
                  class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                >{{user.contact}}</td>
                <td
                  class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                >{{user.state}}</td>
                <td
                  class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                >{{user.city}}</td>
                <td
                  class="py-4 px-6 mt-0 text-sm font-medium text-gray-900 whitespace-nowrap"
                >{{user.state}}</td>
                <td class="flex">
                  <router-link :to="'/edit/users/'+user._id">
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-5 fill-green-500 hover:fill-green-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                  </router-link>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 fill-red-500 hover:fill-red-700"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      @click="deleteUser(user._id)"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="w-7 h-7 border rounded-full p-1 cursor-pointer"
                    @click="showDrop(user._id)"
                    id="user._id"
                  >
                    <path
                      d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
                    />
                  </svg>
                  <div
                    class="absolute bg-white right-16 shadow-md rounded-lg top-5 z-10 space-y-2"
                    :class="drop ? 'block' :'hidden' "
                  >
                    <h1 class="text-xl font-mulish m-3 px-3 py-1 w-52 bg-[#E27425]">Edit</h1>
                    <h1 class="text-xl font-mulish m-3 px-3 py-1 w-52 bg-[#E27425]">View</h1>
                    <h1 class="text-xl font-mulish m-3 px-3 py-1 w-52 bg-[#E27425]">Delete</h1>
                  </div>-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="flex items-center justify-between px-10">
          <button
            class="bg-[#E27425] text-white rounded px-3 sm:py-2 py-1 sm:text-[19px] text-sm font-bold font-mulish sm:my-4 my-2 mb-0"
            @click="prev"
          >Prev</button>
          <button
            class="bg-[#E27425] text-white rounded px-3 sm:py-2 py-1 sm:text-[19px] text-sm font-bold font-mulish sm:my-4 my-2 mb-0"
            @click="next"
          >Next</button>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import { useStore } from "../store";
import { onMounted } from "vue";
import { BASE_URL } from "../baseurl";
export default {
  name: "UserPage",
  components: { Sidebar, Navbar },
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
    },
    showNavBar() {
      this.show = true;
    },
    hidebar() {
      this.show = false;
    }
  }
};
</script>
<style >
</style>