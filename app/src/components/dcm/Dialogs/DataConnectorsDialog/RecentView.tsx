import { Button, Grid, Paper, Typography, Box, Link } from "@mui/material";
import dataSourcesIcon from "../../../../assets/icons/dcm/database.svg";

export default function RecentView() {
  return (
    <Grid item xs={10} paddingRight={2}>
      <Box
        marginTop={1}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={37.49}
      >
        <Typography>
          <b>Recent Connections</b>
        </Typography>
        <Button variant="contained" sx={{ textTransform: "none" }}>
          Clear list
        </Button>
      </Box>
      <Grid container marginTop={1} spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <Box
              display={"flex"}
              height={50}
              alignItems={"center"}
              paddingX={2}
            >
              <img
                src={dataSourcesIcon}
                alt=""
                style={{ marginRight: 20, height: 20 }}
              />
              <Link sx={{ textDecoration: "none" }}>
                <Typography>dcm:Snowflake -- OAauth</Typography>
              </Link>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box
              display={"flex"}
              height={50}
              alignItems={"center"}
              paddingX={2}
            >
              <img
                src={dataSourcesIcon}
                alt=""
                style={{ marginRight: 20, height: 20 }}
              />
              <Link sx={{ textDecoration: "none" }}>
                <Typography>dcm:DBX OAuth -- DBX AWS Demo</Typography>
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
