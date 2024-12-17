import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../topbar/Topbar";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div className="mx-auto w-[100%] bg-slate-50 max-w-[412px] h-screen">
      <Topbar />
      <Outlet />
    </div>
  );
}
