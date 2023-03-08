import { ChangeEventHandler } from "react";
import classes from "./InputField.module.css";

export const InputField = ({
  label,
  required,
  title,
  subTitle,
  leftSideContent,
  children,
}: any) => {
  return (
    <div className={classes.formGroup}>
      <div className={classes.formGroupWrapper}>
        <div>
          <label htmlFor={label} className={classes.formGroupTitle}>
            {title} {required && <sup className="text-danger">*</sup>}
          </label>

          {subTitle && (
            <div className={classes.formGroupSubTitle}>{subTitle}</div>
          )}
        </div>

        {leftSideContent && <div>{leftSideContent}</div>}
      </div>

      {children}
    </div>
  );
};

export const Input = ({
  listElement,
  prefix,
  postfix,
  onPostfixClick,
  label,
  placeholder,
  type = "text",
  disabled,
  onClick,
  onChange,
  value,
  min,
  max,
  step,
}: any) => {
  return (
    <div
      className={`${classes.inputGroup}  ${
        listElement ? classes.listElement : ""
      } ${disabled ? classes.disabled : ""}`}
    >
      {prefix && <div className={classes.inputGroupPrefix}>{prefix}</div>}

      <input
        type={type}
        name={label}
        id={label}
        placeholder={placeholder}
        disabled={disabled}
        className={classes.inputGroupInput}
        onClick={onClick}
        onChange={onChange}
        defaultValue={value}
        min={min}
        max={max}
        step={step}
      />

      {postfix && (
        <div className={classes.inputGroupPostfix} onClick={onPostfixClick}>
          {postfix}
        </div>
      )}
    </div>
  );
};

interface TextareaType {
  id: string;
  placeholder: string;
  value: string;
  setValue: ChangeEventHandler<HTMLTextAreaElement>;
}

export const Textarea = ({
  id,
  placeholder,
  value,
  setValue,
}: TextareaType) => {
  return (
    <textarea
      name={id}
      id={id}
      placeholder={placeholder}
      defaultValue={value}
      onChange={setValue}
      className={classes.textarea}
    />
  );
};

export const InputError = ({ error }: any) => (
  <span className={"text-danger " + classes.error}>{error}</span>
);
//lang ok
