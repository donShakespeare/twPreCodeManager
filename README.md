# twPreCodeManager
An ingenious way to use TinyMCE to do the infamous thing called, HTML entitizing- supports Markdown code block

#Usage

```language-javascript
tinymce.init({
  external_plugins: {
    twPreCodeManager: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/twPreCodeManager.js",
    twExoticMarkdownEditor: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/twExoticMarkdownEditor.js", //optional
  },
  twPreCodeManagerSettings: {
    contentEditable: true, //default is false
    managerPREcss: false, //default is true
    managerForceCODEtag: false, //default is true
    managerWidth: 400, //default is calculated to be responsive
    managerHeight: 400 //default is calculated to be responsive
  },
  toolbar: "twPreCodeManager",
  contextmenu: "twPreCodeManager"
});
```
