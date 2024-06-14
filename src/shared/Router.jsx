import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detailed from "../pages/Detailed";
import Layout from "./Layout";
import MonthProvider from "../context/selectedMonthContext";
import AuthProvider from "../context/authContext";
import Create from "../pages/Create";
import SignIn from "../pages/SignIn";
import Join from "../pages/Join";
import MyPage from "../pages/MyPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Router = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MonthProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="create" element={<Create />} />
                <Route path="detailed/:listId" element={<Detailed />} />
                <Route path="signIn" element={<SignIn />} />
                <Route path="join" element={<Join />} />
                <Route path="mypage" element={<MyPage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </MonthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Router;
