import joi from "joi";

export interface BaseHighlightOptions {
  readonly themeIdOrPath?: string;
  readonly languageIdOrPath?: string;
  readonly width: number;
}

export async function BaseHighlightOptionsSchema(): Promise<joi.ObjectSchema> {
  return joi
    .object({
      themeIdOrPath: joi.string(),
      languageIdOrPath: joi.string(),
      width: joi.number().required().min(10).max(1000),
    })
    .required();
}

export interface HighlightSourceOptions extends BaseHighlightOptions {
  readonly source: string;
}

export async function HighlightSourceOptionsSchema(): Promise<joi.ObjectSchema> {
  const baseSchema = await BaseHighlightOptionsSchema();

  return baseSchema.keys({
    source: joi.string().required().min(1),
  });
}

export enum DiagnosticSeverity {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Hint = "hint",
}

export interface HighlightDiagnosticOptions extends BaseHighlightOptions {
  readonly source: string;
  readonly severity: DiagnosticSeverity;

  readonly range: {
    readonly from: {
      readonly line: number;
      readonly column: number;
    };
    readonly to: {
      readonly line: number;
      readonly column: number;
    };
  };
}

export async function HighlightDiagnosticOptionsSchema(): Promise<joi.ObjectSchema> {
  const baseSchema = await BaseHighlightOptionsSchema();

  return baseSchema.keys({
    source: joi.string().required().min(1),
    severity: joi.string().required().valid("error", "warning", "info", "hint"),
    range: joi
      .object({
        from: joi
          .object({
            line: joi.number().required().min(0).max(10000),
            column: joi.number().required().min(0).max(10000),
          })
          .required(),
        to: joi
          .object({
            line: joi.number().required().min(0).max(10000),
            column: joi.number().required().min(0).max(10000),
          })
          .required(),
      })
      .required(),
  });
}

export interface HighlightDiffOptions extends BaseHighlightOptions {
  readonly beforeSource: string;
  readonly afterSource: string;
}

export async function HighlightDiffOptionsSchema(): Promise<joi.ObjectSchema> {
  const baseSchema = await BaseHighlightOptionsSchema();

  return baseSchema.keys({
    beforeSource: joi.string().required().min(1),
    afterSource: joi.string().required().min(1),
  });
}
