(function() {
  var factory_function;

  factory_function = function(factory) {
    if (typeof module !== 'undefined' && module.exports) {
      return module.exports = factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return window.Background = factory(jQuery);
    }
  };

  factory_function(function($) {
    var Background;
    return Background = {
      internal: {
        _document: $(document),
        _window: $(window),
        _body: $('body')
      },
      tick: function(options) {
        var animation_style, change, constructor, coordinate, document_height, dom_document, params, regExp_url, window_height, _ref;
        params = this.internal;
        params._body = params._body.length ? params._body : $('body');
        constructor = {
          source: {},
          duration: "1s",
          easeType: "ease-out",
          callback: function() {}
        };
        if (arguments.length) {
          if (options.imageUrl || options.json || options.jsonString) {
            options = {
              source: arguments[0],
              callback: arguments[1]
            };
          }
        }
        options = $.extend(constructor, options);
        dom_document = document;
        regExp_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        change = function(value) {
          var day, end, moment, now, start, this_moment, _i, _len, _ref, _ref1;
          if (typeof value === "string") {
            value = $.parseJSON(value);
          }
          day = value.backgrounds;
          now = new Date();
          for (_i = 0, _len = day.length; _i < _len; _i++) {
            moment = day[_i];
            start = moment.started_at.split(":");
            end = moment.ended_at.split(':');
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
              if (typeof jQuery !== 'undefined') {
                params._body.css("background-image", "url(" + this_moment.image + ")");
              } else {
                if (dom_document.styleSheets[0].insertRule) {
                  dom_document.styleSheets[0].insertRule("body {background-image:url(" + this_moment.image + ");}", 0);
                } else if (dom_document.styleSheets[0].addRule) {
                  dom_document.styleSheets[0].addRule("body", "background-image:url(" + this_moment.image + ")", 0);
                }
              }
            }
            if (this_moment.color) {
              return params._body.css("background-color", this_moment.color);
            }
          }
        };
        if (options.source.json) {
          change(options.source.json);
        } else if (options.source.jsonString) {
          if (regExp_url.test(options.source.jsonString)) {
            $.ajax({
              url: options.source.jsonString,
              data: {},
              success: function(value) {
                return change(value);
              }
            });
          } else {
            change(options.source.jsonString);
          }
        } else if (options.source.imageUrl) {
          if (typeof jQuery !== 'undefined') {
            params._body.css("background-image", "url(" + options.source.imageUrl + ")");
          } else {
            if (dom_document.styleSheets[0].insertRule) {
              dom_document.styleSheets[0].insertRule("body {background-image:url(" + options.source.imageUrl + ");}", 0);
            } else if (dom_document.styleSheets[0].addRule) {
              dom_document.styleSheets[0].addRule("body", "background-image:url(" + options.source.imageUrl + ")", 0);
            }
          }
        }
        animation_style = "background-position " + options.duration + " " + options.easeType;
        params._body.css({
          'transition': animation_style,
          'moz-transition': animation_style,
          '-webkit-transition': animation_style,
          '-o-transition': animation_style,
          '-ms-transition': animation_style,
          'background-repeat': 'no-repeat',
          'background-attachment': 'fixed'
        });
        if (!params._body.css('background-position')) {
          return true;
        }
        coordinate = params._body.css('background-position').split(' ');
        _ref = [params._document.height(), params._window.height()], document_height = _ref[0], window_height = _ref[1];
        params._body.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function(event) {
          return options.callback();
        });
        params._window.on('resize', function(event) {
          return window_height = $(this).height();
        });
        return params._window.on('scroll', function(event) {
          var image_scroll, scroll_height;
          document_height = document_height === params._document.height() ? document_height : params._document.height();
          scroll_height = params._window.scrollTop();
          image_scroll = (scroll_height / (document_height - window_height) * (100 - parseInt(coordinate[1])) + parseInt(coordinate[1])).toFixed(7);
          return params._body.css("background-position", coordinate[0] + (" " + image_scroll + "%"));
        });
      }
    };
  });

}).call(this);
