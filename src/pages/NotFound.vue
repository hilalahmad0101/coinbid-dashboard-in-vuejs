<template >
  <div class="bg-indigo-900 relative overflow-hidden h-screen">
    <img
      src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9"
      class="absolute h-full w-full object-cover"
    />
    <div class="inset-0 bg-black opacity-25 absolute"></div>
    <router-link to="/dashboard">
      <button
        class="z-40 absolute bottom-[10%] left-[30%] md:left-[43%] md:bottom-[20%] text-whitepx-8 py-3 font-semibold rounded bg-violet-400 px-10"
      >Go Dashboard</button>
    </router-link>
    <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
      <div class="w-full font-mono flex flex-col items-center relative z-10">
        <h1
          class="font-extrabold text-5xl text-center text-white leading-tight mt-4"
        >You are all alone here</h1>
        <p class="font-extrabold text-8xl my-44 text-white animate-bounce">404</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="">
</style>