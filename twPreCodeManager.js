/*replacement to TinyMCE codesample plugin, for MODX Revolution and anybody (supports Markdown)
by donshakespeare
https://github.com/donShakespeare/twPreCodeManager

twPreCodeManager.js
An ingenious way to use TinyMCE to do the infamous thing called, HTML entitizing

  tinymce.init({
    external_plugins: {
      twPreCodeManager: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/twPreCodeManager.js"
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
*/
var twPreCodeManagerPREcss = "[twprecodemanagerprecss]{position:relative!important;max-height:100px!important;box-shadow:1px 2px 3px 3px grey;overflow:hidden!important;padding:10px!important}[twprecodemanagerprecss]:before{content:'';display:block!important;height:10px!important;position:absolute!important;bottom:-11px;width:90%;margin:auto;background:#fff;box-shadow:4px 12px 20px 20px #FBFBFB;left:0;right:0}[twprecodemanagerprecss][data-mce-selected]{outline:0!important;box-shadow:1px 2px 3px 3px #3B3A7D!important}";

if(!$("#twPreCodeManagerPREcss").length){
  $('head').append('<style id="twPreCodeManagerPREcss">'+twPreCodeManagerPREcss+'</style>')
}

function twPreCodeManagerInputBox(editor, twPreCodeManagerWidth, twPreCodeManagerHeight) {
  var languages = [
    {text: 'Prism.js Examples', value: ''},
    {text:'CSS', value: 'language-css'}, 
    {text:'HTML', value: 'language-markup'}, 
    {text:'JavaScript', value: 'language-javascript'}, 
    {text:'JSON', value: 'language-json'}, 
    {text:'PHP', value: 'language-php'}, 
    {text:'--------------', value: '', disabled: true}, 
    {text:'ABAP', value: 'language-abap'}, 
    {text:'ActionScript', value: 'language-actionscript'}, 
    {text:'Apache Configuration', value: 'language-apacheconf'}, 
    {text:'APL', value: 'language-apl'}, 
    {text:'AppleScript', value: 'language-applescript'}, 
    {text:'AsciiDoc', value: 'language-asciidoc'}, 
    {text:'ASP.NET (C#)', value: 'language-aspnet'}, 
    {text:'AutoHotkey', value: 'language-autohotkey'}, 
    {text:'AutoIt', value: 'language-autoit'}, 
    {text:'BASIC', value: 'language-basic'}, 
    {text:'C-like', value: 'language-clike'}, 
    {text:'CoffeeScript', value: 'language-coffeescript'}, 
    {text:'C++', value: 'language-cpp'}, 
    {text:'C#', value: 'language-csharp'}, 
    {text:'CSS', value: 'language-css'}, 
    {text:'CSS Extras', value: 'language-css-extras'}, 
    {text:'F#', value: 'language-fsharp'}, 
    {text:'GLSL', value: 'language-glsl'}, 
    {text:'HTML', value: 'language-markup'}, 
    {text:'HTTP', value: 'language-http'}, 
    {text:'Inform 7', value: 'language-inform7'}, 
    {text:'JavaScript', value: 'language-javascript'}, 
    {text:'JSON', value: 'language-json'}, 
    {text:'React JSX', value: 'language-jsx'}, 
    {text:'LaTeX', value: 'language-latex'}, 
    {text:'LOLCODE', value: 'language-lolcode'}, 
    {text:'MathML', value: 'language-mathml'}, 
    {text:'MATLAB', value: 'language-matlab'}, 
    {text:'MEL', value: 'language-mel'}, 
    {text:'NASM', value: 'language-nasm'}, 
    {text:'nginx', value: 'language-nginx'}, 
    {text:'NSIS', value: 'language-nsis'}, 
    {text:'Objective-C', value: 'language-objectivec'}, 
    {text:'OCaml', value: 'language-ocaml'}, 
    {text:'PARI/GP', value: 'language-parigp'}, 
    {text:'PHP', value: 'language-php'}, 
    {text:'PHP Extras', value: 'language-php-extras'}, 
    {text:'PowerShell', value: 'language-powershell'}, 
    {text:'reST (reStructuredText)', value: 'language-rest'}, 
    {text:'SAS', value: 'language-sas'}, 
    {text:'Sass (Sass)', value: 'language-sass'}, 
    {text:'Sass (Scss)', value: 'language-scss'}, 
    {text:'SQL', value: 'language-sql'}, 
    {text:'SVG', value: 'language-svg'}, 
    {text:'TypeScript', value: 'language-typescript'}, 
    {text:'VHDL', value: 'language-vhdl'}, 
    {text:'vim', value: 'language-vim'}, 
    {text:'Wiki markup', value: 'language-wiki'}, 
    {text:'XML', value: 'language-xml'}, 
    {text:'YAML', value: 'language-yaml'}
  ];

  function insertCodeSample(editor, language, code) {
   var editor = tinymce.activeEditor;
   editor.undoManager.transact(function() {
    var node = getSelectedCodeSample(editor);
    code = editor.dom.encode(code); //from  submitted form
    if (node && node.nodeName=='PRE' &&  !editor.getParam('twExoticMarkdownEditor', false)) {
      node.setAttribute("class", $('.mce-preLanguageTextBox').val());
      // if(tinymce.activeEditor.getParam("twPreCodeManagerSettings",{}).managerForceCODEtag && !node.firstChild){
      //   node.innerHTML ="<code></code>";
      // }
      if(node.firstChild){
        node.firstChild.setAttribute("class", $('.mce-codeLanguageTextBox').val());
        node.firstChild.innerHTML = code;
      }
      else{
        node.innerHTML = code;
       }
      editor.selection.select(node);
    }
    else {
      if(editor.getParam('twExoticMarkdownEditor', false)){
        editor.insertContent('<br>```'+language+'<br>' + code.replace(/ /g, "&nbsp;").replace(/(?:\r\n|\r|\n)/g, "<br />") + '<br>```<br><br>');
      }
      else{
         editor.insertContent('<pre id="__new" class='+language+'><code class='+language+'>' + code + '</code></pre>');
         editor.selection.select(tinymce.activeEditor.$('#__new').removeAttr('id')[0]);
      }
    }
   });
  }

  function getSelectedCodeSample(editor) {
   var node = tinymce.activeEditor.selection.getNode();
   if (node && node.nodeName == 'PRE') {
    return node;
   }
   return null;
  }

 function getCurrentCode(editor) {
  var node = getSelectedCodeSample(editor);

  if (node) {
    if (node.firstChild) {
     return node.firstChild.innerText;
    }
    else{
     return node.innerText;
    }
  }
  else{
    return '';
  }
 }

 function getPreCurrentLanguage(editor) {
  var matches, node = getSelectedCodeSample(editor);
  if (node) {
   matches = node.className;
   return matches ? matches : '';
  }
  return '';
 }

 function getCodeCurrentLanguage(editor) {
  var matches, node = getSelectedCodeSample(editor);
  if (node && node.firstChild) {
   matches = node.firstChild.className;
   return matches ? matches : '';
  }
  return '';
 }

 return {
  open: function(editor) {
   tinymce.activeEditor.windowManager.open({
    title: '<pre><code> Manager',
    width : twPreCodeManagerWidth,
    height : twPreCodeManagerHeight,
    layout: 'fit',
    body: [
     {
      type: 'textbox',
      tooltip: 'Enter classes directly and/or use preselects',
      name: 'language',
      label: 'PRE classes',
      maxWidth: 200,
      value: getPreCurrentLanguage(editor),
      // onchange: function(){
      //   var node = tinymce.activeEditor.selection.getNode();
      //   if(node){
      //     var currentClass = "";
      //     if(this.value() !== ""){
      //       var currentClass = this.value() + " ";
      //     }
      //     $(node).attr("class", this.value());
      //     $(node).find("code").attr("class", this.value()); //allow optional
      //   }
      // },
      // values: languages
      classes: 'preLanguageTextBox'
     },
     {
      type: 'textbox',
      tooltip: 'Enter classes directly and/or use preselects',
      label: 'CODE classes',
      maxWidth: 200,
      value: getCodeCurrentLanguage(editor),
      classes: 'codeLanguageTextBox',
      onPostRender:function(){
         var node = tinymce.activeEditor.selection.getNode();
         if (node && node.nodeName == "PRE" && !node.firstChild && tinymce.activeEditor.getParam("twPreCodeManagerSettings",{}).managerForceCODEtag) {
          node.innerHTML ="<code></code>";
         }
         if (node && node.nodeName == "PRE" && !node.firstChild || tinymce.activeEditor.getParam('twExoticMarkdownEditor', false)) {
          $(".mce-codeLanguageTextBox").parent().parent().hide();
         }
      }
     },
     {
      type: 'listbox',
      tooltip: 'Some Language preselects',
      label: 'Presets',
      maxWidth: 200,
      value: getPreCurrentLanguage(editor),
      values: languages,
      classes: 'languageListBox',
      onselect: function(){
        var currentPreLan = "";
        if($(".mce-preLanguageTextBox").val().trim() !== ""){
          var currentPreLan = $(".mce-preLanguageTextBox").val() + " ";
        }
        var currentCodeLan = "";
        if($(".mce-codeLanguageTextBox").val().trim() !== ""){
          var currentCodeLan = $(".mce-codeLanguageTextBox").val() + " ";
        }
        $('.mce-preLanguageTextBox')[0].value = currentPreLan+this.value();
        $('.mce-codeLanguageTextBox')[0].value = currentCodeLan+this.value();
        // if ("createEvent" in document) {
        //   var evt = document.createEvent("HTMLEvents");
        //   evt.initEvent("change", false, true);
        //   $('.mce-preLanguageTextBox')[0].dispatchEvent(evt);
        // }
        // else {
        //   $('.mce-preLanguageTextBox')[0].fireEvent("onchange");
        // }
      }
     },

     {
      type: 'textbox',
      name: 'code',
      multiline: true,
      spellcheck: false,
      ariaLabel: 'Code view',
      flex: 1,
      style: 'direction: ltr; text-align: left',
      value: getCurrentCode(editor),
      classes: 'codeTextarea',
      // tooltip: 'Pasted code will automatically and safely be entitized',
      onPostRender:function(){
       $('.mce-codeTextarea').attr('placeholder', 'Just paste your source code. It will automatically and safely be entitized. All Markdown is left as is');
      }
     }
    ],
    onSubmit: function(e) {
      if($(".mce-codeTextarea").val()){
        insertCodeSample(editor, e.data.language, e.data.code);
        var node = tinymce.activeEditor.selection.getNode();
      }
    }
   });
  }
 };
}

