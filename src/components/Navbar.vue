<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
const store = useStore();
const router = useRouter();

const drop = ref(false);
const hideDrop = () => {
  drop.value = false;
  store.logout();
  router.push("/");
};
const username = ref(store.admin.username);
onMounted(() => {
  store.getAdmin();
});
</script>

<template>
  <div class="sm:px-10 px-6 flex justify-between items-center w-full py-5 bg-white">
    <div class="flex items-center">
      <h1 class="font-bold text-sm sm:text-2xl tracking-[0.3px]">{{title}}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="sm:h-5 sm:w-5 sm:ml-5 h-4 w-4 ml-3 lg:hidden block cursor-pointer"
        viewBox="0 0 448 512"
        @click="showSidebar"
      >
        <path
          d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
        />
      </svg>
    </div>
    <div class="flex items-center">
      <div class="mr-2 sm:mr-9 flex items-center space-x-5 sm:border-r-2 pl-2 sm:px-7 h-8">
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6.5" cy="6.5" r="5.75" stroke="#C5C7CD" stroke-width="1.5" />
        </svg>
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00002 16C8.10377 16 8.99908 15.1047 8.99908 14H5.00096C5.00096 15.1047 5.89627 16 7.00002 16ZM13.731 11.3216C13.1272 10.6728 11.9975 9.69687 11.9975 6.5C11.9975 4.07188 10.295 2.12812 7.9994 1.65125V1C7.9994 0.447812 7.5519 0 7.00002 0C6.44815 0 6.00065 0.447812 6.00065 1V1.65125C3.70502 2.12812 2.00252 4.07188 2.00252 6.5C2.00252 9.69687 0.872834 10.6728 0.269084 11.3216C0.0815841 11.5231 -0.00154089 11.7641 2.16059e-05 12C0.00345911 12.5125 0.405647 13 1.00315 13H12.9969C13.5944 13 13.9969 12.5125 14 12C14.0016 11.7641 13.9185 11.5228 13.731 11.3216Z"
            fill="#C5C7CD"
          />
        </svg>
      </div>

      <h1
        class="font-thin text-sm sm:text-lg sm:font-bold sm:mr-4 leading-2 tracking-wide mr-2"
      >{{username}}</h1>
      <div class="relative">
        <img
          src="https://img.freepik.com/free-vector/farmer-using-agricultural-technology_53876-120543.jpg?size=338&ext=jpg&ga=GA1.2.428230215.1657184317"
          class="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-[#DFE0EB] p-1 cursor-pointer"
          alt="coinbid"
          @click="drop =!drop"
        />
        <div v-if="drop" class="bg-white rounded-xl shadow-md absolute w-[150px] top-14 right-0">
          <div class="mx-2 my-1">
            <div class="my-4 border-b">
              <h1
                class="py-1 px-3 my-1 cursor-pointer flex items-center justify-between rounded-md hover:bg-green-600/25"
              >
                <span @click="hideDrop">Logout</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavbarComp",
  props: {
    showNavBar: { type: Function },
    title: String
  },
  data() {
    return {
      drop: false
    };
  },
  methods: {
    showSidebar() {
      this.$emit("sideBar");
    }
  }
};
</script>
<style >
</style>