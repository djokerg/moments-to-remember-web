import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AboutUsPage from "./pages/AboutUsPage";
import ProfilePage from "./pages/ProfilePage";
import OffersPage from "./pages/OffersPage";
import OfferDetailPage from "./pages/OfferDetailPage.tsx";
import NotificationsPage from "./pages/NotificationsPage";
import CartPage from "./pages/CartPage";
import EventsPage from "./pages/EventsPage";
import BookingsPage from "./pages/BookingsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "offers", element: <OffersPage /> },
        { path: "offers/:id", element: <OfferDetailPage /> },
        { path: "events/:id", element: <OfferDetailPage /> },
        { path: "notifications", element: <NotificationsPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "about-us", element: <AboutUsPage /> },
        { path: "events", element: <EventsPage /> },
        { path: "bookings", element: <BookingsPage /> },
      ],
    },
  ], { basename: import.meta.env.BASE_URL });
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
