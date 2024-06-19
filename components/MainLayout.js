"use client";
const { AuthProvider } = require("@/app/Providers");
import { StoreProvider, store } from "@/redux/store";
import { Provider } from "react-redux";
const MainLayout = ({ children }) => {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>;
    </StoreProvider>
  );
};
export default MainLayout;
