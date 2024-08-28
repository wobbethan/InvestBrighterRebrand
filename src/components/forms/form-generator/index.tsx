import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { strict } from "assert";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import { Switch } from "@/components/ui/switch";

type Props = {
  type: "text" | "email" | "password" | "bool";
  inputType: "select" | "input" | "textarea" | "switch";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder?: string | null;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  defaultValue?: string;
  email?: boolean;
  checked?: boolean | null;
  control?: Control<FieldValues>;
};

const FormGenerator = ({
  errors,
  inputType,
  name,
  placeholder,
  defaultValue,
  register,
  type,
  form,
  label,
  lines,
  options,
  checked,
  control,
}: Props) => {
  switch (inputType) {
    case "input":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder!}
            form={form}
            defaultValue={defaultValue}
            {...register(name)}
            className="focus-visible:ring-transparent"
            onInput={(e) => {
              if (type === "email") {
                e.currentTarget.value = e.currentTarget.value.toLowerCase();
              }
            }}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "select":
      return (
        <Label htmlFor={`select-${label}`}>
          {label && label}
          <select form={form} id={`select-${label}`} {...register(name)}>
            {options?.length &&
              options.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "textarea":
      return (
        <Label
          className="flex flex-col gap-2 w-full"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Textarea
            form={form}
            id={`input-${label}`}
            placeholder={placeholder!}
            {...register(name)}
            rows={lines}
            defaultValue={defaultValue}
            className="focus-visible:ring-transparent"
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "switch":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          {control && (
            <Controller
              control={control}
              name={name}
              defaultValue={checked ?? false} // Ensure boolean default value
              render={({ field }) => (
                <Switch
                  id={`input-${label}`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="bg-IBblue"
                />
              )}
            />
          )}
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    default:
      return <></>;
  }
};

export default FormGenerator;
