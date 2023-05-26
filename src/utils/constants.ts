import { menuOption } from './types'

export const GPT_35_TURBO = "gpt-3.5-turbo" as const;
export const GPT_4 = "gpt-4" as const;
export const GPT_MODEL_NAMES = [GPT_35_TURBO, GPT_4];

export const mainMenuOptions: menuOption[] = [
    { label: "Extract", value: "1" },
    { label: "Translate", value: "2" },
    { label: "Settings", value: "3" },
    { label: "Help", value: "4" },
    { label: "Exit", value: "X" }
]

export const extractionMenuOptions: menuOption[] = [
    {
        label: "Extract every text then ask me what shoud you do next",
        value: "1",
    },
    {
        label: "Extract every text then automatically translate them",
        value: "2",
    },
    { label: "X. Back to the Main menu", value: "X" },
]

export const translationMenuOptions: menuOption[] = [
    {
        label: "Translate the parts which are standing without {key} and {namespace}",
        value: "1",
    },
    {
        label: "Translate the parts whch have with {key} and {namespace}",
        value: "2",
    },
    { label: "Translate the parts which have {key} only", value: "3" },
    {
        label:
            "Translate the parts which have {default_text} and {namespace}",
        value: "4",
    },
    {
        label: "Translate the parts which have {default_text} only",
        value: "5",
    },
    { label: "X. Back to the Main menu", value: "X" },
]

export const settingsMenuOptions: menuOption[] = [
    { label: "Change the Translation Service", value: "1" },
    { label: "Set/Change OpenAI key", value: "2" },
    { label: "Set/Change OpenAI Translation Mode", value: "3" },
    { label: "Set/change OpenAI Model", value: "4" },
    { label: "Enable/Disable Suggestions for KEY and NAMESPACE", value: "5" },
    { label: "Enable/Disable Debug mode", value: "6" },
    { label: "Back to the Main menu", value: "X" },
]