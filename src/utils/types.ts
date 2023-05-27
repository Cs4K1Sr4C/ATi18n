import {
    InputValues,
    OutputValues,
} from "langchain/dist/memory/base";


export type menuOption = {
    label: string,
    value: string | number
}

export type language = {
    code: string,
    title: string,
    flag: string,
    rtl?: boolean
}

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

export type Examples = Example[]

export type Example = {
    input: InputValues,
    output: OutputValues
}