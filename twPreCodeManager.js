/*replacement to TinyMCE codesample plugin (supports Markdown); dedicated to MODX Revolution community and anybody else out there.
by donshakespeare
https://github.com/donShakespeare/twPreCodeManager

twPreCodeManager.js
An ingenious way to use TinyMCE to do the infamous thing called, HTML entitizing

  tinymce.init({
    external_plugins: {
      twPreCodeManager: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/twPreCodeManager.js"
    },
    twPreCodeManagerSettings: {
      protectMODXsquareBrackets: true, // default is false
      protectMODXsquareBracketsXter: "*", // default xter to place in between open square brackets [[ = [*[
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
//for both inline and iframe
function twPreCodeManagerPREcssInit(editor){
  var twPreCodeManagerPREcss = "[twprecodemanagerprecss]{position:relative!important;max-height:100px!important;box-shadow:1px 2px 3px 3px grey;overflow:hidden!important;padding:10px!important}[twprecodemanagerprecss]:before{content:'';display:block!important;height:10px!important;position:absolute!important;bottom:-11px;width:90%;margin:auto;background:#fff;box-shadow:4px 12px 20px 20px #FBFBFB;left:0;right:0}[twprecodemanagerprecss][data-mce-selected]{outline:0!important;box-shadow:1px 2px 3px 3px #3B3A7D!important}";
  if(editor.getParam("inline")){
    if(!$("#twPreCodeManagerPREcss").length){
      $('head').append('<style id="twPreCodeManagerPREcss">'+twPreCodeManagerPREcss+'</style>')
    }
  }
  else{
    var thisBody = $("#"+editor.id+"_ifr").contents().find("head");
    if(! thisBody.find("#twPreCodeManagerPREcss").length){
      thisBody.append('<style id="twPreCodeManagerPREcss">'+twPreCodeManagerPREcss+'</style>');
    }
  }
}

function twPreCodeManagerInputBox(editor, twPreCodeManagerWidth, twPreCodeManagerHeight) {
  var library = [
    {text: 'Library Presets', value: ''},
    {text:'Highlight', value: 'highlight'}, 
    {text:'Prism', value: 'language-'}, 
    {text:'Prettyprint', value: 'prettyprint'}
  ];
  var languages = [
    {text: 'Language Names', value: ''},
    {text:'CSS', value: 'css'}, 
    {text:'HTML', value: 'markup'},
    {text:'JavaScript', value: 'javascript'}, 
    {text:'JSON', value: 'json'}, 
    {text:'PHP', value: 'php'}, 
    {text:'--------------', value: '', disabled: true}, 
    {text:'ABAP', value: 'abap'}, 
    {text:'ActionScript', value: 'actionscript'}, 
    {text:'Apache Configuration', value: 'apacheconf'}, 
    {text:'APL', value: 'apl'}, 
    {text:'AppleScript', value: 'applescript'}, 
    {text:'AsciiDoc', value: 'asciidoc'}, 
    {text:'ASP.NET (C#)', value: 'aspnet'}, 
    {text:'AutoHotkey', value: 'autohotkey'}, 
    {text:'AutoIt', value: 'autoit'}, 
    {text:'BASIC', value: 'basic'}, 
    {text:'C-like', value: 'clike'}, 
    {text:'CoffeeScript', value: 'coffeescript'}, 
    {text:'C++', value: 'cpp'}, 
    {text:'C#', value: 'csharp'}, 
    {text:'CSS', value: 'css'}, 
    {text:'CSS Extras', value: 'css-extras'}, 
    {text:'F#', value: 'fsharp'}, 
    {text:'GLSL', value: 'glsl'}, 
    {text:'HTML', value: 'markup'}, 
    {text:'HTTP', value: 'http'}, 
    {text:'Inform 7', value: 'inform7'}, 
    {text:'JavaScript', value: 'javascript'}, 
    {text:'JSON', value: 'json'}, 
    {text:'React JSX', value: 'jsx'}, 
    {text:'LaTeX', value: 'latex'}, 
    {text:'LOLCODE', value: 'lolcode'}, 
    {text:'MathML', value: 'mathml'}, 
    {text:'MATLAB', value: 'matlab'}, 
    {text:'MEL', value: 'mel'}, 
    {text:'NASM', value: 'nasm'}, 
    {text:'nginx', value: 'nginx'}, 
    {text:'NSIS', value: 'nsis'}, 
    {text:'Objective-C', value: 'objectivec'}, 
    {text:'OCaml', value: 'ocaml'}, 
    {text:'PARI/GP', value: 'parigp'}, 
    {text:'PHP', value: 'php'}, 
    {text:'PHP Extras', value: 'php-extras'}, 
    {text:'PowerShell', value: 'powershell'}, 
    {text:'reST (reStructuredText)', value: 'rest'}, 
    {text:'SAS', value: 'sas'}, 
    {text:'Sass (Sass)', value: 'sass'}, 
    {text:'Sass (Scss)', value: 'scss'}, 
    {text:'SQL', value: 'sql'}, 
    {text:'SVG', value: 'svg'}, 
    {text:'TypeScript', value: 'typescript'}, 
    {text:'VHDL', value: 'vhdl'}, 
    {text:'vim', value: 'vim'}, 
    {text:'Wiki markup', value: 'wiki'}, 
    {text:'XML', value: 'xml'}, 
    {text:'YAML', value: 'yaml'}
  ];

  function insertCodeSample(editor, language, code) {
   var editor = tinymce.activeEditor;
   editor.undoManager.transact(function() {
    var node = getSelectedCodeSample(editor);
    if(tinymce.activeEditor.getParam("twPreCodeManagerSettings",{}).protectSquareBracket){
      var guage = editor.getParam("twPreCodeManagerSettings",{}).protectSquareBracketXter || "*";
      code = editor.dom.encode(code.replace(/(?:\[\[)/g, "["+guage+"[")); //from  submitted form
    }
    else{
      code = editor.dom.encode(code); //from  submitted form
    }
    if (node && node.nodeName=='PRE' &&  !editor.getParam('twExoticMarkdownEditor', false)) {
      node.setAttribute("class", $('.mce-preLanguageTextBox').val());
      if(node.children[0]){
        node.children[0].setAttribute("class", $('.mce-codeLanguageTextBox').val());
        node.children[0].innerHTML = code;
      }
      else{
        node.innerHTML = code;
       }
      editor.selection.select(node);
    }
    else if (node && node.nodeName =='CODE' && node.parentNode.nodeName !=='PRE' &&  !editor.getParam('twExoticMarkdownEditor', false)) {
      node.setAttribute("class", $('.mce-codeLanguageTextBox').val());
      node.innerHTML = code;
      editor.selection.select(node);
    }
    else {
      if(editor.getParam('twExoticMarkdownEditor', false)){
        editor.insertContent('<br>```'+language+'<br>' + code.replace(/ /g, "&nbsp;").replace(/(?:\r\n|\r|\n)/g, "<br />") + '<br>```<br><br>');
      }
      else{
        // if(twPreCodeManagerCODEonly == 1){
        //   editor.insertContent('<code class='+language+'>' + code + '</code>');
        // }
        // else{
          editor.insertContent('<pre id="__new" class='+language+'><code class='+language+'>' + code + '</code></pre>');
          editor.selection.select(tinymce.activeEditor.$('#__new').removeAttr('id')[0]);
        // }
      }
    }
   });
  }

  function getSelectedCodeSample(editor) {
   var node = tinymce.activeEditor.selection.getNode();
   if (node && node.nodeName =='CODE' && node.parentNode.nodeName !=='PRE' || node.nodeName == 'PRE') {
    return node;
   }
   return null;
  }

 function getCurrentCode(editor) {
  var node = getSelectedCodeSample(editor);
  if (node) {
    if (node.nodeName == 'PRE' && node.children[0]) {
     return node.firstChild.innerText;
    }
    else if (node.nodeName == 'PRE' && !node.children[0]) {
     return node.innerText;
    }
    else if (node.nodeName =='CODE' && node.parentNode.nodeName !=='PRE') {
     return node.innerText;
    }
  }
  else{
    return '';
  }
 }

 function getPreCurrentLanguage(editor) {
  var matches, node = getSelectedCodeSample(editor);
  if (node && node.nodeName =='PRE') {
   matches = node.className;
   return matches ? matches : '';
  }
  return '';
 }

 function getCodeCurrentLanguage(editor) {
  var matches, node = getSelectedCodeSample(editor);
  if (node && node.nodeName =='CODE' && node.parentNode.nodeName !=='PRE') {
   matches = node.className;
   return matches ? matches : '';
  }
  else if (node && node.firstChild) {
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
      classes: 'preLanguageTextBox',
      onPostRender:function(){
         var node = tinymce.activeEditor.selection.getNode();
         if (node && node.nodeName == "CODE" && node.parentNode.nodeName !=='PRE') {
          $('.mce-preLanguageTextBox').parent().parent().hide();
          // $('.mce-preLanguageTextBox').attr("disabled", 1);
         }
      }
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
         if (node && node.nodeName == "PRE" && !node.children[0] && tinymce.activeEditor.getParam("twPreCodeManagerSettings",{}).managerForceCODEtag) {
          node.innerHTML ="<code></code>";
         }
         if (node && node.nodeName == "PRE" && !node.children[0] || tinymce.activeEditor.getParam('twExoticMarkdownEditor', false)) {
          $(".mce-codeLanguageTextBox").parent().parent().hide();
         }
      }
     },
     {
      type: 'listbox',
      tooltip: 'Library Presets',
      label: 'Libraries',
      maxWidth: 200,
      value: getPreCurrentLanguage(editor) || getCodeCurrentLanguage(editor),
      values: library,
      classes: 'libListBox',
      onselect: function(){
        var currentPreLan = $('.mce-preLanguageTextBox')[0].value ? $('.mce-preLanguageTextBox')[0].value+" " : "";
        if($(".mce-preLanguageTextBox").length){
          $('.mce-preLanguageTextBox')[0].value = currentPreLan+this.value();
        }
        var currentCodeLan = $('.mce-codeLanguageTextBox')[0].value ? $('.mce-codeLanguageTextBox')[0].value+" " : "";
        $('.mce-codeLanguageTextBox')[0].value = currentCodeLan+this.value();
      }
     },
     {
      type: 'listbox',
      tooltip: 'Some Language preselects',
      label: 'Languages',
      maxWidth: 200,
      value: getPreCurrentLanguage(editor) || getCodeCurrentLanguage(editor),
      values: languages,
      classes: 'languageListBox',
      onselect: function(){
        var currentPreLan = $('.mce-preLanguageTextBox')[0].value ? $('.mce-preLanguageTextBox')[0].value+" " : "";
        if($(".mce-preLanguageTextBox").length){
          $('.mce-preLanguageTextBox')[0].value = currentPreLan+this.value();
        }
        var currentCodeLan = $('.mce-codeLanguageTextBox')[0].value ? $('.mce-codeLanguageTextBox')[0].value+" " : "";
        $('.mce-codeLanguageTextBox')[0].value = currentCodeLan+this.value();
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
  editor.on('init', function() {
    twPreCodeManagerPREcssInit(editor);
  });
  editor.on('SetContent', function() {
   if(editor.getParam("twPreCodeManagerSettings",{}).contentEditable == true){
   }
   else{
     $(editor.getBody()).find("pre").attr('contenteditable', false);
   }
   if(editor.getParam("twPreCodeManagerSettings",{}).managerPREcss !== false){
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
    if (e.target.nodeName == 'PRE' || e.target.nodeName == 'CODE' && e.target.parentNode.nodeName == 'PRE' || e.target.nodeName == 'CODE' && e.target.parentNode.nodeName !== 'PRE'){
      editor.execCommand('twPreCodeManager', true);
    }
  });
  editor.on('LoadContent', function(e) {
    if(editor.getParam("twPreCodeManagerSettings",{}).protectSquareBracket){
      $(editor.getBody()).find("code").each(function(){
        var content = $(this).html();
        var guage = editor.getParam("twPreCodeManagerSettings",{}).protectSquareBracketXter || "*";
        $(this).html(content.replace(/(?:\[\[)/g, "["+guage+"["));
      });
    }
  });
 });
