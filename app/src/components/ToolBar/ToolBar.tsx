import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import browseToolLogo from "../../assets/icons/browse.png";
import inputToolLogo from "../../assets/icons/Input-Tool.png";
import outputToolLogo from "../../assets/icons/output-data.png";
import textInputLogo from "../../assets/icons/textinput.svg";
import dateAndTimeLogo from "../../assets/icons/Date-and-Time.png";
import directoryLogo from "../../assets/icons/Directory.png";

const toolIcons = [
  { id: "browse", toolName: "Browse", logo: browseToolLogo },
  { id: "inputData", toolName: "Input Data", logo: inputToolLogo },
  { id: "outputData", toolName: "Output Data", logo: outputToolLogo },
  { id: "textInput", toolName: "Text Input", logo: textInputLogo },
  { id: "dateTime", toolName: "Date and Time", logo: dateAndTimeLogo },
  { id: "directory", toolName: "Directory", logo: directoryLogo },
];

interface ToolBarProps {
  tool: string;
  setSelectedTol: React.Dispatch<React.SetStateAction<string>>;
}

export default function ToolBar({ setSelectedTol }: ToolBarProps) {
  const onDrag = (toolName: string) => {
    setSelectedTol(toolName);
  };

  return (
    <Paper sx={{ background: "#f6f8fc", borderBottom: 1 }}>
      <Box display={"flex"} paddingLeft={3}>
        {toolIcons.map((toolIcon, index) => {
          return (
            <IconButton
              sx={{ borderRadius: 0 }}
              style={{ marginLeft: 10 }}
              key={index}
              onDragEnd={() => onDrag(toolIcon.id)}
            >
              <Box
                flexDirection={"column"}
                display={"flex"}
                alignItems={"center"}
              >
                <img
                  src={toolIcon.logo}
                  alt=""
                  style={{ height: "40px", width: "40px" }}
                />
                <Typography textAlign={"center"} variant="subtitle2">
                  {toolIcon.toolName}
                </Typography>
              </Box>
            </IconButton>
          );
        })}
      </Box>
    </Paper>
  );
}
