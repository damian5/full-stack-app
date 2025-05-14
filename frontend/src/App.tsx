import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Layout } from "./Layout/Layout";
import { PersonDetails } from "./pages/Details/PersonDetails/PersonDetails";
import { MovieDetails } from "./pages/Details/MovieDetails/MovieDetails";

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/movies" element={<MovieDetails />} />
        <Route path="/details/people" element={<PersonDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};
