import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AnySchema,
  ValidationError,
  ValidationErrorItem,
  ValidationOptions,
  ValidationResult,
} from "@hapi/joi";

// ------------------------------------
// Validation Hooks & Functions
// ------------------------------------
const DefaultOptions: ValidationOptions = {
  abortEarly: false,
  stripUnknown: true,
};

export interface IValidationError {
  _results: any;
  [key: string]: string;
}

export interface IUseValidation<T> {
  errors: IValidationError | null;
  setErrors: (error: IValidationError | null) => void;
  validate: (value: T) => boolean;
}

function useValidation<T>(
  schema: AnySchema,
  options: ValidationOptions = DefaultOptions
): IUseValidation<T> {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<IValidationError | null>(null);

  const appMessages = t("app.errors", { returnObjects: true }) as object;
  const messages = { ...appMessages, ...options.messages } as Record<
    string,
    string
  >;
  options = {
    ...DefaultOptions,
    ...options,
    messages,
  };

  function validate(value: T): boolean {
    const errors = getErrors(Validator(schema, value, options));
    setErrors(errors);
    return !errors;
  }

  return { errors, setErrors, validate };
}

function Validator<T>(
  schema: AnySchema,
  value: T,
  options: ValidationOptions = DefaultOptions
): ValidationResult {
  options = { ...DefaultOptions, ...options };
  return schema.validate(value, options);
}

function getErrors(results: ValidationResult): IValidationError | null {
  const errors = results.error?.details.reduce(
    (total, detail) =>
      detail?.path?.length && detail?.message
        ? {
            ...total,
            [`${detail.path.join(".")}`]: detail.message,
          }
        : total,
    {}
  ) as IValidationError;
  errors._results = results;

  return !!errors ? errors : null;
}

export default useValidation;
