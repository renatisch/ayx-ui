import {
  Grid,
  Paper,
  Typography,
  Box,
  Link,
  Button,
  IconButton,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import {
  allDataSourcesLeftColumn,
  allDataSourcesRightColumn,
  frequentyUsedDataSources,
} from "./dsConsts";

interface DataSourceViewProps {
  setDialogType: Function;
}

export default function DataSourceView({ setDialogType }: DataSourceViewProps) {
  const handleClick = () => {
    setDialogType("connectorDialog");
  };

  return (
    <Grid item xs={10} paddingRight={2}>
      <Box
        marginY={1}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={37.49}
      >
        <Typography>
          <b>Frequently used data sources</b>
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {frequentyUsedDataSources.map((dataSource) => {
          return (
            <Grid item xs={12}>
              <Paper>
                <Box
                  display={"flex"}
                  height={50}
                  alignItems={"center"}
                  paddingX={2}
                  justifyContent={"flex-start"}
                >
                  <Box width={200}>
                    <Typography>{dataSource.name}</Typography>
                  </Box>
                  <Box
                    width={300}
                    display={"flex"}
                    marginLeft={10}
                    alignItems={"center"}
                  >
                    {dataSource.options.map((option) => {
                      return (
                        <>
                          <Link href="#" sx={{ textDecoration: "none" }}>
                            <Typography>{option.name}</Typography>
                          </Link>
                          {option.dividerAfter && (
                            <Divider
                              orientation="vertical"
                              variant="middle"
                              flexItem
                              sx={{
                                marginX: 1,
                                backgroundColor: "black",
                                width: 1.1,
                                height: 15,
                              }}
                            />
                          )}
                        </>
                      );
                    })}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Box
        marginY={1}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={37.49}
      >
        <Typography>
          <b>All data sources</b>
        </Typography>
      </Box>
      <Paper sx={{ maxHeight: 580, marginTop: 2, overflow: "auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box paddingBottom={3}>
              {allDataSourcesLeftColumn.map((dataSource) => {
                return (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"start"}
                    paddingX={2}
                    paddingTop={3}
                  >
                    <Typography>{dataSource.name}</Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      {dataSource.options.map((option) => {
                        return (
                          <IconButton
                            sx={{ borderRadius: 0, padding: 0 }}
                            onClick={() => {
                              if (dataSource.name === "Snowflake") {
                                handleClick();
                              }
                            }}
                          >
                            <Typography color={"#0078d0"}>
                              {option.name}
                            </Typography>
                            {option.dividerAfter && (
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{
                                  marginX: 1,
                                  backgroundColor: "black",
                                  width: 1.1,
                                  height: 15,
                                }}
                              />
                            )}
                          </IconButton>
                          // <Button
                          // >
                          //   <Link
                          //     href="#"
                          //     sx={{
                          //       textDecoration: "none",
                          //       textTransform: "none",
                          //     }}
                          //   >
                          //     <Typography>{option.name}</Typography>
                          //   </Link>
                          //   {option.dividerAfter && (
                          //     <Divider
                          //       orientation="vertical"
                          //       variant="middle"
                          //       flexItem
                          //       sx={{
                          //         marginX: 1,
                          //         backgroundColor: "black",
                          //         width: 1.1,
                          //         height: 15,
                          //       }}
                          //     />
                          //   )}
                          // </Button>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box paddingBottom={3}>
              {allDataSourcesRightColumn.map((dataSource) => {
                return (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"start"}
                    paddingX={2}
                    paddingTop={3}
                  >
                    <Typography>{dataSource.name}</Typography>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      {dataSource.options.map((option) => {
                        return (
                          <IconButton
                            sx={{ borderRadius: 0, padding: 0 }}
                            onClick={() => {
                              if (dataSource.name === "Snowflake") {
                                handleClick();
                              }
                            }}
                          >
                            <Typography color={"#0078d0"}>
                              {option.name}
                            </Typography>
                            {option.dividerAfter && (
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{
                                  marginX: 1,
                                  backgroundColor: "black",
                                  width: 1.1,
                                  height: 15,
                                }}
                              />
                            )}
                          </IconButton>
                          // <Button
                          // >
                          //   <Link
                          //     href="#"
                          //     sx={{
                          //       textDecoration: "none",
                          //       textTransform: "none",
                          //     }}
                          //   >
                          //     <Typography>{option.name}</Typography>
                          //   </Link>
                          //   {option.dividerAfter && (
                          //     <Divider
                          //       orientation="vertical"
                          //       variant="middle"
                          //       flexItem
                          //       sx={{
                          //         marginX: 1,
                          //         backgroundColor: "black",
                          //         width: 1.1,
                          //         height: 15,
                          //       }}
                          //     />
                          //   )}
                          // </Button>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

{
  /* <Button
                            onClick={() => {
                              if (dataSource.name === "Snowflake") {
                                handleClick();
                              }
                            }}
                          >
                            <Link
                              href="#"
                              sx={{
                                textDecoration: "none",
                                textTransform: "none",
                              }}
                            >
                              <Typography>{option.name}</Typography>
                            </Link>
                            {option.dividerAfter && (
                              <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{
                                  marginX: 1,
                                  backgroundColor: "black",
                                  width: 1.1,
                                  height: 15,
                                }}
                              />
                            )}
                          </Button> */
}
