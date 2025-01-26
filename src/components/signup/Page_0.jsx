import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Page_0 = () => {
  return (
    <>
      <h4 className="text-[20px] font-medium font-nunito">
        Select type of your Organization
      </h4>

      <FormControl className="h-52">
        <FormLabel
          id="demo-radio-buttons-group-label"
          className="text-[16px] font-normal"
          sx={{
            color: "#5B5B5BCC",
            "&.Mui-focused": { color: "#5B5B5BCC" },
            "&.Mui-checked": { color: "#5B5B5BCC" },
          }}
          style={{ padding: "10px 0" }}
        >
          Choosing the type helps us provide the appropriate service to you
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="vendor"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#5B5B5BCC",
                  },
                }}
              />
            }
            label="Vendor"
          />
          <FormControlLabel
            value="factory"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#5B5B5BCC",
                  },
                }}
              />
            }
            label="Factory"
          />
          <FormControlLabel
            value="charity"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#5B5B5BCC",
                  },
                }}
              />
            }
            label="Charity"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Page_0;
