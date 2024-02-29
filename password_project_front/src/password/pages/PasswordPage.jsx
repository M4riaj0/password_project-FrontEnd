import { Typography } from "@mui/material";
import { ViewPasswords } from "../views/ViewPasswords";
import { PasswordLayout } from "../layout/passwordLayout";
import { useDispatch } from "react-redux";

export const PasswordPage = () => {
  return (
    <PasswordLayout>
      <ViewPasswords />
    </PasswordLayout>
  )
}
