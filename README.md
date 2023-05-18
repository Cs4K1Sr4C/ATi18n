# 🤖 AutoTranslator-i18n - An Autonomous Translator Agent for projects with i18n internationalization modules 🌍

#### #### AT-i18n will searches for the ```key```, ```key/namespace```, ```key/default_text/namespace``` combinations then translates the extracted ```default_text``` or the key's value from the project's default language source translation file using the selected translation service.



## ✨ Features

Extracts the following functions:
- ```i18n?.t```
- ```t```
- ```translate```

Accepts the ```'``` and ```"``` in the functions for the ```key```, ```default_text```, ```namespace``` values.

Extracts the following syntaxes:
- ```translate|t|i18n?.t("{key}")```
- ```translate|t|i18n?.t("{key}", "{namespace}")```
- ```translate|t|i18n?.t("{key}", "{default_text"}, "{namespace}")```

***REGEX***
![image](https://github.com/Cs4K1Sr4C/AutoTranslator-i18n/assets/126985144/00587728-9302-4408-9dde-bd68b871c217)

***Important note: for the ```translate|t|i18n?.t("{key}")``` syntax it's important to set the corresponding ENV variable to the default namespace (default: "common")***

***Option: if the ```SHORTEN_AND_REWRITE``` ENV variable is ```true``` then it will remove the "default_text" parameter and change the file's soruce code at the matched part to  ```translate|t|i18n?.t("{key}", "{namespace}")``` syntax*** 

***If the key or the value isn't found in the ```/{locales_dir}/{default_language}/{namespace}.json``` source translation file then the script will create the ```"{key}": "MISSING_TRANSLATION"``` key/value pair and writes it into the ```/{locales_dir}/translation/{namespace}.json``` file.***



## 🚗 Roadmap

- [x] Interactive terminal
- [ ] Standalone npm installable module
- [x] Supports flat JSON
- [ ] Supports Nested JSON
- [x] OpenAI Chat & Text Completion as translator service
- [x] Google Translate API-less solution
- [ ] Ability to translate the missing key/value combination from the terminal
- [ ] AI guess the translation from the key if the source translation or the default text is missing
- [ ] AI driven folder management
- [ ] Auto-detection of the project's allowed locales
- [ ] Translate automatically the entire project from the selected source language usig the detected allowed languages
- [x] Supports .ts, tsx, .js, .jsx, .cjs, .mjs files
- [ ] Parameterizable npm run scripts
- [ ] Self-integration into the project's package.json
- [ ] Autosearch for hard-coded parts which should be translatable
- [ ] Self-integration to files, where found hard-coded parts, but the import of the translation module is missing



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
npm run test
npm run translate --srcLang="en" --targetLang="en"
npm run translate --all-possible --srcLang="en"
npm run translate --manual=true --srcLang="en" --targetLang=<enter your target language here>
npm run find-missing-module-integrations
```



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