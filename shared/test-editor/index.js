import React, { useState, useMemo } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

const TestEditor = React.forwardRef(
  ({ plugins, initialValue, ...props }, ref) => {
    const memoPlugins = useMemo(() => plugins);
    const [value, setValue] = useState(() => Value.fromJSON(initialValue));

    const handleChange = ({ value }) => {
      setValue(value);
    };

    return (
      <Editor
        ref={ref}
        plugins={memoPlugins}
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

export default TestEditor;
