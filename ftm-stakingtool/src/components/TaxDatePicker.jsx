import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function TaxDatePicker(props) {
  let [date, setDate] = useState(null);
  function dateChange(event) {
    setDate(event);
    props.DateCallBack(event);
  }
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            sx={{
              svg: { color: "#fff" },
              input: { color: "#fff" },
              label: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff",
                },
              },
            }}
            disableFuture={true}
            label="Select start date"
            value={date}
            onChange={(event) => {
              dateChange(event);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
