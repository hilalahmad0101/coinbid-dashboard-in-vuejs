<template>
  <div class="fixed top-0 left-0 w-full h-full py-10 z-40 bg-gray-800/50 overflow-y-scroll">
    <div class="flex justify-center items-center">
      <div class="bg-white w-[40%] rounded-md">
        <div
          class="bg-gray-300 rounded-t-md px-3 py-3 text-[19px] font-bold font-mulish"
        >Update User</div>
        <div class="bg-white px-4 py-3">
          <form>
            <div class="my-4">
              <label for="name" class="text-md block text-gray-700 font-bold mb-2">Name:</label>
              <input
                type="text"
                class="border border-gray-400 rounded-2xl text-md font-semibold w-full py-2 px-6 outline-green-600 appearance-none"
                placeholder="Enter Name"
              />
            </div>
            <div class="my-4">
              <label for="email" class="text-md block text-gray-700 font-bold mb-2">Email:</label>
              <input
                type="text"
                class="border border-gray-400 rounded-2xl text-md font-semibold w-full py-2 px-6 outline-green-600 appearance-none"
                placeholder="Enter Email"
              />
            </div>
            <div class="my-4">
              <label
                for="contact"
                class="text-md block text-gray-700 font-bold mb-2"
              >Contact Number:</label>
              <input
                type="text"
                class="border border-gray-400 rounded-2xl text-md font-semibold w-full py-2 px-6 outline-green-600 appearance-none"
                placeholder="Enter Contact Number"
              />
            </div>
            <div class="my-4">
              <label for="state" class="text-md block text-gray-700 font-bold mb-2">State:</label>
              <input
                type="text"
                class="border border-gray-400 rounded-2xl text-md font-semibold w-full py-2 px-6 outline-green-600 appearance-none"
                placeholder="Enter State"
              />
            </div>
            <div class="my-6">
              <label for="city" class="text-md block text-gray-700 font-bold mb-2">City:</label>
              <input
                type="text"
                class="border outline-green-600 border-gray-400 rounded-2xl text-md font-semibold w-full py-2 px-6 appearance-none"
                placeholder="Enter Password"
              />
            </div>
            <div class="my-7">
              <button
                class="border border-gray-400 rounded-md font-bold bg-green-700 text-md text-white w-full py-2 px-6 appearance-none capitalize hover:bg-green-800"
                type="submit"
              >Save</button>
            </div>
          </form>
        </div>
        <div class="bg-gray-300 rounded-b-md px-3 py-2 text-[19px] font-bold font-mulish">
          <button
            class="border border-gray-400 rounded-md font-bold text-md text-white py-1 px-6 appearance-none capitalize bg-red-400 font-mulish"
          >Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="">
</style>
