import { Toolbar } from "@mui/material";

export default function NavBar() {
  return (
    <Toolbar style={{ backgroundColor: "white", padding: 0 }}>
      <img
        src={require("../assets/bg_new.png")}
        alt=""
        style={{ width: "100%" }}
      />
    </Toolbar>
  );
}
