import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ConnectionViewTable from "./ConnectionViewTable";

const DataGrid = () => {
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
          <b>Filtered to Snowflake Quick Connect</b>
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <TextField
            size="small"
            defaultValue={"Search"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            startIcon={<AddIcon />}
          >
            New
          </Button>
        </Box>
      </Box>
      <Grid container marginTop={1} spacing={2}>
        <Grid item xs={12}>
          <ConnectionViewTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default function DataSourcesView() {
  return <DataGrid />;
}
