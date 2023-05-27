import fs from "fs";
import { BufferMemory } from "langchain/memory";
import type { Examples, Example } from "../utils/types";

class MemoryHandler {
    bufferMemory: BufferMemory;

    constructor(MemoryBuffer: BufferMemory) {
        this.bufferMemory = MemoryBuffer;
    }

    static saveExampleToBufferMemory(example: Example, bufferMemory: BufferMemory) {
        const { input, output } = example;
        bufferMemory.saveContext(input, output);
    }

    static saveExamplesToBufferMemory(examples: Examples, bufferMemory: BufferMemory) {
        examples.forEach((example: Example) => {
            const { input, output } = example;
            bufferMemory.saveContext(input, output);
        });
    }

    static saveBufferMemory(memory: BufferMemory, filePath: string) {
        const serializedMemory = JSON.stringify(memory);
        fs.writeFileSync(filePath, serializedMemory);
    }

    static loadBufferMemory(filePath: string) {
        const serializedMemory = fs.readFileSync(filePath, "utf8");
        const deserializedMemory = JSON.parse(serializedMemory);
        return new BufferMemory(deserializedMemory);
    }
}

export default MemoryHandler;
