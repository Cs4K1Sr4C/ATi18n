import * as p from "@clack/prompts";

const spin = p.spinner();
const total = 10000;

type SpinnerStage = {
    text: string,
    progress?: number,
    duration?: number
}

interface SpinnerOptions {
    startText: string | undefined | null,
    doneText: string | undefined | null,
    failText?: string | undefined | null,
    stages: SpinnerStage[]
}

export const customSpinner = async (SpinnerOptions: SpinnerOptions) => {
    console.log(SpinnerOptions);

    let progress = 0;
    let stage = 0;

    spin.start(SpinnerOptions.startText);

    await new Promise((resolve) => {
        const timer = setInterval(() => {
            progress = Math.min(total, progress + 100);
            if (progress >= total) {
                clearInterval(timer);
                resolve(true);
            }
            spin.message(`Loading packages [${progress}/${total}]`);
            stage++;
        }, 100);
    });

    spin.stop(SpinnerOptions.doneText);

}