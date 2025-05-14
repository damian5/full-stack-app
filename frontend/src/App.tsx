import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Layout } from "./Layout/Layout";

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};
