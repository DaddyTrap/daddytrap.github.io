function changeBlockAndCircle() {
  var main_container = document.getElementsByClassName("main-container")[0];
  if (main_container.className.indexOf("block-style") == -1) {
    main_container.className += " block-style";
    document.getElementsByClassName("change-style-btn")[0].innerHTML = "SC";
  } else {
    main_container.className = main_container.className.substring(0, main_container.className.indexOf("block-style") - 1);    
    document.getElementsByClassName("change-style-btn")[0].innerHTML = "Style Change";
  }

}

window.onload = (function () {
  // initialize some variable
  var screen_num = document.getElementsByClassName('screen-num')[0];
  screen_num.innerHTML = '';
  var screen_ans = document.getElementsByClassName('screen-ans')[0];
  screen_ans.innerHTML = '0';

  // register number click event
  var btn_list = document.getElementsByClassName('cal-num');
  for (var index in btn_list) {
    btn_list[index].onclick = function (event) {
      if (screen_ans.innerHTML != '0') {
        if (event.path[0].className.indexOf('cal-oper') != -1) {
          screen_num.innerHTML = screen_ans.innerHTML;
        } else {
          screen_num.innerHTML = '';
        }
        screen_ans.innerHTML = '0';
      }
      if (screen_num.innerHTML.length < 20) {
        screen_num.innerHTML += event.path[0].innerHTML;
      }
    };
  }

  // register "is" operator click event
  var is_btn = document.getElementsByClassName('cal-is')[0];
  is_btn.onclick = function (event) {
    try {
      var ans = eval(screen_num.innerHTML);
      if (ans == undefined) ans = 0;
      var ans_str = ans.toString();
      var frac_len = ans_str.length - ans_str.indexOf(".") - 1;
      // add some animation
      screen_ans.className += " strengthen success";
      setTimeout(function() {
        screen_ans.className = screen_ans.className.substring(0, screen_ans.className.indexOf("strengthen") - 1);
      }, 1000);
      screen_ans.innerHTML = parseFloat(ans.toFixed(frac_len - 1));
    } catch (err) {
      screen_ans.className += " strengthen error";
      setTimeout(function() {
        screen_ans.className = screen_ans.className.substring(0, screen_ans.className.indexOf("strengthen") - 1);
      }, 1000);
      screen_ans.innerHTML = "Syntax Error";
    }
  };

  // register CE click event
  var ce_btn = document.getElementsByClassName('cal-ce')[0];
  ce_btn.onclick = function (event) {
    screen_num.innerHTML = '';
    screen_ans.innerHTML = '0';
  }

  // register back click event
  var back_btn = document.getElementsByClassName('cal-back')[0];
  back_btn.onclick = function (event) {
    var str = screen_num.innerHTML;
    screen_num.innerHTML = str.substr(0, str.length - 1);
  }

  // register change style event
  var change_style_btn = document.getElementsByClassName('change-style-btn')[0];
  change_style_btn.onclick = function (event) {
    changeBlockAndCircle();
  }
});
