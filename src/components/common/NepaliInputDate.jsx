import React, { useState, forwardRef } from "react";
import { Input } from "../ui/input";


// Nepali Date Input Component
const NepaliDateInput = forwardRef(
  (
    {
      value = "",
      onChange,
      onBlur,
      name,
      placeholder = "YYYY/MM/DD",
      className = "",
      ...props
    },
    ref,
  ) => {
    const [dateValue, setDateValue] = useState(value || "");
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);

    // Nepali months with their maximum days
    const nepaliMonthDays = {
      1: 31,
      2: 31,
      3: 31,
      4: 32,
      5: 31,
      6: 31,
      7: 30,
      8: 29,
      9: 30,
      10: 29,
      11: 30,
      12: 30,
    };

    const validateNepaliDate = (year, month, day) => {
      if (year < 2000 || year > 3000) {
        return "(Year must be between 2000-3000)";
      }

      if (month < 1 || month > 12) {
        return "(Month must be between 1-12)";
      }

      const maxDays = nepaliMonthDays[month];
      if (day < 1 || day > maxDays) {
        return `(This month has only ${maxDays} days)`;
      }

      if (day === 32 && ![4].includes(month)) {
        return "(This month doesn't have 32 days)";
      }

      return null;
    };

    const formatInput = (input) => {
      const numbers = input.replace(/[^\d]/g, "");
      let limited = numbers.slice(0, 8);

      let formatted = "";

      if (limited.length > 0) {
        // Year validation - restrict to 2000-3000
        let year = limited.slice(0, 4);
        if (year.length === 4) {
          const yearNum = parseInt(year);
          if (yearNum < 2000) {
            year = "2000";
          } else if (yearNum > 3000) {
            year = "3000";
          }
          limited = year + limited.slice(4);
        }
        formatted = limited.slice(0, 4);

        if (limited.length > 4) {
          // Month validation - restrict to 01-12
          let month = limited.slice(4, 6);
          if (month.length === 2) {
            const monthNum = parseInt(month);
            if (monthNum > 12) {
              month = "12";
            } else if (monthNum < 1 && month !== "0") {
              month = "01";
            }
            limited = limited.slice(0, 4) + month + limited.slice(6);
          } else if (month.length === 1 && parseInt(month) > 1) {
            month = "0" + month;
            limited = limited.slice(0, 4) + month + limited.slice(5);
          }
          formatted += "/" + limited.slice(4, 6);

          if (limited.length > 6) {
            // Day validation - restrict based on month
            let day = limited.slice(6, 8);
            if (day.length === 2) {
              const dayNum = parseInt(day);
              const monthNum = parseInt(limited.slice(4, 6));
              const maxDays = nepaliMonthDays[monthNum] || 32;

              if (dayNum > maxDays) {
                day = maxDays.toString().padStart(2, "0");
              } else if (dayNum < 1 && day !== "0") {
                day = "01";
              }
              limited = limited.slice(0, 6) + day;
            } else if (day.length === 1 && parseInt(day) > 3) {
              day = "0" + day;
              limited = limited.slice(0, 6) + day;
            }
            formatted += "/" + limited.slice(6, 8);
          }
        }
      }

      return formatted;
    };

    const handleInputChange = (e) => {
      const input = e.target.value;
      const formatted = formatInput(input);

      setDateValue(formatted);

      if (onChange) {
        onChange(formatted);
      }

      const parts = formatted.split("/");

      if (
        parts.length === 3 &&
        parts[0].length === 4 &&
        parts[1].length === 2 &&
        parts[2].length === 2
      ) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        const validationError = validateNepaliDate(year, month, day);

        if (validationError) {
          setError(validationError);
          setIsValid(false);
        } else {
          setError("");
          setIsValid(true);
        }
      } else {
        setError("");
        setIsValid(false);
      }
    };

    const handleKeyDown = (e) => {
      const input = e.target;
      const value = input.value.replace(/[^\d]/g, "");
      const cursorPos = input.selectionStart;
      const currentSection = getCurrentSection(input.value, cursorPos);

      // Allow: backspace, delete, tab, escape, enter, arrows, home, end
      if (
        [8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)
      ) {
        return;
      }

      // Ensure that it is a number
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
        return;
      }

      const digit = e.key;

      // Prevent invalid input based on current section and position
      if (currentSection === "year") {
        const yearPart = value.slice(0, 4);
        if (yearPart.length === 0 && parseInt(digit) < 2) {
          e.preventDefault(); // Year must start with 2 or 3
          return;
        }
        if (yearPart.length === 1 && yearPart === "2" && parseInt(digit) < 0) {
          // Allow any digit for second position when year starts with 2
          return;
        }
        if (yearPart.length === 1 && parseInt(yearPart) > 3) {
          e.preventDefault(); // Year can't start with more than 3
          return;
        }
      } else if (currentSection === "month") {
        const monthPart = value.slice(4, 6);
        if (monthPart.length === 0 && parseInt(digit) > 1) {
          e.preventDefault(); // Month first digit can't be more than 1
          return;
        }
        if (
          monthPart.length === 1 &&
          monthPart === "1" &&
          parseInt(digit) > 2
        ) {
          e.preventDefault(); // Month can't be more than 12
          return;
        }
        if (
          monthPart.length === 1 &&
          monthPart === "0" &&
          parseInt(digit) === 0
        ) {
          e.preventDefault(); // Month can't be 00
          return;
        }
      } else if (currentSection === "day") {
        const dayPart = value.slice(6, 8);
        const monthNum = parseInt(value.slice(4, 6)) || 1;
        const maxDays = nepaliMonthDays[monthNum] || 32;

        if (dayPart.length === 0 && parseInt(digit) > 3) {
          e.preventDefault(); // Day first digit can't be more than 3
          return;
        }
        if (dayPart.length === 1) {
          const potentialDay = parseInt(dayPart + digit);
          if (potentialDay > maxDays || (dayPart === "0" && digit === "0")) {
            e.preventDefault(); // Day can't exceed max days for month or be 00
            return;
          }
        }
      }
    };

    const getCurrentSection = (value, cursorPos) => {
      const cleanValue = value.replace(/[^\d]/g, "");
      const slashPositions = [];
      for (let i = 0; i < value.length; i++) {
        if (value[i] === "/") {
          slashPositions.push(i);
        }
      }

      if (slashPositions.length === 0 || cursorPos <= slashPositions[0]) {
        return "year";
      } else if (
        slashPositions.length === 1 ||
        cursorPos <= slashPositions[1]
      ) {
        return "month";
      } else {
        return "day";
      }
    };

    const handleBlur = (e) => {
      if (onBlur) {
        onBlur(e);
      }
    };

    React.useEffect(() => {
      if (value !== undefined && value !== dateValue) {
        setDateValue(value);
      }
    }, [value]);

    return (
      <div className="space-y-2">
        <Input
          ref={ref}
          name={name}
          type="text"
          value={dateValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`font-mono ${error ? "border-red-500" : isValid ? "border-green-500" : ""} ${className}`}
          maxLength={10}
          {...props}
        />
      </div>
    );
  },
);

NepaliDateInput.displayName = "NepaliDateInput";

export { NepaliDateInput };
