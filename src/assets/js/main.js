function showMain() {
  $(".toggle-sidebar-btn").on("click",function(){
    var sizeScreen = screen.width;
    if (sizeScreen < 820) {
      var toggleSidebar = document.getElementsByClassName('toggle-sidebar');
      if (toggleSidebar.length == 0) {
        $(`#main`).css("display", "none");
        setTimeout(function() {
          $(`#main`).css("display", "block");}, 300);
      }
    }
  });
}
showMain();
