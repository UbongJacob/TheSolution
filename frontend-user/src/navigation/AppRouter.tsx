import { Route, Routes } from "react-router-dom";

import ChangeLanguagePage from "@/pages/ChangeLanguagePage";
import GetStartedPage from "@/pages/GetStartedPage";
import LoginPage from "@/pages/auth/LoginPage";
import routes from "./routes";
import useEnhancedCustomRouterUtilities from "./useEnhancedCustomRouterUtilities";
import RegisterPage from "@/pages/auth/RegisterPage";
import NicknamePage from "@/pages/auth/NicknamePage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProfilePage from "@/pages/dashboard/profile/ProfilePage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import EditProfilePage from "@/pages/dashboard/editProfile/EditProfilePage";
import RequireAuth from "./RequireAuth";
import PageNotFound from "@/pages/PageNotFound";
import ResetPasswordInstructionsPage from "@/pages/auth/ResetPasswordInstructionsPage";
import GenerateInvoicePage from "@/pages/auth/GenerateInvoicePage";
import VerifyLightningPage from "@/pages/auth/VerifyLightningPage";
import ChangePasswordPage from "@/pages/auth/ChangePasswordPage";
import SatsRecievedPage from "@/pages/auth/SatsRecievedPage";
import VerifiedLightningSuccessPage from "@/pages/auth/VerifiedLightningSuccessPage";
import OrdinalsPage from "@/pages/dashboard/ordinals/OrdinalsPage";
import RequireUserVerification from "./RequireUserVerification";
import NewOrdinalsWalletPage from "@/pages/dashboard/ordinals/NewOrdinalsWalletPage";
import DeleteAccountPage from "@/pages/dashboard/DeleteAccountPage";
import LeaderboardPage from "@/pages/dashboard/leaderboard/LeaderboardPage";
import WeeklyLeaderboardPage from "@/pages/dashboard/leaderboard/WeeklyLeaderboardPage";
import AllTimeLeaderboardPage from "@/pages/dashboard/leaderboard/AllTimeLeaderboardPage";

const AppRouter = (): JSX.Element => {
  useEnhancedCustomRouterUtilities();
  return (
    <Routes>
      <Route index Component={GetStartedPage} />
      <Route
        path={routes.CHANGE_LANGUAGE_PAGE}
        Component={ChangeLanguagePage}
      />

      <Route path={routes.LOGIN_PAGE} Component={LoginPage} />
      <Route path={routes.REGISTER_PAGE} Component={RegisterPage} />
      <Route
        path={routes.FORGOT_PASSWORD_PAGE}
        Component={ForgotPasswordPage}
      />
      <Route
        path={routes.RESET_PASSWORD_INSTRUCTIONS_PAGE}
        Component={ResetPasswordInstructionsPage}
      />
      <Route
        path={routes.GENERATE_INVOICE_PAGE}
        Component={GenerateInvoicePage}
      />
      <Route
        path={routes.VERIFY_LIGHTNING_ADDRESS_PAGE}
        Component={VerifyLightningPage}
      />
      <Route
        path={routes.VERIFY_LIGHTNING_SUCCESS_PAGE}
        Component={VerifiedLightningSuccessPage}
      />
      <Route path={routes.SATS_RECEIVED_PAGE} Component={SatsRecievedPage} />
      <Route
        path={routes.CHANGE_PASSWORD_PAGE}
        Component={ChangePasswordPage}
      />
      <Route path={routes.NICKNAME_PAGE} Component={NicknamePage} />

      <Route element={<RequireAuth />}>
        <Route path={routes.DASHBOARD_PAGE} Component={DashboardLayout}>
          <Route index Component={DashboardPage} />
          <Route path={routes.PROFILE_PAGE} Component={ProfilePage} />
          <Route
            path={routes.DELETE_ACCOUNT_PAGE}
            Component={DeleteAccountPage}
          />
          <Route path={routes.EDIT_PROFILE_PAGE} Component={EditProfilePage} />
          <Route path={routes.LEADERBOARD_PAGE} Component={LeaderboardPage}>
            <Route index Component={WeeklyLeaderboardPage} />
            <Route
              path={routes.LEADERBOARD_ALL_TIME_PAGE}
              Component={AllTimeLeaderboardPage}
            />
          </Route>

          <Route
            path={routes.ORDINALS_PAGE}
            Component={RequireUserVerification}
          >
            <Route index Component={OrdinalsPage} />
            <Route
              path={routes.NEW_ORDINALS_WALLET_PAGE}
              Component={NewOrdinalsWalletPage}
            />
          </Route>
        </Route>
      </Route>

      {/* PLEASE THIS SHOULD ALWAYS BE LAST */}
      <Route path={routes.PAGE_NOT_FOUND} Component={PageNotFound} />
      <Route path="/*" Component={PageNotFound} />
    </Routes>
  );
};

export default AppRouter;
