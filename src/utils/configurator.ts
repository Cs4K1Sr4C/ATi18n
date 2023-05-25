import * as p from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from 'node:timers/promises';

export const TEST = async () => {
    const project = await p.group(
        {
            path: () =>
                p.text({
                    message: 'Where should we create your project?',
                    placeholder: './sparkling-solid',
                    validate: (value) => {
                        if (!value) return 'Please enter a path.';
                        if (value[0] !== '.') return 'Please enter a relative path.';
                    },
                }),
            password: () =>
                p.password({
                    message: 'Provide a password',
                    validate: (value) => {
                        if (!value) return 'Please enter a password.';
                        if (value.length < 5) return 'Password should have at least 5 characters.';
                    },
                }),
            type: ({ results }) =>
                p.select({
                    message: `Pick a project type within "${results.path}"`,
                    initialValue: 'ts',
                    options: [
                        { value: 'ts', label: 'TypeScript' },
                        { value: 'js', label: 'JavaScript' },
                        { value: 'coffee', label: 'CoffeeScript', hint: 'oh no' },
                    ],
                }),
            tools: () =>
                p.multiselect({
                    message: 'Select additional tools.',
                    initialValues: ['prettier', 'eslint'],
                    options: [
                        { value: 'prettier', label: 'Prettier', hint: 'recommended' },
                        { value: 'eslint', label: 'ESLint', hint: 'recommended' },
                        { value: 'stylelint', label: 'Stylelint' },
                        { value: 'gh-action', label: 'GitHub Action' },
                    ],
                }),
            install: () =>
                p.confirm({
                    message: 'Install dependencies?',
                    initialValue: false,
                }),
        },
        {
            onCancel: () => {
                p.cancel('Operation cancelled.');
                process.exit(0);
            },
        }
    );

    if (project.install) {
        const s = p.spinner();
        s.start('Installing via pnpm');
        await setTimeout(5000);
        s.stop('Installed via pnpm');
    }

    let nextSteps = `cd ${project.path}\n${project.install ? '' : 'pnpm install\n'}pnpm dev`;

    p.note(nextSteps, 'Next steps.');

}