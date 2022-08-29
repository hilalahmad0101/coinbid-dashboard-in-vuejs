import { defineStore } from "pinia";
import { BASE_URL, LOCAL_BASE_URL } from "../baseurl";
// import { router } from "../router";
export const useStore = defineStore("main", {
  state: () => {
    return {
      token: localStorage.getItem("token") || "",
      admin: {},
      response: {},
      isloading: false,
      totalUser: 0,
      users: [],
      banks: [],
    };
  },
  actions: {
    async adminLogin(data) {
      this.isloading = true;
      const res = await (await fetch(`${BASE_URL}admin/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })).json();
      this.response = res;
      this.isloading = false;
    },

    async totalCountUser() {
      const res = await (await fetch(`${BASE_URL}admin/total/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "admin_access_token": localStorage.getItem("token"),
        },
      })).json();
      if (res.success) {
        this.totalUser = res.users;
      }
    },

    async userDelete(id) {
      const res = await (await fetch(
        `${BASE_URL}admin/delete/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "admin_access_token": localStorage.getItem("token"),
          },
        },
      )).json();
      if (res.success) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    },

    async getBank() {
      this.isloading = true;
      const res = await (await fetch(`${BASE_URL}admin/banks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "admin_access_token": localStorage.getItem("token"),
        },
      })).json();
      if (res.success) {
        this.banks = res.banks;
      }
      this.isloading = false;
    },
    async getByDate() {
      this.isloading = true;
      const res = await (await fetch(`${BASE_URL}admin/banks/date`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "admin_access_token": localStorage.getItem("token"),
        },
      })).json();
      if (res.success) {
        this.banks = res.banks;
      }
      this.isloading = false;
    },
    async getByPaid() {
      this.isloading = true;

      const res = await (await fetch(`${BASE_URL}admin/banks/paid`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "admin_access_token": localStorage.getItem("token"),
        },
      })).json();
      if (res.success) {
        this.banks = res.banks;
      }
      this.isloading = false;
    },
    async getUnPaid() {
      this.isloading = true;

      const res = await (await fetch(`${BASE_URL}admin/banks/unpaid`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "admin_access_token": localStorage.getItem("token"),
        },
      })).json();
      if (res.success) {
        this.banks = res.banks;
      }
      this.isloading = false;
    },
    async logout() {
      this.token = "";
      localStorage.removeItem("token");
    },

    async getAdmin() {
      const res = await (await fetch(`${LOCAL_BASE_URL}admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "admin_access_token": localStorage.getItem("token"),
        },
      })).json();
      this.admin = res.admins;
    },
  },
});
