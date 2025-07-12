import React, { PropsWithChildren, useEffect } from "react";
import Sidebar from "../components/ui/sidebar";
import Header from "../components/ui/Header";
import { Meteor } from "meteor/meteor";
import { ToastProvider } from "../contexts/ToastContext";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const userId = useTracker(() => Meteor.userId(), []);

  useEffect(() => {
    if (!userId) {
      console.log(`loggout`);
      navigate("/"); // or login page
    }
    console.log(userId);
  }, [userId]);

  if (!userId) {
    return null; // avoid rendering layout during redirect
  }

  return (
    <ToastProvider>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Header title="Dashboard" />
          <main className="flex-1 overflow-x-hidden overflow-y-auto lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default DashboardLayout;
