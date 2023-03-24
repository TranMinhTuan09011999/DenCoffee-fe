function showMain() {
  $(".toggle-sidebar-btn").on("click",function(){
    var isMobileVersion = document.getElementsByClassName('toggle-sidebar');
    if (isMobileVersion.length == 0) {
      $(`#main`).css("display", "none");
      setTimeout(function() {
        $(`#main`).css("display", "block");}, 300);
    }
  });
}
showMain();
