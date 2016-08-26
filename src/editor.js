$(document).ready(init);

var editor, keywords = {};
var themeSelector;

function themeChanged() {
  var theme = themeSelector.options[themeSelector.selectedIndex].textContent;
  editor.setOption("theme", theme);
  // location.hash = "#" + theme;
}
// var choice = (location.hash && location.hash.slice(1)) ||
//               (document.location.search &&
//               decodeURIComponent(document.location.search.slice(1)));
// if (choice) {
//   themeSelector.value = choice;
//   editor.setOption("theme", choice);
// }
// CodeMirror.on(window, "hashchange", function() {
//   var theme = location.hash.slice(1);
//   if (theme) { themeSelector.value = theme; themeChanged(); }
// });
function initKeywords() {
  for (var i = 65; i <= 90; i++) {
    keywords["'" + String.fromCharCode(i) + "'"] = autoComplete;
  }
  for (var i = 97; i <= 122; i++) {
    keywords["'" + String.fromCharCode(i) + "'"] = autoComplete;
  }
  for (var i = 48; i <= 57; i++) {
    keywords["'" + String.fromCharCode(i) + "'"] = autoComplete;
  }
  keywords["'_'"] = autoComplete;
  keywords["'.'"] = autoComplete;
}

function initEditor() {
  editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      lineNumbers: true,  //显示行号
      styleActiveLine: true, 
      lineWrapping: true,
      matchBrackets: true,  //高亮匹配括号
      mode: "text/x-python",    //python编辑器
      autoCloseBrackets: true,  //自动补全结束括号
      extraKeys: keywords,
      hintOptions: {completeSingle: false},
    });
}

function autoComplete(cm, pred) {
  if (!pred || pred()) {
    if (!cm.state.completionActive) {
      cm.showHint();
    }
  }
  return CodeMirror.Pass;
}

function init() {
  themeSelector = document.getElementById("themeSelector");
  initKeywords();
  initEditor();
}