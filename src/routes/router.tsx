import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements
} from "react-router";

import { MasterLayout } from "@/components/layout/MasterLayout";
import Index from "@/pages/Home";
import ArticleDetails from "@/pages/article/ArticleDetail";
import NotFound from "@/components/error/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MasterLayout />}>
      <Route index element={<Index />} />
      <Route path="article/:id" element={<ArticleDetails />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  )
)

export default router;