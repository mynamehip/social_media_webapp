const Input = ({
  label,
  name,
  pattern,
  errorMessage,
  onChange,
  handleValidate,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={label} className=" font-semibold">
          {label}
        </label>
      )}
      <input
        type={name}
        name={name}
        onChange={onChange}
        pattern={pattern}
        onBlur={handleValidate}
        className="boder border-b-2 bg-transparent border-b-slate-950 outline-none focus:outline-none w-full px-2"
      />
      <div className=" text-sm text-red min-h-8 my-2">{errorMessage}</div>
    </div>
  );
};

export default Input;
