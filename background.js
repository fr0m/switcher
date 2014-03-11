// Generated by CoffeeScript 1.7.1
(function() {
  window.Background = {
    internal: {
      $d: $(document),
      $w: $(window),
      $b: $('body')
    },
    tick: function(option) {
      var ani_style, c, constructor, doc_hei, op, p, r_http, r_http_img, win_hei, _ref;
      p = this.internal;
      constructor = {
        data: "",
        horizontal: "center",
        duration: "1s",
        easeType: "ease-out",
        callback: function() {}
      };
      if (arguments.length) {
        if (typeof option === "string" || option.backgrounds) {
          option = {
            data: arguments[0],
            horizontal: arguments[1],
            duration: arguments[2],
            easeType: arguments[3],
            callback: arguments[4]
          };
        }
      }
      op = $.extend(constructor, option);
      c = function(value) {
        var day, end, moment, now, start, this_moment, _i, _len, _ref, _ref1;
        if (typeof value === "string") {
          value = $.parseJSON(value);
        }
        day = value.backgrounds;
        now = new Date();
        for (_i = 0, _len = day.length; _i < _len; _i++) {
          moment = day[_i];
          start = moment.started.split(":");
          end = moment.ended.split(':');
          if (start[0] === end[0]) {
            if (now.getHours() === parseInt(start[0]) && (start[1] <= (_ref = now.getMinutes()) && _ref <= end[1])) {
              true;
            } else {
              continue;
            }
          } else {
            if ((parseInt(start[0]) < (_ref1 = now.getHours()) && _ref1 < parseInt(end[0]))) {
              true;
            } else if (now.getHours() === parseInt(start[0]) && now.getMinutes() >= parseInt(start[1])) {
              true;
            } else if (now.getHours() === parseInt(end[0]) && now.getMinutes() <= parseInt(end[1])) {
              true;
            } else {
              continue;
            }
          }
          this_moment = moment;
        }
        if (this_moment) {
          if (this_moment.image) {
            p.$b.css("background-image", "url(" + this_moment.image + ")");
          }
          if (this_moment.color) {
            return p.$b.css("background-color", this_moment.color);
          }
        }
      };
      r_http_img = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?(?:\.(jpg|jpeg|bmp|png|gif|psd|eps|pif|psf|cdr|tga|pcd|mpt))$/i;
      r_http = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
      if (typeof op.data === "string") {
        if (r_http_img.test(op.data)) {
          p.$b.css("background-image", "url(" + op.data + ")");
        } else if (r_http.test(op.data)) {
          $.ajax({
            url: op.data,
            data: {},
            success: function(value) {
              return c(value);
            }
          });
        } else if (op.data) {
          c(op.data);
        }
      } else if (op.data) {
        c(op.data);
      }
      ani_style = "background-position " + op.duration + " " + op.easeType;
      p.$b.css({
        'transition': ani_style,
        'moz-transition': ani_style,
        '-webkit-transition': ani_style,
        '-o-transition': ani_style,
        '-ms-transition': ani_style
      });
      _ref = [p.$d.height(), p.$w.height()], doc_hei = _ref[0], win_hei = _ref[1];
      p.$b.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function(event) {
        return op.callback();
      });
      p.$w.on('resize', function(event) {
        return win_hei = $(this).height();
      });
      return p.$w.on('scroll', function(event) {
        var img_scroll, scroll_hei;
        doc_hei = doc_hei === p.$d.height() ? doc_hei : p.$d.height();
        scroll_hei = p.$d.scrollTop();
        img_scroll = scroll_hei / (doc_hei - win_hei) * 100..toFixed(7);
        return p.$b.css("background-position", op.horizontal + (" " + img_scroll + "%"));
      });
    }
  };

}).call(this);
