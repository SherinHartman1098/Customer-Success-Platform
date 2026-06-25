import { Box } from "@mui/material";
import BasicButtons from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import registerImg from "../../assets/registerBckgrnd2.png";
import { useLogin } from "./useLogin";
import SnackBarNotification from "../../components/Notification/SnackBarNotification";
export function LoginPage() {
  const { form, loading, error, handleChange, handleSubmit } = useLogin();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        background: "linear-gradient(to right, #5eb0c5, #ffffff)",
      }}
    >
      {/* LEFT SIDE - IMAGE / POSTER * */}

      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${registerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/*Right Side Form */}
      <Box
        sx={{
          //      maxWidth: 500,
          //     // display: "flex",
          //     // justifyContent: "center",
          //     // mx: "auto",
          //     // mt: 5,
          //     display: "flex",
          // justifyContent: "flex-end",
          // mt: 5,
          // ml: 83,
          // pr: 5,
          // mr: 3,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 6,
        }}
      >
        <Box sx={{ width: 400 }}>
          <form onSubmit={handleSubmit}>
            <h1>Login to Your Account!</h1>

            <TextInput
              required
              id="formBtn-2"
              label="Email"
              placeholder="john.doe@example.com"
              variant="outlined"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <TextInput
              required
              id="formBtn-3"
              label="Password"
              type="password"
              placeholder="••••••••"
              variant="outlined"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            {/* {error && (
              <SnackBarNotification
                variant="filled"
                severity="error"
                message={error}
              />
            )} */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <BasicButtons id="submitBtn-2" type="submit" variant="contained">
                Login
              </BasicButtons>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
