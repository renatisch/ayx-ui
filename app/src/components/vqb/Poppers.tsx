import {
  Popper,
  Box,
  Stack,
  Tooltip,
  IconButton,
  Chip,
  Typography,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

interface PopperProps {
  anchorEl: HTMLElement | null;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const queryExamples = [
  {
    query:
      'CREATE TABLE "ACME_ORG"."MARKETING"."department_table"(department_ID INTEGER, department_name VARCHAR);',
    description:
      "Creates a new table department_table with department_ID of type INTEGER and department_name of type VARCHAR.",
  },
  {
    query: 'SELECT * FROM "ACME_ORG"."MARKETING"."department_table";',
    description:
      "Select all records from table department_table in schema MARKETING of ACME_ORG database.",
  },
  {
    query:
      'INSERT INTO "ACME_ORG"."MARKETING"."department_table"(department_ID, department_name) VALUES (1, "Engineering"),(2, "Customer Support"),(3, "Finance");',
    description:
      "Insert records (1, 'Engineering'), (2,'Customer Support') INTO table department_table in schema MARKETING of ACME_ORG database.",
  },
];

export default function AiOptionPopper({
  anchorEl,
  setInput,
  setError,
}: PopperProps) {
  const open = Boolean(anchorEl);
  const handleQuerySelect = (query: string) => {
    setInput(query);
    setError(false);
  };

  return (
    <Popper
      id={"simple"}
      placement="left"
      open={open}
      anchorEl={anchorEl}
      sx={{
        zIndex: 5000,
        position: "relative",
        margin: 0,
        padding: 0,
      }}
    >
      <Box sx={{ border: 1, p: 2, bgcolor: "background.paper" }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Select one of the queries below
        </Typography>
        {queryExamples.map((query) => {
          return (
            <Stack spacing={1} direction={"row"} marginTop={1}>
              <Chip
                sx={{
                  padding: 2,
                  height: "auto",
                  display: "flex",
                  justifyContent: "start",
                  width: 500,
                  "& .MuiChip-label": {
                    color: "inherit",
                    display: "flex",
                    alignContent: "start",
                    whiteSpace: "normal",
                  },
                }}
                label={<code>{query.query}</code>}
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleQuerySelect(query.query);
                }}
                icon={
                  <Tooltip
                    PopperProps={{ sx: { zIndex: 6000 } }}
                    title={query.description}
                  >
                    <IconButton>
                      <HelpOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </Stack>
          );
        })}
      </Box>
    </Popper>
  );
}
