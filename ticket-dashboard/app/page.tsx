import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import TicketDashboard from "./components/ticketDashboard";
import "./globals.css";

export default function Home() {
  return (
    <NextUIProvider>
      <div
        style={{ margin: "auto", padding: "15px" }}
        className="max-w-4xl h-auto flex items-center justify-between light  bg-background "
      >
        <TicketDashboard></TicketDashboard>
      </div>
    </NextUIProvider>
  );
}
