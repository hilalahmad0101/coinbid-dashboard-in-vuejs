 <template >
  <div class="mb-10">
    <div class="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-4">
      <div class="bg-white px-4 py-7 rounded-lg shadow">
        <div class="flex justify-between items-center">
          <div>
            <div
              class="sm:font-bold font-mulish sm:text-[19px] text-sm font-semibold tracking-[0.4px] my-3"
            >WITHDRAW REQUESTS</div>
          </div>
          <div class="font-thin sm:text-md text-sm text-[#3751FF]">View details</div>
        </div>
        <span class="font-semibold font-mulish text-[#9FA2B4] text-[16px] mr-1">Group:</span>
        <span class="ml-2">Support</span>
        <div class="md:overflow-y-hidden overflow-y-scroll md:w-full w-full">
          <table class="my-2 w-full border-t">
            <tbody v-for="(bank,index) in banks" :key="index">
              <tr>
                <td class="flex items-center py-4 text-center">
                  <img
                    :src="bank.users==null ? 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.2.428230215.1657184317':bank.users.profile"
                    class="w-9 h-9 rounded-full"
                    alt
                  />
                  <span
                    class="ml-4 text-[14px] leading-[20px] font-semibold font-mulish"
                  >{{bank.users == null?'User not found':bank.users.name}}</span>
                </td>
                <td class="text-center px-2">
                  <span class="text-gray-400 text-sm sm:text-md">{{bank.bank_name}}</span>
                </td>
                <td class="text-center px-2">
                  <span class="text-gray-400 text-sm sm:text-md">{{bank.amount}}</span>
                </td>
                <td class="text-center px-2">
                  <span
                    class="text-gray-600 text-sm sm:text-md sm:px-6 px-3 py-1 rounded-full bg-red-300"
                    v-if="bank.status =='pending'"
                  >Pending</span>
                  <span
                    class="text-gray-600 text-sm sm:text-md sm:px-6 px-3 py-1 rounded-full bg-green-300"
                    v-if="bank.status =='Approved'"
                  >Approved</span>
                  <span
                    class="text-gray-600 text-sm sm:text-md sm:px-6 px-3 py-1 rounded-full bg-red-800"
                    v-if="bank.status =='Rejected'"
                  >Rejected</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bg-white px-4 py-7 rounded-lg shadow">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold font-mulish text-[19px] tracking-[0.4px] my-3">TOP ADS WATCHED</div>
          </div>
          <div class="font-thin text-md text-blue-600">View details</div>
        </div>
        <div class="text-center place-items-center">No Ads Available to show</div>
      </div>
    </div>
  </div>
</template>
 <script>
import { BASE_URL } from "../baseurl";
export default {
  data() {
    return {
      banks: []
    };
  },
  methods: {
    async getBanks() {
      const res = await (
        await fetch(`${BASE_URL}admin/dashboard/banks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: localStorage.getItem("token")
          }
        })
      ).json();
      console.log(res);
      if (res.success) {
        this.banks = res.banks;
      }
    }
  },
  mounted() {
    this.getBanks();
  }
};
</script>
 <style >
</style>