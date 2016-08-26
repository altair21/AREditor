$(document).ready(init);

var editor, keywords = {};
var currentTheme = 'monokai'

function themeChanged(theme) {
  editor.setOption("theme", theme);
  currentTheme = theme;
  $("#themeSelector").text(theme + " ");
  $("#themeSelector").append('<span class="caret"></span>');
}

function languageChanged(MIME, language) {
  initEditor(MIME)
  $("#languageSelector").text(language + " ");
  $("#languageSelector").append('<span class="caret"></span>');
}

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

function initEditor(language) {
  $(".CodeMirror").remove();
  console.log(language);
  if (language === "text/x-python") {
    $("#code").text("#!/usr/bin/env python\r# encoding: utf-8\r\r")
  } else {
    $("#code").text("");
  }
  editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,  //显示行号
    styleActiveLine: true, 
    lineWrapping: true,
    matchBrackets: true,  //高亮匹配括号
    mode: language,
    autoCloseBrackets: true,  //自动补全结束括号
    extraKeys: keywords,
    hintOptions: {completeSingle: false},
  });
  editor.setOption("theme", currentTheme);
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
  initKeywords();
  initEditor("text/x-python");  //默认Python语言
}