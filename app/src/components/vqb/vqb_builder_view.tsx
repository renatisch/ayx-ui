import { Box, Checkbox, Typography } from "@mui/material";
import VQBIcon from "../../assets/vqb.png";

export default function VQB_builder_view() {
  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <img src={VQBIcon} alt="vqb_placeholder" height={600} />
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Checkbox />
        <Typography>Open Visual Query Builder by default</Typography>
      </Box>
    </>
  );
}
