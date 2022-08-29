<script setup>
import { inject, onMounted, ref, watchEffect } from "vue";
import { useStore } from "../store";
const store = useStore();
const swal = inject("$swal");
const banks = ref([]);
const isLoading = ref(false);

const getBank = async () => {
  isLoading.value = true;
  const res = await (
    await fetch(`${BASE_URL}admin/banks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        admin_access_token: localStorage.getItem("token")
      }
    })
  ).json();
  if (res.success) {
    banks.value = res.banks;
  }
  isLoading.value = false;
};

const approved = async id => {
  if (confirm("Are you Sure you want to Approve the bank")) {
    const res = await (
      await fetch(`${BASE_URL}admin/bank/approve/${id}`, {
        method: "PUT",
        headers: {
          admin_access_token: localStorage.getItem("token")
        }
      })
    ).json();
    swal("Success", "Request Approved Successfully");
    getBank();
  }
};

const rejected = async id => {
  if (confirm("Are you Sure you want to Reject the bank")) {
    const res = await (
      await fetch(`${BASE_URL}admin/bank/rejected/${id}`, {
        method: "PUT",
        headers: {
          admin_access_token: localStorage.getItem("token")
        }
      })
    ).json();
    alert("Request rejected Successfully");
    getBank();
  }
};
onMounted(() => {
  getBank();
});
</script>

<template>
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Approve Bank" />
      <div class="bg-white rounded-md shadow mx-10 my-5" :class="!isLoading  ? 'p-0':'p-10'">
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
          <div class="flex justify-between items-center px-4">
            <!-- <vue-excel-xlsx
              :data="store.banks"
              :columns="columns"
              :file-name="'filename'"
              :file-type="'xlsx'"
              :sheet-name="'sheetname'"
            >Download</vue-excel-xlsx>-->
            <!-- <div class="relative">
            <button
              class="flex items-center px-3 py-2 bg-[#009D6C] leading-tight text-white font-medium text-[16px] uppercase rounded-xl shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              @click="dropdown1"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 18"
                fill="none"
                class="mr-3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM5 10V14H7V10H5ZM9 4V14H11V4H9ZM13 7V14H15V7H13Z"
                  fill="white"
                />
              </svg>

              <span class="text-white font-medium text-md">Status</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 ml-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div v-if="drop" class="bg-white rounded-xl shadow-md absolute w-[350px] top-14 left-0">
              <div class="flex justify-between items-center py-3 px-4">
                <h1 class="text-xl font-bold">Status</h1>
                <h1 class="text-md text-[#E27425] text-medium">Clear</h1>
              </div>
              <div class="mx-2 my-1">
                <div class="bg-gray-200 flex items-center justify-around py-2 rounded-xl">
                  <h1 class="bg-white py-2 px-10 rounded-lg">Include</h1>
                  <h1>Exclude</h1>
                </div>
                <div class="my-4">
                  <h1
                    class="p-3 my-1 cursor-pointer flex items-center justify-between rounded-md bg-green-600/25"
                  >
                    <span>Pending</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-green-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </h1>
                  <h1
                    class="p-3 my-1 cursor-pointer flex items-center justify-between rounded-md hover:bg-red-600/25"
                  >
                    <span>Paid</span>
                    <span class="hover:block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 hidden fill-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </h1>
                  <h1
                    class="p-3 my-1 cursor-pointer flex items-center justify-between rounded-md bg-yellow-600/25"
                  >
                    <span>Unpaid</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 fill-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </h1>
                  <h1
                    class="p-3 my-1 cursor-pointer flex items-center justify-between rounded-md hover:bg-green-600/25"
                  >
                    <span>Pending</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 hidden fill-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </h1>
                </div>
              </div>
            </div>
            </div>-->
            <!-- <div class="relative">
            <button
              class="flex items-center px-4 py-1 bg-[#F5F5F5] leading-tight text-black font-medium text-sm uppercase rounded-full shadow-md hover:bg-[#F5F5F5] hover:shadow-lg focus:bg-[#F5F5F5] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out relative"
              @click="dropdown2"
            >
              <span class="text-black font-mulish font-medium text-sm">Sort By</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              v-if="drop1"
              class="bg-white rounded-lg shadow-md absolute sm:w-[300px] w-[200px] top-14 left-0"
            >
              <div class="my-1 mx-2">
                <div class="my-1">
                  <h1
                    class="sm:p-3 p-1 my-1 cursor-pointer flex items-center justify-between rounded-md bg-green-600/25"
                  >
                    <span>By Date</span>
                  </h1>
                  <h1
                    class="sm:p-3 p-1 my-1 cursor-pointer flex items-center justify-between rounded-md hover:bg-red-600/25"
                  >
                    <span>By Paid</span>
                  </h1>
                  <h1
                    class="sm:p-3 p-1 cursor-pointer flex items-center justify-between rounded-md hover:bg-yellow-600/25"
                  >
                    <span>By UnPaid</span>
                  </h1>
                </div>
              </div>
            </div>
            </div>-->
          </div>
          <div class="overflow-y-scroll lg:overflow-y-hidden">
            <table class="w-full">
              <thead class="bg-[#D7D8DB] px-3 py-4">
                <tr>
                  <td class="text-left sm:px-6 sm:py-5 px-3 py-2">User Name</td>
                  <td class="text-left sm:px-6 sm:py-5 px-3 py-2">Bank Name</td>
                  <td class="text-left sm:px-6 sm:py-5 px-3 py-2">Account Number</td>
                  <td class="text-left sm:px-6 sm:py-5 px-3 py-2">IFSC Code</td>
                  <td class="text-left sm:px-6 sm:py-5 px-3 py-2">Amount</td>
                  <td class="text-left sm:px-6 sm:py-5 px-3 py-2">Status</td>
                </tr>
              </thead>
              <tbody v-for="(bank, index) in banks" :key="index" class="border-b">
                <tr>
                  <td
                    class="text-[16px] font-[700] text-gray-900 whitespace-nowrap flex items-center px-6 py-5"
                  >
                    <img
                      :src="bank.users == null ? 'https://avatars.dicebear.com/v2/avataaars/5167ff33390f64cd52efa1bc51b207d2.svg':bank.users.profile"
                      class="w-8 h-8 rounded-full"
                      alt
                    />
                    <span
                      class="ml-4 text-[16px] font-semibold font-mulish"
                    >{{bank.users == null ? 'User Not Found':bank.users.name}}</span>
                  </td>
                  <td
                    class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                  >{{bank.bank_name}}</td>
                  <td
                    class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                  >{{bank.account_number}}</td>
                  <td
                    class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                  >{{bank.ifsc_code}}</td>
                  <td
                    class="py-4 px-6 mt-0 text-sm font-medium text-gray-900 whitespace-nowrap"
                  >{{bank.amount}}</td>
                  <td>
                    <span
                      class="text-green-900 px-6 py-1 rounded-full bg-[#E0FFEE]"
                      v-if="bank.status == 'Approved'"
                    >Approved</span>
                    <span
                      @click="approved(bank._id)"
                      class="px-6 py-1 rounded-full bg-[#E0FFEE] cursor-pointer"
                      v-if="bank.status == 'pending'"
                      :class="bank.status == 'pending'?'bg-red-600/25':''"
                    >Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
  name: "UserWithDrawRequest",
  components: { Sidebar, Navbar },
  data() {
    return {
      drop: false,
      drop1: false,
      show: false
    };
  },
  methods: {
    dropdown1() {
      this.drop = !this.drop;
      this.drop1 = false;
    },
    dropdown2() {
      this.drop1 = !this.drop1;
      this.drop = false;
    },
    showNavBar() {
      this.show = true;
    },
    hidebar() {
      this.show = false;
    }
    // async getRequest() {
    //   const res = await (
    //     await fetch("http://localhost:500/admin/banks", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         admin_access_token: localStorage.getItem("token")
    //       }
    //     })
    //   ).json();
    //   console.log(res);
    //   if (res.success) {
    //     this.banks = res.banks;
    //   }
    // }
  }
  // mounted() {
  //   this.getRequest();
  // }
};
</script>
<style >
</style>