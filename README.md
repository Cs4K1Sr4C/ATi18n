# 🤖 ATi18n - An Autonomous Translator Agent for projects with i18n module 🌍

## ⭐ Description

ATi18n is an autonomous translator agent designed for projects that utilize the i18n (internationalization) module. Its primary function is to search for combinations of ```key```, ```key/namespace```, and ```key/default_text/namespace```, and then translate the extracted ```default_text``` or the value corresponding to the key from the project's default language source translation file using the selected translation service. ATi18n has various parameters and is able to process the entire project to extract the raw texts and modify the source files to make it compatible with the i18n module. In addition, it is also able to recognize the project and make suggestions and guide the user through the integration process if the i18n module is missing. It is also able to create a new or modify and configure properly the essential (next)-i18n(ext).config.js file based on the project's directory structure.


## ✨ Features

ATi18n has the ability to collect raw texts from the source files's code.

Extracts the following functions:
- ```i18n?.t```
- ```t```
- ```translate```

Accepts the ```'``` and ```"``` in the functions for the ```key```, ```default_text```, ```namespace``` values.

Extracts the following syntaxes:
- ```translate|t|i18n?.t("{key}")```
- ```translate|t|i18n?.t("{key}", "{namespace}")```
- ```translate|t|i18n?.t("{key}", "{default_text"}, "{namespace}")```


***Important note: for the ```translate|t|i18n?.t("{key}")``` syntax it's important to set the corresponding ENV variable to the default namespace (default: "common")***

***Option: if the ```SHORTEN_AND_REWRITE``` ENV variable is ```true``` then it will remove the "default_text" parameter and change the file's soruce code at the matched part to  ```translate|t|i18n?.t("{key}", "{namespace}")``` syntax*** 

***If the key or the value isn't found in the ```/{locales_dir}/{default_language}/{namespace}.json``` source translation file then the script will create the ```"{key}": "MISSING_TRANSLATION"``` key/value pair and writes it into the ```/{locales_dir}/translation/{namespace}.json``` file.***


<details open>
<summary>

### REGEXP
  
</summary>
  
***Translation collecting***
  
![image](https://github.com/Cs4K1Sr4C/AutoTranslator-i18n/assets/126985144/00587728-9302-4408-9dde-bd68b871c217)
  
***Text extraction***
  
![image](https://github.com/Cs4K1Sr4C/AutoTranslator-i18n/assets/126985144/0a2e4257-f518-4091-b418-fcb8c793cc2b)

![image](https://github.com/Cs4K1Sr4C/AutoTranslator-i18n/assets/126985144/93bf5848-912a-4475-952a-f89f95af8d68)
  
</details>



## 🚗 Roadmap

- &#x2714; Interactive terminal
- &#x25FB; Standalone npm installable module
- &#x2714; Supports Flat Translation JSON files
- &#x2714; Supports Nested translation JSON files
- &#x2714; OpenAI Chat & Text Completion as translator service
- &#x2714; Google Translate API-less solution
- &#x2714; Ability to translate the missing key/value combination from the terminal
- &#x2714; AI guess the translation from the key if the source translation or the default text is missing
- &#x2714; AI suggests the KEY and NAMESPACE if only the default text exists
- &#x25FB; AI driven folder management
- &#x2714; Auto-detection of the project's allowed locales
- &#x2714; Translate automatically the entire project from the selected source language using the detected allowed languages
- &#x2714; Supports .ts, .tsx, .js, .jsx, .cjs, .mjs files
- &#x2714; Prompt for language/languages array creation ([{language_code, label, flag_icon}])
- &#x25FB; Parameterizable npm run scripts
- &#x25FB; Self-integration into the project's package.json
- &#x25FB; Autosearch for hard-coded parts which should be translatable
- &#x25FB; Self-integration to files, where found hard-coded parts, but the import of the translation module is missing


## 🎏 Services as translators

1. ***Google Translate*** - doesn't need API key
2. ***OpenAI***
- [x] Text completion
- [x] Chat completion 



## 🧮 Requirements

- source translation file - otherwise it will create only ```"{key}": NO_TRANSLATION_FOUND``` if there is no OpenAI API key set and the ```TRY_TO_GUESS_POSSIBLE_TRANSLATION_BY_KEY``` ENV variable is ```false```
- OpenAI API key if you want to use it as the translator service

(Note: if you have the ```translate|t|i18n?.t("{key}", "{default_text"}, "{namespace}")``` syntax in your code then it will process the extracted ```default_text``` as translatable value and creates the corresponding ```{namespace}.json``` file(s))



## ❓ How-to configure and run ⚙️🏃

1. Clone the repository using the ```git clone https://github.com/Cs4K1Sr4C/AutoTranslator-i18n``` or download and unzip the following archive: [AutoTranslator-i18n](https://github.com/Cs4K1Sr4C/AutoTranslator-i18n/archive/refs/heads/main.zip)
2. Rename the ```.env.example``` file to ```.env``` or add its content to your ```.env``` file (***Note: be sure to set the proper values which fit your project***)
3. Copy the ```.env``` and ```translator.cjs``` files to the directory where your ```package.json``` is located
4. Add the ```translate: node ./translator.cjs``` to your scripts in the ```package.json```
5. Use one of the following npm run command:
```
npm run translate
npm run translate --srcLang="<enter your source language here>" --targetLang="<enter your target language here>"
npm run translate --allAvailableLanguages --suggestKeyNamespace --onlyDefaultText --changeToGoogleAfterSuggestion
npm run translate --onlyExtractKeys
```


## 📹 Video

https://github.com/Cs4K1Sr4C/AutoTranslator-i18n/assets/126985144/7bb36994-0fca-4fc2-a7d3-5fb33ccbf2d3



## 🌟 Contribution

🤝 ***Why Contribute?***

- Enhance your coding skills...
- Collaborate with passionate developers worldwide...
- Build a solid portfolio...
- Contribute the project if aligns with your interests...
- Make a positive impact...

🔧 ***How to Contribute?***

- Fork the repository and create your branch.
- Implement your changes, ensuring code quality and adherence to guidelines.
- Test thoroughly to maintain a stable codebase.
- Submit a pull request with a clear description of your changes.
- Engage in constructive discussions with fellow contributors.
- Iterate and improve based on valuable feedback.

***Everyone is welcome to contribute! ❤️***

🎉 ***Start Contributing Now***

1. Visit the open issues.
2. Choose one that interests you or propose new ideas. 

Your contributions, big or small, are highly valued and appreciated! 🤝
