
function setup (remote) {
   console.log('yay');
   var EditSession = require("ace/edit_session").EditSession;
   var CppMode = require("ace/mode/c_cpp").Mode;

   Editor = ace.edit("editor");
   var program = $("#program").html();
   var aSession = new EditSession(program);
   aSession.setMode(new CppMode());
   aSession.setTabSize(3);
   Editor.setSession(aSession);
   Editor.setShowPrintMargin(false);
   Editor.setTheme("ace/theme/twilight");
   remote.changeBoard(boardName, program);

   Editor.on('change', function () {
      var code = Editor.getSession().getDocument().getValue();
      // 'boardName' is set in the HTML
      remote.changeBoard(boardName, code);
   });
}

$(document).ready(function () {
   console.log('wow');
   DNode.connect(setup);
});
