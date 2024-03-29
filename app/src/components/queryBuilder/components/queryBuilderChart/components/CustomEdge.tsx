import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  EdgeProps,
} from "reactflow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useContext } from "react";
import { DialogContext } from "../../../BuilderDialog";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { query, setQuery, action, setAction } = useContext(DialogContext);
  const handleChange = (event: SelectChangeEvent) => {
    setQuery({ ...query, action: event.target.value });
    setAction(event.target.value);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <FormControl
          fullWidth
          className="nodrag nopan z10"
          sx={{
            background: "white",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
            width: 100,
            zIndex: 10000,
          }}
        >
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={action}
            label="Action"
            onChange={handleChange}
          >
            <MenuItem value={"join"}>Join</MenuItem>
            <MenuItem value={"union"}>Union</MenuItem>
          </Select>
        </FormControl>
      </EdgeLabelRenderer>
    </>
  );
}
