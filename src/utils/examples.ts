import type { Examples, Example } from "./types";
import { BufferMemory } from "langchain/memory";
import {
    InputValues,
    OutputValues,
} from "langchain/dist/memory/base";

const saveExamplesToMemory = (examples: Examples, sourceMemory: BufferMemory) => {
    examples.forEach((example: Example) => {
        const { input, output } = example;
        sourceMemory.saveContext(input, output);
    });
};