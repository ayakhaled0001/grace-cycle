import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Page_0 = ({ onChange, formData, errors }) => {
  return (
    <>
      <h4 className="text-lg sm:text-xl lg:text-xl font-medium font-nunito mb-4">
        Select type of your Organization
      </h4>

      <FormControl className="h-auto min-h-52">
        <FormLabel
          id="demo-radio-buttons-group-label"
          className="text-sm sm:text-base lg:text-lg font-normal"
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
          name="organizationType"
          value={formData.organizationType}
          onChange={onChange}
          className="space-y-2"
        >
          <FormControlLabel
            value="vendor"
            control={<Radio sx={{ "&.Mui-checked": { color: "#5B5B5BCC" } }} />}
            label={<span className="text-sm sm:text-base">Vendor</span>}
          />
          <FormControlLabel
            value="factory"
            control={<Radio sx={{ "&.Mui-checked": { color: "#5B5B5BCC" } }} />}
            label={<span className="text-sm sm:text-base">Factory</span>}
          />
          <FormControlLabel
            value="charity"
            control={<Radio sx={{ "&.Mui-checked": { color: "#5B5B5BCC" } }} />}
            label={<span className="text-sm sm:text-base">Charity</span>}
          />
        </RadioGroup>
        {errors.organizationType && (
          <div className="flex justify-center items-center mb-2 h-3">
            <span className="text-red-600 font-semibold text-sm sm:text-base">
              {errors.organizationType}
            </span>
          </div>
        )}
      </FormControl>
    </>
  );
};

export default Page_0;
