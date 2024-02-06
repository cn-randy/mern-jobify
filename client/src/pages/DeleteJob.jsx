import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axios.js";

export const action = async function ({ params }) {
  try {
    await axios.delete(`/jobs/${params.id}`);
    toast.success("Job was deleted");
  } catch (err) {
    toast.error(err?.response?.data?.message);
  }
  return redirect("/dashboard/all-jobs");
};
