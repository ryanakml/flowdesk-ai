import { createFileRoute } from "@tanstack/react-router";
import { LoginView } from "../features/auth/LoginView.js";

export const Route = createFileRoute("/login")({
  component: LoginView
});
