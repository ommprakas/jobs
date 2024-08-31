import React, { useState } from "react";
import { DateTimePicker } from "react-widgets";
import "react-widgets/styles.css";

function RenderDateTimePicker({
  input: { onChange, value },
  meta,
  className,
  defaultValue,
  placeholder,
  onKeyPress,
  disabled,
  valueFormat,
  showValue,
  calendarProps,
  t,
}) {
  // //console.log("showValue",showValue)
  const errorClass = meta.touched && meta.error ? "border border-danger " : "";
  const [openCalendar, setOpenCalendar] = useState(false);
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message cus_error_message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  if (value == "Invalid Date") {
    return (
      <React.Fragment>
        <DateTimePicker
          open={openCalendar}
          onChange={onChange}
          className={`removeFocus ${className} ${errorClass}`}
          onFocus={() => setOpenCalendar(true)}
          disabled={disabled}
          valueFormat={valueFormat}
          onKeyPress={onKeyPress}
          onBlur={() => setOpenCalendar(false)}
          calendarProps={calendarProps}
          placeholder={placeholder}
          valueFormat={{ dateStyle: "medium" }}
          value={null}
        />
        {renderError(meta, t)}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <DateTimePicker
        open={openCalendar}
        onChange={onChange}
        //  onCurrentDateChange={onChangeValue}
        onFocus={() => setOpenCalendar(true)}
        disabled={disabled}
        onBlur={() => setOpenCalendar(false)}
        onKeyPress={onKeyPress}
        className={`removeFocus ${className} ${errorClass}`}
        placeholder={placeholder}
        valueFormat={valueFormat}
        calendarProps={calendarProps}
        defaultValue={defaultValue}
        value={value || showValue ? new Date(value) : null}
      />
      {renderError(meta, t)}
    </React.Fragment>
  );
}
export default RenderDateTimePicker;