tinymce.PluginManager.add('twPreCodeManager', function(editor) {
  editor.on('SetContent', function() {
   if(editor.getParam("twPreCodeManagerSettings",{}).contentEditable == true){
   }
   else{
     $(editor.getBody()).find("pre").attr('contenteditable', false);
   }
   if(editor.getParam("twPreCodeManagerSettings",{}).managerPREcss == false){
   }
   else{
     $(editor.getBody()).find("pre").attr("twprecodemanagerprecss",1);
   }
  });
  editor.addCommand('twPreCodeManager', function() {
    var twPreCodeManagerWidth = editor.getParam("twPreCodeManagerSettings",{}).managerWidth || window.innerWidth / 1.4;
    var twPreCodeManagerHeight = editor.getParam("twPreCodeManagerSettings",{}).managerHeight || window.innerHeight / 1.5;
    twPreCodeManagerInputBox(editor,twPreCodeManagerWidth,twPreCodeManagerHeight).open();
  });
  editor.addButton('twPreCodeManager', {
   icon: 'codesample',
   cmd: 'twPreCodeManager',
   title: 'Insert/edit <pre><code>'
  });
  editor.addMenuItem('twPreCodeManager', {
   icon: 'codesample',
   cmd: 'twPreCodeManager',
   text: 'Insert/edit <pre><code>'
  });
  editor.on('DblClick', function(e) {
    if (e.target.nodeName == 'PRE' || e.target.nodeName == 'CODE'){
      editor.execCommand('twPreCodeManager', true);
    }
  });
 });
