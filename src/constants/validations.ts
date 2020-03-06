import {useState} from "react";
import {useTranslation} from "react-i18next";

import {AnySchema, ValidationError, ValidationErrorItem, ValidationOptions, ValidationResult} from "@hapi/joi";

// ------------------------------------
// Validation Hooks & Functions
// ---------------------
const DefaultOptions: ValidationOptions = {abortEarly: false, stripUnknown: true};

interface IValidationError {
    [key: string]: string;
}

interface IUseValidation<T> {
    // errors: ValidationError | null;
    // setErrors: (error: ValidationError | null) => void;
    errors: IValidationError | null;
    setErrors: (error: IValidationError | null) => void;
    validate: (value: T) => boolean;
}

function useValidation<T>(
    schema: AnySchema,
    options: ValidationOptions = DefaultOptions): IUseValidation<T> {
    const {t} = useTranslation();
    const [errors, setErrors] = useState<IValidationError | null>(null);

    const appMessages = t('app.errors', {returnObjects: true}) as object;
    const messages = {...appMessages, ...options.messages} as Record<string, string>;
    options = {
        ...DefaultOptions,
        ...options,
        messages,
    };

    function validate(value: T): boolean {
        const results = Validator(schema, value, options);
        const errors = getErrors(results);
        setErrors(errors);
        return !errors;
    }

    return {errors, setErrors, validate};
}

function Validator<T>(
    schema: AnySchema,
    value: T,
    options: ValidationOptions = DefaultOptions): ValidationResult {
    options = {...DefaultOptions, ...options};
    return schema.validate(value, options);
}

function getErrors(results: ValidationResult): IValidationError | null {
    console.log('results', results);

    const errors = results.error?.details.reduce((total, detail) =>
        detail?.path?.length && detail?.message
            ? ({
                ...total,
                [`${detail.path.join('.')}`]: detail.message
            })
            : total, {}) as IValidationError;

    console.log('new errors', errors);
    return !!errors ? errors : null;
}

export function HasError(
    paths: Array<string | number>,
    error: ValidationError | null): boolean {
    if (!error) return false;

    return !!GetError(paths, error);
}

export function GetError(
    paths: Array<string | number>,
    error: ValidationError | null): string {
    if (!error) return '';

    const found = error.details.find((detail: ValidationErrorItem) =>
        detail.path.length === paths.length
            ? detail.path.every((path, i) =>
            path === paths[i] as unknown)
            : false
    );
    return found ? found.message : '';
}

export default useValidation;
