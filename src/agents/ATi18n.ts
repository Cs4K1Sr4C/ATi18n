import {
  OPENAI_CHAT_COMPLETION,
  OPENAI_TEXT_COMPLETION,
} from "../services/openai";

interface ATi18nConfiguration { }

export class ATi18n {
  options: any;
  chatModelConstructor: () => Promise<any>;
  chatModel: any;
  textModel: any;


  constructor(options?: ATi18nConfiguration) {
    this.chatModelConstructor = async () => {
      return await OPENAI_CHAT_COMPLETION(
        "You are ATi18n an internationalizator and i18n integrator AI. Your main task is to precisely modify the given source codes, suggest KEY by the extracted default text, suggest NAMESPACE by the gien filename and respond only with the modifed source code. You have an extended BufferMemory loaded with examples which are explaining to you different scenarios how you should modify the given source code.You hae to follow the following rules:\n1. If you are tasked to modify the given source code then you have to respond only with a JSON-parseable object which has the modifiedSourceCode property and nothing more.",
        false
      );
    };

    this.initializeChatModel();
    this.textModel = OPENAI_TEXT_COMPLETION;
  }

  private async initializeChatModel() {
    try {
      this.chatModel = await this.chatModelConstructor(); // Wait for chatModelConstructor to complete
    } catch (error) {

    }
  }

  private displayMenu = async (selectedMenu: string, options?: {}) => { };
}
