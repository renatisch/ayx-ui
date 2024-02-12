import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(id: number, name: string, value: string) {
  return { id, name, value };
}
const rows = [
  createData(1, "Record Limit", ""),
  createData(2, "File Format", "Alteryx Database (*.yxdb)"),
  createData(3, "Search SubDirs", "True"),
  createData(4, "Output File Name as Field ", "No"),
];

export default function FormatSpecificOptionsTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        aria-label="format specific table"
        sx={{ borderTop: 2, borderLeft: 2 }}
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
