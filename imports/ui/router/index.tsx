import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Home from "/imports/ui/views/home";
import { Outlet } from "react-router-dom";
import MainLayout from "/imports/layouts/main-layout";
import SignUp from "../views/login";
// Layouts
const DashboardLayout = lazy(() => import("/imports/layouts/dashboard-layout"));

// Pages
// const Home = lazy(() => import("../views/home"));
// const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const Login = lazy(() => import("../views/login"));
// const SignUp = lazy(() => import("../pages/SignUp"));
// const Dashboard = lazy(() => import("../pages/Dashboard"));
// const Clients = lazy(() => import("../pages/Clients"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
          <Outlet />
        </Suspense>
      }
    >
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/coming-soon" element={<ComingSoon />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<SignUp />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* <Route index element={<Dashboard />} /> */}
        {/* <Route path="clients" element={<Clients />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);
