import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
  Profile,
  Stats,
} from "../pages/index.jsx";

import { action as addJobAction } from "../pages/AddJob.jsx";
import { action as deleteJobAction } from "../pages/DeleteJob.jsx";
import { action as editJobAction } from "../pages/EditJob.jsx";
import { action as profileAction } from "../pages/Profile.jsx";
import { loader as adminLoader } from "../pages/Admin.jsx";
import { loader as allJobsLoader } from "../pages/AllJobs.jsx";
import { loader as dashboardLoader } from "../pages/DashboardLayout.jsx";
import { loader as editJobLoader } from "../pages/EditJob.jsx";
import { loader as statsLoader } from "../pages/Stats.jsx";
import Error from "../pages/Error.jsx";
import ErrorElement from "../components/ErrorElement.jsx";
import { queryClient } from "../utils/queryClient.js";

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout queryClient={queryClient} />,
    errorElement: <Error />,
    loader: dashboardLoader(queryClient),
    children: [
      { index: true, element: <AddJob />, action: addJobAction(queryClient) },
      {
        path: "edit-job/:id",
        element: <EditJob />,
        action: editJobAction(queryClient),
        loader: editJobLoader(queryClient),
      },
      { path: "delete-job/:id", action: deleteJobAction(queryClient) },
      {
        path: "stats",
        element: <Stats />,
        errorElement: <ErrorElement />,
        loader: statsLoader(queryClient),
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
        loader: allJobsLoader(queryClient),
        errorElement: <ErrorElement />,
      },
      {
        path: "profile",
        element: <Profile />,
        action: profileAction(queryClient),
      },
      { path: "admin", element: <Admin />, loader: adminLoader },
    ],
  },
];
