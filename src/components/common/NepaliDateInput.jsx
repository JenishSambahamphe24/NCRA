import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function NepaliDateInput({
    name,
    label,
    variant,
    value,
    onChange,
    format = "YYYY/MM/DD",
    error,
    helperText,
    required = false,
    disabled = false,
    size = "small",
    fullWidth = true,
    sx = {},
    ...otherProps
}) {
    const handleDateChange = (newValue) => {
        const formattedValue = newValue ? newValue.format(format) : "";
        if (onChange) {
            onChange(formattedValue, newValue);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                    required={required}
                    size={size}
                    label={label}
                    fullWidth={fullWidth}
                    variant={variant}
                    name={name}
                    value={value ? dayjs(value, format) : null}
                    onChange={handleDateChange}
                    format={format}
                    error={!!error}
                    disabled={disabled}
                    sx={{
                        "& .MuiInputBase-root-MuiInput-root": {
                            fontSize: "12px",
                        },
                        "& .MuiFormLabel-root.Mui-error": {
                            color: "inherit",
                        },
                        "& .MuiInputBase-root.Mui-error:before": {
                            borderColor: "red",
                        },
                        "& .MuiInputBase-root.Mui-error:after": {
                            borderColor: "red",
                        },
                        ...sx,
                    }}
                    {...otherProps}
                />
            </LocalizationProvider>
            {helperText && (
                <div style={{
                    color: error ? "red" : "#666",
                    fontSize: "12px",
                    marginTop: "4px"
                }}>
                    {helperText}
                </div>
            )}
        </div>
    );
}

export default NepaliDateInput;