import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
  Profile,
  Stats,
} from "../pages/Index.jsx";

import { action as addJobAction } from "../pages/AddJob.jsx";
import { action as deleteJobAction } from "../pages/DeleteJob.jsx";
import { action as editJobAction } from "../pages/EditJob.jsx";
import { action as profileAction } from "../pages/Profile.jsx";
import { loader as adminLoader } from "../pages/Admin.jsx";
import { loader as allJobsLoader } from "../pages/AllJobs.jsx";
import { loader as dashboardLoader } from "../pages/DashboardLayout.jsx";
import { loader as editJobLoader } from "../pages/EditJob.jsx";
import { loader as statsLoader } from "../pages/Stats.jsx";

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    loader: dashboardLoader,
    children: [
      { index: true, element: <AddJob />, action: addJobAction },
      {
        path: "edit-job/:id",
        element: <EditJob />,
        action: editJobAction,
        loader: editJobLoader,
      },
      { path: "delete-job/:id", action: deleteJobAction },
      { path: "stats", element: <Stats />, loader: statsLoader },
      { path: "all-jobs", element: <AllJobs />, loader: allJobsLoader },
      { path: "profile", element: <Profile />, action: profileAction },
      { path: "admin", element: <Admin />, loader: adminLoader },
    ],
  },
];
