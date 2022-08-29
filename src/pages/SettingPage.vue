<template>
  <div class="flex">
    <!-- sidebar start -->
    <Sidebar :show="show" @hideSidebar="hidebar" />
    <!-- content -->
    <div class="h-full w-full to-[#F5F5F5] from-white bg-gradient-to-r lg:ml-[300px]">
      <Navbar @sideBar="showNavBar" title="Settings" />

      <div class="container mr-5 ml-2 my-10">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
          style="margin-right:20px"
        >
          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <a href="#">
              <h5 class="mb-2 text-xl font-bold tracking-tight text-black">Add Coin</h5>
            </a>
            <router-link
              to="/coin"
              href="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#E27425] rounded-lg hover:bg-[#E27425] focus:ring-4 focus:outline-none focus:ring-[#E27425] dark:bg-[#E27425] dark:hover:bg-[#E27425] dark:focus:ring-[#E27425]"
            >
              Coin
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <a href="#">
              <h5 class="mb-2 text-xl font-bold tracking-tight text-black">Add Bouns Coin For</h5>
            </a>
            <router-link
              to="/bounes/coin"
              href="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#E27425] rounded-lg hover:bg-[#E27425] focus:ring-4 focus:outline-none focus:ring-[#E27425] dark:bg-[#E27425] dark:hover:bg-[#E27425] dark:focus:ring-[#E27425]"
            >
              Price Coin
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <a href="#">
              <h5 class="mb-2 text-xl font-bold tracking-tight text-black">Add Banner</h5>
            </a>
            <router-link
              to="/banner"
              href="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#E27425] rounded-lg hover:bg-[#E27425] focus:ring-4 focus:outline-none focus:ring-[#E27425] dark:bg-[#E27425] dark:hover:bg-[#E27425] dark:focus:ring-[#E27425]"
            >
              Banner
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <a href="#">
              <h5 class="mb-2 text-xl font-bold tracking-tight text-black">Approved Bank</h5>
            </a>
            <router-link
              to="/approved/bank"
              href="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#E27425] rounded-lg hover:bg-[#E27425] focus:ring-4 focus:outline-none focus:ring-[#E27425] dark:bg-[#E27425] dark:hover:bg-[#E27425] dark:focus:ring-[#E27425]"
            >
              Bank
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <a href="#">
              <h5 class="mb-2 text-xl font-bold tracking-tight text-black">Transaction History</h5>
            </a>
            <router-link
              to="/transaction/history"
              href="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#E27425] rounded-lg hover:bg-[#E27425] focus:ring-4 focus:outline-none focus:ring-[#E27425] dark:bg-[#E27425] dark:hover:bg-[#E27425] dark:focus:ring-[#E27425]"
            >
              History
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
          <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <a href="#">
              <h5 class="mb-2 text-xl font-bold tracking-tight text-black">Tax</h5>
            </a>
            <router-link
              to="/tax"
              href="#"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#E27425] rounded-lg hover:bg-[#E27425] focus:ring-4 focus:outline-none focus:ring-[#E27425] dark:bg-[#E27425] dark:hover:bg-[#E27425] dark:focus:ring-[#E27425]"
            >
              Tax
              <svg
                aria-hidden="true"
                class="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
export default {
  name: "SettingPage",
  components: {
    Sidebar,
    Navbar
  },
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
    }
  }
};
</script>
<style >
</style>