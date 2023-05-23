import { PromptTemplate } from "langchain/prompts";

/**
 * Example usage:
 * const output = sourceCodeProcessingPrompt.process(input);
 * console.log(output);
 */
export const sourceCodeProcessingPrompt = new PromptTemplate({
template: `As ATi18n, the translation integrator and project translator AI, your task is to process the given source code based on specific cases. Here are some examples of how to process different source code scenarios:

Case 1:
Source Code: "<Text title={Hello, world!}>Here just some text but need to be translated<"
Action: Modify source code to include translation function
Modified Source Code: "<Text title={${`translate('Hello, world!')`}}>{translate('Here just some text but need to be translated')}</"
Explanation: In this case, you need to wrap the translatable parts with the translation function.

Case 2:
Source Code: "const welcomeMessage = 'Welcome, user!';"
Action: Extract translatable part as a variable
Extracted Translatable Part: "Welcome, user!"
Explanation: In this case, you need to identify and extract the translatable part as a separate variable for easy translation.

Process the following source code accordingly to the described cases, then return the modified source code and the file name in a JSON-parseable object!

File:  {fileName}
Source code:
...
{sourceCode}
...
`,
inputVariables: ["sourceCode", "fileName"],
});
/**
 * EXAMPLE
 * 
INPUT:
{
  sourceCode: `<AlertDialogHeader>Delete guild</AlertDialogHeader>
    <AlertDialogBody>
      <FormLabel mb="3">
        What to do with existing members on the platforms?
      </FormLabel>
      <ShouldKeepPlatformAccesses
        keepAccessDescription="Everything on the platforms will remain as is for existing members, but accesses by this guild won’t be managed anymore"
        revokeAccessDescription="Existing members will lose every access granted by this guild"
        onChange={(newValue) => setRemoveAccess(newValue === "true")}
        value={removeAccess as any}
      />
    </AlertDialogBody>
    <AlertDialogFooter>
      <Button ref={cancelRef} onClick={onClose}>
        Cancel
      </Button>
      <Button
        colorScheme="red"
        ml={3}
        isLoading={isLoading}
        loadingText={signLoadingText || "Deleting"}
        onClick={() => {
          beforeDelete?.()
          onSubmit({ removePlatformAccess: removeAccess })
        }}
      >
        Delete
      </Button>
    </AlertDialogFooter>`,
  fileName: "DeleteGuildButton.tsx",
  translatablePart: "Delete guild",
  startIndex: 18
};


OUTPUT:
{
  modifiedSourceCode: `<AlertDialogHeader>{translate('Delete guild')}</AlertDialogHeader>
    <AlertDialogBody>
      <FormLabel mb="3">
        {translate('What to do with existing members on the platforms?')}
      </FormLabel>
      <ShouldKeepPlatformAccesses
        keepAccessDescription={translate('Everything on the platforms will remain as is for existing members, but accesses by this guild won’t be managed anymore')}
        revokeAccessDescription={translate('Existing members will lose every access granted by this guild')}
        onChange={(newValue) => setRemoveAccess(newValue === "true")}
        value={removeAccess as any}
      />
    </AlertDialogBody>
    <AlertDialogFooter>
      <Button ref={cancelRef} onClick={onClose}>
        {translate('Cancel')}
      </Button>
      <Button
        colorScheme="red"
        ml={3}
        isLoading={isLoading}
        loadingText={signLoadingText || translate('Deleting')}
        onClick={() => {
          beforeDelete?.()
          onSubmit({ removePlatformAccess: removeAccess })
        }}
      >
        {translate('Delete')}
      </Button>
    </AlertDialogFooter>`,
  filePath: "DeleteGuildButton.tsx"
}
*/

export default sourceCodeProcessingPrompt;