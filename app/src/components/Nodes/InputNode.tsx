import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { FlowChartContext } from "../FlowChart";
import { Box, Typography } from "@mui/material";
import browseToolLogo from "../../assets/icons/browse.png";
import inputToolLogo from "../../assets/icons/Input-Tool.png";
import outputToolLogo from "../../assets/icons/output-data.png";
import textInputLogo from "../../assets/icons/textinput.svg";
import dateAndTimeLogo from "../../assets/icons/Date-and-Time.png";
import directoryLogo from "../../assets/icons/Directory.png";
import { NodeProps } from "reactflow";

const tools = [
  { id: "browse", toolName: "Browse", logo: browseToolLogo },
  { id: "inputData", toolName: "Input Data", logo: inputToolLogo },
  { id: "outputData", toolName: "Output Data", logo: outputToolLogo },
  { id: "textInput", toolName: "Text Input", logo: textInputLogo },
  { id: "dateTime", toolName: "Date and Time", logo: dateAndTimeLogo },
  { id: "directory", toolName: "Directory", logo: directoryLogo },
];

export default function InputNode({ data }: NodeProps) {
  let context = useContext(FlowChartContext);
  let initialTool = tools.filter((tool) => {
    if (tool.id === data.nodeName) {
      return tool;
    }
  });

  return (
    <IconButton sx={{ borderRadius: 0 }} style={{ marginLeft: 10 }}>
      <Box flexDirection={"column"} display={"flex"} alignItems={"center"}>
        <img
          src={initialTool[0].logo}
          alt=""
          style={{ height: "20px", width: "20px" }}
        />
        <Typography textAlign={"center"} fontSize={7}>
          {initialTool[0].toolName}
        </Typography>
      </Box>
    </IconButton>
  );
}
