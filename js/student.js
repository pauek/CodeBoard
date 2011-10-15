
function setup (remote) {
   var EditSession = require("ace/edit_session").EditSession;
   var CppMode = require("ace/mode/c_cpp").Mode;

   Editor = ace.edit("editor");
   var aSession = new EditSession("<waiting for changes...>");
   aSession.setMode(new CppMode());
   aSession.setTabSize(3);
   Editor.setSession(aSession);
   Editor.setShowPrintMargin(false);
   Editor.setTheme("ace/theme/twilight");
   Editor.setReadOnly(true);

   // 'boardName' is set in the HTML
   remote.onBoardChanged(boardName, function (code) {
      Editor.getSession().getDocument().setValue(code);
   });
}

$(document).ready(function () {
   DNode.connect(setup);
});
