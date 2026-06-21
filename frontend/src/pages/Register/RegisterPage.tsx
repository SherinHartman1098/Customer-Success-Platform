import Box from "@mui/material/Box";
import BasicButtons from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import registerImg from "../../assets/registerBckgrnd2.png";
import { Link } from "react-router-dom";
import { useRegister } from "./useRegister";

const RegisterPage = () => {
  const { form, loading, error, handleChange, handleSubmit } = useRegister();

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
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 6,
        }}
      >
        <Box sx={{ width: 400 }}>
          <form onSubmit={handleSubmit}>
            <h1>Create Your Account!</h1>
            <TextInput
              required
              name="username"
              value={form.username}
              onChange={handleChange}
              label="Full Name"
              placeholder="John Doe"
              variant="outlined"
            />

            <TextInput
              required
              name="email"
              value={form.email}
              onChange={handleChange}
              label="Email"
              placeholder="john.doe@example.com"
              variant="outlined"
            />

            <TextInput
              required
              name="password"
              value={form.password}
              onChange={handleChange}
              label="Password"
              type="password"
              placeholder="••••••••"
              variant="outlined"
            />

            {/* <TextInput
              required
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
              placeholder="••••••••"
              variant="outlined"
            /> */}

            <TextInput
              name="role"
              label="Role"
              value={form.role}
              onChange={handleChange}
              placeholder="Mention your role"
              variant="outlined"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <BasicButtons id="submitBtn-1" type="submit" variant="contained">
                Register
              </BasicButtons>
            </Box>
            <h3 style={{ textAlign: "center" }}>
              Already have an account? <Link to="/login">Login</Link>
            </h3>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default RegisterPage;
