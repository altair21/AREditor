$(document).ready(init);

var editor, keywords = {};
var current = {
  theme: 'monokai',
  mode: 'text/x-python',
};
var vimMode = false;
var commandDisplay;

function editModeChanged() {
  vimMode = !vimMode;
  var funcE = function (e) {
    commandDisplay.innerHTML = 'Key Buffer: ';
  };
  var funcKey = function (key) {
    commandDisplay.innerHTML = commandDisplay.innerHTML + key;
  };
  if (vimMode) {
    $("#vim-command-display-div").css('display', 'inline');
    updateEditor({ keyMap: "vim" });
    CodeMirror.on(editor, 'vim-keypress', funcKey);
    CodeMirror.on(editor, 'vim-command-done', funcE);
  } else {
    $("#vim-command-display-div").css('display', 'none');
    CodeMirror.off(editor, 'vim-keypress', funcKey);
    CodeMirror.off(editor, 'vim-command-done', funcE);
    return updateEditor();
  }
}

function themeChanged(theme) {
  editor.setOption("theme", theme);
  current.theme = theme;
  $("#themeSelector").text(theme + " ");
  $("#themeSelector").append('<span class="caret"></span>');
}

function languageChanged(MIME, language) {
  updateEditor({ mode: MIME });
  current.mode = MIME;
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

function initEditor(obj, origText) {
  $(".CodeMirror").remove();
  if (origText) {
    $("#code").text(origText);
  }
  else if (obj.mode === "text/x-python") {
    $("#code").text("#!/usr/bin/env python\r# encoding: utf-8\r\r")
  } else {
    $("#code").text("");
  }
  editor = CodeMirror.fromTextArea(document.getElementById('code'), obj);
  editor.setOption("theme", current.theme);
}

function updateEditor(obj) {
  var origText = $("#code").text();
  var defaultConfig = {
    lineNumbers: true,
    styleActiveLine: true,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    mode: current.mode,
    extraKeys: keywords,
    hintOptions: {completeSingle: false},
  }
  for (var key in obj) {
    defaultConfig[key] = obj[key];
  }

  initEditor(defaultConfig, origText);
}

function autoComplete(cm, pred) {
  if (!pred || pred()) {
    if (vimMode && !cm.state.vim.insertMode) {
      
    } else if (!cm.state.completionActive) {
      cm.showHint();
    }
  }
  return CodeMirror.Pass;
}

function init() {
  commandDisplay = document.getElementById('vim-command-display');
  initKeywords();
  updateEditor();  //默认Python语言
}