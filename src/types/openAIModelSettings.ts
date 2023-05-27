export type textCompletionModel = {
  modelName?: string;
  temperature?: number;
  maxTokens?: number;
  streaming?: boolean;
};

export type chatCompletionModel = {
  systemMessage?: string;
  humanMesage?: string;
  modelName?: string;
  temperature?: number;
  maxTokens?: number;
  streaming?: boolean;
  history?: object[];
};
