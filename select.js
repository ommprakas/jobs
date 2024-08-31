import Select from "react-select";

export const ReduxFormSelect = (props) => {
  const { input, options, styles } = props;
  return (
    <Select
      {...input}
      styles={styles}
      onChange={(value) => input.onChange(value)}
      onBlur={() => input.onBlur(input.value)}
      options={options}
    />
  );
};

export const registerStyles = {
  container: (provided, state) => ({
    ...provided,
    
  }),
  menu: (provided, state) => ({
    ...provided,
    padding: 20,
    borderRadius: "1em",
  }),

  control: (provided, { selectProps: { width } }) => ({
    ...provided,
    borderRadius: "5em",
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};
