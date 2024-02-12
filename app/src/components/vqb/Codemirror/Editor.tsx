import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { SQLConfig, StandardSQL } from "@codemirror/lang-sql";
import { format } from "sql-formatter";
import { Box } from "@mui/material";
import { useContext } from "react";
import { DialogContext } from "../../queryBuilder/BuilderDialog";
import LoaderOverlay from "./LoadingOverlay";

interface SqlEditorProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
function SqlEditor({ query, setQuery }: SqlEditorProps) {
  const onChange = React.useCallback((val: any) => {
    const formattedQuery = format(val, {
      language: "snowflake",
      keywordCase: "upper",
    });
    setQuery(formattedQuery);
  }, []);

  const config: SQLConfig = {
    dialect: StandardSQL,
    upperCaseKeywords: true,
  };
  let { queryLoading } = useContext(DialogContext);

  return (
    <Box padding={0}>
      {queryLoading && <LoaderOverlay />}
      <CodeMirror
        value={query}
        height="300px"
        extensions={[sql(config)]}
        onChange={onChange}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          highlightActiveLineGutter: false,
          indentOnInput: false,
          syntaxHighlighting: true,
          autocompletion: true,
          searchKeymap: false,
        }}
      />
    </Box>
  );
}

export default SqlEditor;
