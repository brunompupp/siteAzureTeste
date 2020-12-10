! function(t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
  "use strict";
  var e = window.Slick || {};
  (e = function() {
      var e = 0;
      return function(i, o) {
          var a, s = this;
          s.defaults = {
              accessibility: !0,
              adaptiveHeight: !1,
              appendArrows: t(i),
              appendDots: t(i),
              arrows: !0,
              asNavFor: null,
              prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
              nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
              autoplay: !1,
              autoplaySpeed: 3e3,
              centerMode: !1,
              centerPadding: "50px",
              cssEase: "ease",
              customPaging: function(e, i) {
                  return t('<button type="button" />').text(i + 1)
              },
              dots: !1,
              dotsClass: "slick-dots",
              draggable: !0,
              easing: "linear",
              edgeFriction: .35,
              fade: !1,
              focusOnSelect: !1,
              focusOnChange: !1,
              infinite: !0,
              initialSlide: 0,
              lazyLoad: "ondemand",
              mobileFirst: !1,
              pauseOnHover: !0,
              pauseOnFocus: !0,
              pauseOnDotsHover: !1,
              respondTo: "window",
              responsive: null,
              rows: 1,
              rtl: !1,
              slide: "",
              slidesPerRow: 1,
              slidesToShow: 1,
              slidesToScroll: 1,
              speed: 500,
              swipe: !0,
              swipeToSlide: !1,
              touchMove: !0,
              touchThreshold: 5,
              useCSS: !0,
              useTransform: !0,
              variableWidth: !1,
              vertical: !1,
              verticalSwiping: !1,
              waitForAnimate: !0,
              zIndex: 1e3
          }, s.initials = {
              animating: !1,
              dragging: !1,
              autoPlayTimer: null,
              currentDirection: 0,
              currentLeft: null,
              currentSlide: 0,
              direction: 1,
              $dots: null,
              listWidth: null,
              listHeight: null,
              loadIndex: 0,
              $nextArrow: null,
              $prevArrow: null,
              scrolling: !1,
              slideCount: null,
              slideWidth: null,
              $slideTrack: null,
              $slides: null,
              sliding: !1,
              slideOffset: 0,
              swipeLeft: null,
              swiping: !1,
              $list: null,
              touchObject: {},
              transformsEnabled: !1,
              unslicked: !1
          }, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = t(i), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, a = t(i).data("slick") || {}, s.options = t.extend({}, s.defaults, o, a), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, void 0 !== document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.instanceUid = e++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
      }
  }()).prototype.activateADA = function() {
      this.$slideTrack.find(".slick-active").attr({
          "aria-hidden": "false"
      }).find("a, input, button, select").attr({
          tabindex: "0"
      })
  }, e.prototype.addSlide = e.prototype.slickAdd = function(e, i, o) {
      var a = this;
      if ("boolean" == typeof i) o = i, i = null;
      else if (i < 0 || i >= a.slideCount) return !1;
      a.unload(), "number" == typeof i ? 0 === i && 0 === a.$slides.length ? t(e).appendTo(a.$slideTrack) : o ? t(e).insertBefore(a.$slides.eq(i)) : t(e).insertAfter(a.$slides.eq(i)) : !0 === o ? t(e).prependTo(a.$slideTrack) : t(e).appendTo(a.$slideTrack), a.$slides = a.$slideTrack.children(this.options.slide), a.$slideTrack.children(this.options.slide).detach(), a.$slideTrack.append(a.$slides), a.$slides.each(function(e, i) {
          t(i).attr("data-slick-index", e)
      }), a.$slidesCache = a.$slides, a.reinit()
  }, e.prototype.animateHeight = function() {
      var t = this;
      if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
          var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
          t.$list.animate({
              height: e
          }, t.options.speed)
      }
  }, e.prototype.animateSlide = function(e, i) {
      var o = {},
          a = this;
      a.animateHeight(), !0 === a.options.rtl && !1 === a.options.vertical && (e = -e), !1 === a.transformsEnabled ? !1 === a.options.vertical ? a.$slideTrack.animate({
          left: e
      }, a.options.speed, a.options.easing, i) : a.$slideTrack.animate({
          top: e
      }, a.options.speed, a.options.easing, i) : !1 === a.cssTransitions ? (!0 === a.options.rtl && (a.currentLeft = -a.currentLeft), t({
          animStart: a.currentLeft
      }).animate({
          animStart: e
      }, {
          duration: a.options.speed,
          easing: a.options.easing,
          step: function(t) {
              t = Math.ceil(t), !1 === a.options.vertical ? (o[a.animType] = "translate(" + t + "px, 0px)", a.$slideTrack.css(o)) : (o[a.animType] = "translate(0px," + t + "px)", a.$slideTrack.css(o))
          },
          complete: function() {
              i && i.call()
          }
      })) : (a.applyTransition(), e = Math.ceil(e), !1 === a.options.vertical ? o[a.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[a.animType] = "translate3d(0px," + e + "px, 0px)", a.$slideTrack.css(o), i && setTimeout(function() {
          a.disableTransition(), i.call()
      }, a.options.speed))
  }, e.prototype.getNavTarget = function() {
      var e = this.options.asNavFor;
      return e && null !== e && (e = t(e).not(this.$slider)), e
  }, e.prototype.asNavFor = function(e) {
      var i = this.getNavTarget();
      null !== i && "object" == typeof i && i.each(function() {
          var i = t(this).slick("getSlick");
          i.unslicked || i.slideHandler(e, !0)
      })
  }, e.prototype.applyTransition = function(t) {
      var e = this,
          i = {};
      !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
  }, e.prototype.autoPlay = function() {
      var t = this;
      t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
  }, e.prototype.autoPlayClear = function() {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer)
  }, e.prototype.autoPlayIterator = function() {
      var t = this,
          e = t.currentSlide + t.options.slidesToScroll;
      t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
  }, e.prototype.buildArrows = function() {
      var e = this;
      !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
          "aria-disabled": "true",
          tabindex: "-1"
      }))
  }, e.prototype.buildDots = function() {
      var e, i, o = this;
      if (!0 === o.options.dots) {
          for (o.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) i.append(t("<li />").append(o.options.customPaging.call(this, o, e)));
          o.$dots = i.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
      }
  }, e.prototype.buildOut = function() {
      var e = this;
      e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
          t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
      }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
  }, e.prototype.buildRows = function() {
      var t, e, i, o, a, s, n, r = this;
      if (o = document.createDocumentFragment(), s = r.$slider.children(), r.options.rows > 1) {
          for (n = r.options.slidesPerRow * r.options.rows, a = Math.ceil(s.length / n), t = 0; t < a; t++) {
              var l = document.createElement("div");
              for (e = 0; e < r.options.rows; e++) {
                  var c = document.createElement("div");
                  for (i = 0; i < r.options.slidesPerRow; i++) {
                      var d = t * n + (e * r.options.slidesPerRow + i);
                      s.get(d) && c.appendChild(s.get(d))
                  }
                  l.appendChild(c)
              }
              o.appendChild(l)
          }
          r.$slider.empty().append(o), r.$slider.children().children().children().css({
              width: 100 / r.options.slidesPerRow + "%",
              display: "inline-block"
          })
      }
  }, e.prototype.checkResponsive = function(e, i) {
      var o, a, s, n = this,
          r = !1,
          l = n.$slider.width(),
          c = window.innerWidth || t(window).width();
      if ("window" === n.respondTo ? s = c : "slider" === n.respondTo ? s = l : "min" === n.respondTo && (s = Math.min(c, l)), n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
          for (o in a = null, n.breakpoints) n.breakpoints.hasOwnProperty(o) && (!1 === n.originalSettings.mobileFirst ? s < n.breakpoints[o] && (a = n.breakpoints[o]) : s > n.breakpoints[o] && (a = n.breakpoints[o]));
          null !== a ? null !== n.activeBreakpoint ? (a !== n.activeBreakpoint || i) && (n.activeBreakpoint = a, "unslick" === n.breakpointSettings[a] ? n.unslick(a) : (n.options = t.extend({}, n.originalSettings, n.breakpointSettings[a]), !0 === e && (n.currentSlide = n.options.initialSlide), n.refresh(e)), r = a) : (n.activeBreakpoint = a, "unslick" === n.breakpointSettings[a] ? n.unslick(a) : (n.options = t.extend({}, n.originalSettings, n.breakpointSettings[a]), !0 === e && (n.currentSlide = n.options.initialSlide), n.refresh(e)), r = a) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, n.options = n.originalSettings, !0 === e && (n.currentSlide = n.options.initialSlide), n.refresh(e), r = a), e || !1 === r || n.$slider.trigger("breakpoint", [n, r])
      }
  }, e.prototype.changeSlide = function(e, i) {
      var o, a, s = this,
          n = t(e.currentTarget);
      switch (n.is("a") && e.preventDefault(), n.is("li") || (n = n.closest("li")), o = s.slideCount % s.options.slidesToScroll != 0 ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, e.data.message) {
          case "previous":
              a = 0 === o ? s.options.slidesToScroll : s.options.slidesToShow - o, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - a, !1, i);
              break;
          case "next":
              a = 0 === o ? s.options.slidesToScroll : o, s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + a, !1, i);
              break;
          case "index":
              var r = 0 === e.data.index ? 0 : e.data.index || n.index() * s.options.slidesToScroll;
              s.slideHandler(s.checkNavigable(r), !1, i), n.children().trigger("focus");
              break;
          default:
              return
      }
  }, e.prototype.checkNavigable = function(t) {
      var e, i;
      if (i = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
      else
          for (var o in e) {
              if (t < e[o]) {
                  t = i;
                  break
              }
              i = e[o]
          }
      return t
  }, e.prototype.cleanUpEvents = function() {
      var e = this;
      e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
  }, e.prototype.cleanUpSlideEvents = function() {
      var e = this;
      e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
  }, e.prototype.cleanUpRows = function() {
      var t, e = this;
      e.options.rows > 1 && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t))
  }, e.prototype.clickHandler = function(t) {
      !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
  }, e.prototype.destroy = function(e) {
      var i = this;
      i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
          t(this).attr("style", t(this).data("originalStyling"))
      }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
  }, e.prototype.disableTransition = function(t) {
      var e = this,
          i = {};
      i[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
  }, e.prototype.fadeSlide = function(t, e) {
      var i = this;
      !1 === i.cssTransitions ? (i.$slides.eq(t).css({
          zIndex: i.options.zIndex
      }), i.$slides.eq(t).animate({
          opacity: 1
      }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
          opacity: 1,
          zIndex: i.options.zIndex
      }), e && setTimeout(function() {
          i.disableTransition(t), e.call()
      }, i.options.speed))
  }, e.prototype.fadeSlideOut = function(t) {
      var e = this;
      !1 === e.cssTransitions ? e.$slides.eq(t).animate({
          opacity: 0,
          zIndex: e.options.zIndex - 2
      }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
          opacity: 0,
          zIndex: e.options.zIndex - 2
      }))
  }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
      var e = this;
      null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
  }, e.prototype.focusHandler = function() {
      var e = this;
      e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
          i.stopImmediatePropagation();
          var o = t(this);
          setTimeout(function() {
              e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
          }, 0)
      })
  }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
      return this.currentSlide
  }, e.prototype.getDotCount = function() {
      var t = this,
          e = 0,
          i = 0,
          o = 0;
      if (!0 === t.options.infinite)
          if (t.slideCount <= t.options.slidesToShow) ++o;
          else
              for (; e < t.slideCount;) ++o, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
      else if (!0 === t.options.centerMode) o = t.slideCount;
      else if (t.options.asNavFor)
          for (; e < t.slideCount;) ++o, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
      else o = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
      return o - 1
  }, e.prototype.getLeft = function(t) {
      var e, i, o, a, s = this,
          n = 0;
      return s.slideOffset = 0, i = s.$slides.first().outerHeight(!0), !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, a = -1, !0 === s.options.vertical && !0 === s.options.centerMode && (2 === s.options.slidesToShow ? a = -1.5 : 1 === s.options.slidesToShow && (a = -2)), n = i * s.options.slidesToShow * a), s.slideCount % s.options.slidesToScroll != 0 && t + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (t > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (t - s.slideCount)) * s.slideWidth * -1, n = (s.options.slidesToShow - (t - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, n = s.slideCount % s.options.slidesToScroll * i * -1))) : t + s.options.slidesToShow > s.slideCount && (s.slideOffset = (t + s.options.slidesToShow - s.slideCount) * s.slideWidth, n = (t + s.options.slidesToShow - s.slideCount) * i), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, n = 0), !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow ? s.slideOffset = s.slideWidth * Math.floor(s.options.slidesToShow) / 2 - s.slideWidth * s.slideCount / 2 : !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), e = !1 === s.options.vertical ? t * s.slideWidth * -1 + s.slideOffset : t * i * -1 + n, !0 === s.options.variableWidth && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow), e = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === s.options.centerMode && (o = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(t) : s.$slideTrack.children(".slick-slide").eq(t + s.options.slidesToShow + 1), e = !0 === s.options.rtl ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (s.$list.width() - o.outerWidth()) / 2)), e
  }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
      return this.options[t]
  }, e.prototype.getNavigableIndexes = function() {
      var t, e = this,
          i = 0,
          o = 0,
          a = [];
      for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); i < t;) a.push(i), i = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
      return a
  }, e.prototype.getSlick = function() {
      return this
  }, e.prototype.getSlideCount = function() {
      var e, i, o = this;
      return i = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(a, s) {
          if (s.offsetLeft - i + t(s).outerWidth() / 2 > -1 * o.swipeLeft) return e = s, !1
      }), Math.abs(t(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
  }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
      this.changeSlide({
          data: {
              message: "index",
              index: parseInt(t)
          }
      }, e)
  }, e.prototype.init = function(e) {
      var i = this;
      t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
  }, e.prototype.initADA = function() {
      var e = this,
          i = Math.ceil(e.slideCount / e.options.slidesToShow),
          o = e.getNavigableIndexes().filter(function(t) {
              return t >= 0 && t < e.slideCount
          });
      e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
          "aria-hidden": "true",
          tabindex: "-1"
      }).find("a, input, button, select").attr({
          tabindex: "-1"
      }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
          var a = o.indexOf(i);
          t(this).attr({
              role: "tabpanel",
              id: "slick-slide" + e.instanceUid + i,
              tabindex: -1
          }), -1 !== a && t(this).attr({
              "aria-describedby": "slick-slide-control" + e.instanceUid + a
          })
      }), e.$dots.attr("role", "tablist").find("li").each(function(a) {
          var s = o[a];
          t(this).attr({
              role: "presentation"
          }), t(this).find("button").first().attr({
              role: "tab",
              id: "slick-slide-control" + e.instanceUid + a,
              "aria-controls": "slick-slide" + e.instanceUid + s,
              "aria-label": a + 1 + " of " + i,
              "aria-selected": null,
              tabindex: "-1"
          })
      }).eq(e.currentSlide).find("button").attr({
          "aria-selected": "true",
          tabindex: "0"
      }).end());
      for (var a = e.currentSlide, s = a + e.options.slidesToShow; a < s; a++) e.$slides.eq(a).attr("tabindex", 0);
      e.activateADA()
  }, e.prototype.initArrowEvents = function() {
      var t = this;
      !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
          message: "previous"
      }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
          message: "next"
      }, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)))
  }, e.prototype.initDotEvents = function() {
      var e = this;
      !0 === e.options.dots && (t("li", e.$dots).on("click.slick", {
          message: "index"
      }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
  }, e.prototype.initSlideEvents = function() {
      var e = this;
      e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
  }, e.prototype.initializeEvents = function() {
      var e = this;
      e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
          action: "start"
      }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
          action: "move"
      }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
          action: "end"
      }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
          action: "end"
      }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(e.setPosition)
  }, e.prototype.initUI = function() {
      var t = this;
      !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
  }, e.prototype.keyHandler = function(t) {
      var e = this;
      t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
          data: {
              message: !0 === e.options.rtl ? "next" : "previous"
          }
      }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
          data: {
              message: !0 === e.options.rtl ? "previous" : "next"
          }
      }))
  }, e.prototype.lazyLoad = function() {
      function e(e) {
          t("img[data-lazy]", e).each(function() {
              var e = t(this),
                  i = t(this).attr("data-lazy"),
                  o = t(this).attr("data-srcset"),
                  a = t(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
                  n = document.createElement("img");
              n.onload = function() {
                  e.animate({
                      opacity: 0
                  }, 100, function() {
                      o && (e.attr("srcset", o), a && e.attr("sizes", a)), e.attr("src", i).animate({
                          opacity: 1
                      }, 200, function() {
                          e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                      }), s.$slider.trigger("lazyLoaded", [s, e, i])
                  })
              }, n.onerror = function() {
                  e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, e, i])
              }, n.src = i
          })
      }
      var i, o, a, s = this;
      if (!0 === s.options.centerMode ? !0 === s.options.infinite ? a = (o = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), a = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, a = Math.ceil(o + s.options.slidesToShow), !0 === s.options.fade && (o > 0 && o--, a <= s.slideCount && a++)), i = s.$slider.find(".slick-slide").slice(o, a), "anticipated" === s.options.lazyLoad)
          for (var n = o - 1, r = a, l = s.$slider.find(".slick-slide"), c = 0; c < s.options.slidesToScroll; c++) n < 0 && (n = s.slideCount - 1), i = (i = i.add(l.eq(n))).add(l.eq(r)), n--, r++;
      e(i), s.slideCount <= s.options.slidesToShow ? e(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? e(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && e(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
  }, e.prototype.loadSlider = function() {
      var t = this;
      t.setPosition(), t.$slideTrack.css({
          opacity: 1
      }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
  }, e.prototype.next = e.prototype.slickNext = function() {
      this.changeSlide({
          data: {
              message: "next"
          }
      })
  }, e.prototype.orientationChange = function() {
      this.checkResponsive(), this.setPosition()
  }, e.prototype.pause = e.prototype.slickPause = function() {
      this.autoPlayClear(), this.paused = !0
  }, e.prototype.play = e.prototype.slickPlay = function() {
      var t = this;
      t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
  }, e.prototype.postSlide = function(e) {
      var i = this;
      i.unslicked || (i.$slider.trigger("afterChange", [i, e]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange && t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
  }, e.prototype.prev = e.prototype.slickPrev = function() {
      this.changeSlide({
          data: {
              message: "previous"
          }
      })
  }, e.prototype.preventDefault = function(t) {
      t.preventDefault()
  }, e.prototype.progressiveLazyLoad = function(e) {
      e = e || 1;
      var i, o, a, s, n, r = this,
          l = t("img[data-lazy]", r.$slider);
      l.length ? (i = l.first(), o = i.attr("data-lazy"), a = i.attr("data-srcset"), s = i.attr("data-sizes") || r.$slider.attr("data-sizes"), (n = document.createElement("img")).onload = function() {
          a && (i.attr("srcset", a), s && i.attr("sizes", s)), i.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === r.options.adaptiveHeight && r.setPosition(), r.$slider.trigger("lazyLoaded", [r, i, o]), r.progressiveLazyLoad()
      }, n.onerror = function() {
          e < 3 ? setTimeout(function() {
              r.progressiveLazyLoad(e + 1)
          }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, i, o]), r.progressiveLazyLoad())
      }, n.src = o) : r.$slider.trigger("allImagesLoaded", [r])
  }, e.prototype.refresh = function(e) {
      var i, o, a = this;
      o = a.slideCount - a.options.slidesToShow, !a.options.infinite && a.currentSlide > o && (a.currentSlide = o), a.slideCount <= a.options.slidesToShow && (a.currentSlide = 0), i = a.currentSlide, a.destroy(!0), t.extend(a, a.initials, {
          currentSlide: i
      }), a.init(), e || a.changeSlide({
          data: {
              message: "index",
              index: i
          }
      }, !1)
  }, e.prototype.registerBreakpoints = function() {
      var e, i, o, a = this,
          s = a.options.responsive || null;
      if ("array" === t.type(s) && s.length) {
          for (e in a.respondTo = a.options.respondTo || "window", s)
              if (o = a.breakpoints.length - 1, s.hasOwnProperty(e)) {
                  for (i = s[e].breakpoint; o >= 0;) a.breakpoints[o] && a.breakpoints[o] === i && a.breakpoints.splice(o, 1), o--;
                  a.breakpoints.push(i), a.breakpointSettings[i] = s[e].settings
              }
          a.breakpoints.sort(function(t, e) {
              return a.options.mobileFirst ? t - e : e - t
          })
      }
  }, e.prototype.reinit = function() {
      var e = this;
      e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
  }, e.prototype.resize = function() {
      var e = this;
      t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
          e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
      }, 50))
  }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, i) {
      var o = this;
      if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : o.slideCount - 1 : !0 === e ? --t : t, o.slideCount < 1 || t < 0 || t > o.slideCount - 1) return !1;
      o.unload(), !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(t).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
  }, e.prototype.setCSS = function(t) {
      var e, i, o = this,
          a = {};
      !0 === o.options.rtl && (t = -t), e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px", a[o.positionProp] = t, !1 === o.transformsEnabled ? o.$slideTrack.css(a) : (a = {}, !1 === o.cssTransitions ? (a[o.animType] = "translate(" + e + ", " + i + ")", o.$slideTrack.css(a)) : (a[o.animType] = "translate3d(" + e + ", " + i + ", 0px)", o.$slideTrack.css(a)))
  }, e.prototype.setDimensions = function() {
      var t = this;
      !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
          padding: "0px " + t.options.centerPadding
      }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
          padding: t.options.centerPadding + " 0px"
      })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
      var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
      !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
  }, e.prototype.setFade = function() {
      var e, i = this;
      i.$slides.each(function(o, a) {
          e = i.slideWidth * o * -1, !0 === i.options.rtl ? t(a).css({
              position: "relative",
              right: e,
              top: 0,
              zIndex: i.options.zIndex - 2,
              opacity: 0
          }) : t(a).css({
              position: "relative",
              left: e,
              top: 0,
              zIndex: i.options.zIndex - 2,
              opacity: 0
          })
      }), i.$slides.eq(i.currentSlide).css({
          zIndex: i.options.zIndex - 1,
          opacity: 1
      })
  }, e.prototype.setHeight = function() {
      var t = this;
      if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
          var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
          t.$list.css("height", e)
      }
  }, e.prototype.setOption = e.prototype.slickSetOption = function() {
      var e, i, o, a, s, n = this,
          r = !1;
      if ("object" === t.type(arguments[0]) ? (o = arguments[0], r = arguments[1], s = "multiple") : "string" === t.type(arguments[0]) && (o = arguments[0], a = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")), "single" === s) n.options[o] = a;
      else if ("multiple" === s) t.each(o, function(t, e) {
          n.options[t] = e
      });
      else if ("responsive" === s)
          for (i in a)
              if ("array" !== t.type(n.options.responsive)) n.options.responsive = [a[i]];
              else {
                  for (e = n.options.responsive.length - 1; e >= 0;) n.options.responsive[e].breakpoint === a[i].breakpoint && n.options.responsive.splice(e, 1), e--;
                  n.options.responsive.push(a[i])
              }
      r && (n.unload(), n.reinit())
  }, e.prototype.setPosition = function() {
      var t = this;
      t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
  }, e.prototype.setProps = function() {
      var t = this,
          e = document.body.style;
      t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
  }, e.prototype.setSlideClasses = function(t) {
      var e, i, o, a, s = this;
      if (i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), !0 === s.options.centerMode) {
          var n = s.options.slidesToShow % 2 == 0 ? 1 : 0;
          e = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e + n, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = s.options.slidesToShow + t, i.slice(o - e + 1 + n, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center")
      } else t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (a = s.slideCount % s.options.slidesToShow, o = !0 === s.options.infinite ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? i.slice(o - (s.options.slidesToShow - a), o + a).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
      "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
  }, e.prototype.setupInfinite = function() {
      var e, i, o, a = this;
      if (!0 === a.options.fade && (a.options.centerMode = !1), !0 === a.options.infinite && !1 === a.options.fade && (i = null, a.slideCount > a.options.slidesToShow)) {
          for (o = !0 === a.options.centerMode ? a.options.slidesToShow + 1 : a.options.slidesToShow, e = a.slideCount; e > a.slideCount - o; e -= 1) i = e - 1, t(a.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - a.slideCount).prependTo(a.$slideTrack).addClass("slick-cloned");
          for (e = 0; e < o + a.slideCount; e += 1) i = e, t(a.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + a.slideCount).appendTo(a.$slideTrack).addClass("slick-cloned");
          a.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
              t(this).attr("id", "")
          })
      }
  }, e.prototype.interrupt = function(t) {
      t || this.autoPlay(), this.interrupted = t
  }, e.prototype.selectHandler = function(e) {
      var i = this,
          o = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
          a = parseInt(o.attr("data-slick-index"));
      a || (a = 0), i.slideCount <= i.options.slidesToShow ? i.slideHandler(a, !1, !0) : i.slideHandler(a)
  }, e.prototype.slideHandler = function(t, e, i) {
      var o, a, s, n, r, l = null,
          c = this;
      if (e = e || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t))
          if (!1 === e && c.asNavFor(t), o = t, l = c.getLeft(o), n = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? n : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (o = c.currentSlide, !0 !== i ? c.animateSlide(n, function() {
              c.postSlide(o)
          }) : c.postSlide(o));
          else if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (o = c.currentSlide, !0 !== i ? c.animateSlide(n, function() {
          c.postSlide(o)
      }) : c.postSlide(o));
      else {
          if (c.options.autoplay && clearInterval(c.autoPlayTimer), a = o < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + o : o >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : o - c.slideCount : o, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, a]), s = c.currentSlide, c.currentSlide = a, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (r = (r = c.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(s), c.fadeSlide(a, function() {
              c.postSlide(a)
          })) : c.postSlide(a), void c.animateHeight();
          !0 !== i ? c.animateSlide(l, function() {
              c.postSlide(a)
          }) : c.postSlide(a)
      }
  }, e.prototype.startLoad = function() {
      var t = this;
      !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
  }, e.prototype.swipeDirection = function() {
      var t, e, i, o, a = this;
      return t = a.touchObject.startX - a.touchObject.curX, e = a.touchObject.startY - a.touchObject.curY, i = Math.atan2(e, t), (o = Math.round(180 * i / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === a.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === a.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === a.options.rtl ? "right" : "left" : !0 === a.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
  }, e.prototype.swipeEnd = function(t) {
      var e, i, o = this;
      if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
      if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
      if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
          switch (i = o.swipeDirection()) {
              case "left":
              case "down":
                  e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                  break;
              case "right":
              case "up":
                  e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
          }
          "vertical" != i && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
      } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
  }, e.prototype.swipeHandler = function(t) {
      var e = this;
      if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
          case "start":
              e.swipeStart(t);
              break;
          case "move":
              e.swipeMove(t);
              break;
          case "end":
              e.swipeEnd(t)
      }
  }, e.prototype.swipeMove = function(t) {
      var e, i, o, a, s, n, r = this;
      return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!r.dragging || r.scrolling || s && 1 !== s.length) && (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, r.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), n = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2))), !r.options.verticalSwiping && !r.swiping && n > 4 ? (r.scrolling = !0, !1) : (!0 === r.options.verticalSwiping && (r.touchObject.swipeLength = n), i = r.swipeDirection(), void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && (r.swiping = !0, t.preventDefault()), a = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), !0 === r.options.verticalSwiping && (a = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, !1 === r.options.infinite && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), !1 === r.options.vertical ? r.swipeLeft = e + o * a : r.swipeLeft = e + o * (r.$list.height() / r.listWidth) * a, !0 === r.options.verticalSwiping && (r.swipeLeft = e + o * a), !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))))
  }, e.prototype.swipeStart = function(t) {
      var e, i = this;
      if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
      void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, i.dragging = !0
  }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
      var t = this;
      null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
  }, e.prototype.unload = function() {
      var e = this;
      t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
  }, e.prototype.unslick = function(t) {
      var e = this;
      e.$slider.trigger("unslick", [e, t]), e.destroy()
  }, e.prototype.updateArrows = function() {
      var t = this;
      Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
  }, e.prototype.updateDots = function() {
      var t = this;
      null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
  }, e.prototype.visibility = function() {
      var t = this;
      t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
  }, t.fn.slick = function() {
      var t, i, o = this,
          a = arguments[0],
          s = Array.prototype.slice.call(arguments, 1),
          n = o.length;
      for (t = 0; t < n; t++)
          if ("object" == typeof a || void 0 === a ? o[t].slick = new e(o[t], a) : i = o[t].slick[a].apply(o[t].slick, s), void 0 !== i) return i;
      return o
  }
}),
function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Sweetalert2 = e()
}(this, function() {
  "use strict";

  function t(e) {
      return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
          return typeof t
      } : function(t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
      })(e)
  }

  function e(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
  }

  function i(t, e) {
      for (var i = 0; i < e.length; i++) {
          var o = e[i];
          o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
      }
  }

  function o(t, e, o) {
      return e && i(t.prototype, e), o && i(t, o), t
  }

  function a() {
      return (a = Object.assign || function(t) {
          for (var e = 1; e < arguments.length; e++) {
              var i = arguments[e];
              for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
          }
          return t
      }).apply(this, arguments)
  }

  function s(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
          constructor: {
              value: t,
              writable: !0,
              configurable: !0
          }
      }), e && r(t, e)
  }

  function n(t) {
      return (n = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
          return t.__proto__ || Object.getPrototypeOf(t)
      })(t)
  }

  function r(t, e) {
      return (r = Object.setPrototypeOf || function(t, e) {
          return t.__proto__ = e, t
      })(t, e)
  }

  function l(t, e, i) {
      return (l = function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0
          } catch (t) {
              return !1
          }
      }() ? Reflect.construct : function(t, e, i) {
          var o = [null];
          o.push.apply(o, e);
          var a = new(Function.bind.apply(t, o));
          return i && r(a, i.prototype), a
      }).apply(null, arguments)
  }

  function c(t, e) {
      return !e || "object" != typeof e && "function" != typeof e ? function(t) {
          if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t
      }(t) : e
  }

  function d(t, e, i) {
      return (d = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(t, e, i) {
          var o = function(t, e) {
              for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = n(t)););
              return t
          }(t, e);
          if (o) {
              var a = Object.getOwnPropertyDescriptor(o, e);
              return a.get ? a.get.call(i) : a.value
          }
      })(t, e, i || t)
  }
  var p = "SweetAlert2:",
      u = function(t) {
          return Array.prototype.slice.call(t)
      },
      h = function(t) {
          console.warn("".concat(p, " ").concat(t))
      },
      f = function(t) {
          console.error("".concat(p, " ").concat(t))
      },
      g = [],
      m = function(t) {
          -1 === g.indexOf(t) && (g.push(t), h(t))
      },
      v = function(t) {
          return "function" == typeof t ? t() : t
      },
      w = function(e) {
          return e && "object" === t(e) && "function" == typeof e.then
      },
      b = Object.freeze({
          cancel: "cancel",
          backdrop: "overlay",
          close: "close",
          esc: "esc",
          timer: "timer"
      }),
      y = function(t) {
          var e = {};
          for (var i in t) e[t[i]] = "swal2-" + t[i];
          return e
      },
      k = y(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "toast", "toast-shown", "toast-column", "fade", "show", "hide", "noanimation", "close", "title", "header", "content", "actions", "confirm", "cancel", "footer", "icon", "icon-text", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "validation-message", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl"]),
      $ = y(["success", "warning", "info", "question", "error"]),
      C = {
          previousBodyPadding: null
      },
      x = function(t, e) {
          return t.classList.contains(e)
      },
      S = function(t) {
          if (t.focus(), "file" !== t.type) {
              var e = t.value;
              t.value = "", t.value = e
          }
      },
      T = function(t, e, i) {
          t && e && ("string" == typeof e && (e = e.split(/\s+/).filter(Boolean)), e.forEach(function(e) {
              t.forEach ? t.forEach(function(t) {
                  i ? t.classList.add(e) : t.classList.remove(e)
              }) : i ? t.classList.add(e) : t.classList.remove(e)
          }))
      },
      A = function(t, e) {
          T(t, e, !0)
      },
      M = function(t, e) {
          T(t, e, !1)
      },
      O = function(t, e) {
          for (var i = 0; i < t.childNodes.length; i++)
              if (x(t.childNodes[i], e)) return t.childNodes[i]
      },
      H = function(t) {
          t.style.opacity = "", t.style.display = t.id === k.content ? "block" : "flex"
      },
      P = function(t) {
          t.style.opacity = "", t.style.display = "none"
      },
      L = function(t) {
          return t && (t.offsetWidth || t.offsetHeight || t.getClientRects().length)
      },
      B = function() {
          return document.body.querySelector("." + k.container)
      },
      Z = function(t) {
          var e = B();
          return e ? e.querySelector("." + t) : null
      },
      E = function() {
          return Z(k.popup)
      },
      j = function() {
          var t = E();
          return u(t.querySelectorAll("." + k.icon))
      },
      _ = function() {
          return Z(k.title)
      },
      V = function() {
          return Z(k.content)
      },
      z = function() {
          return Z(k.image)
      },
      I = function() {
          return Z(k.progresssteps)
      },
      q = function() {
          return Z(k["validation-message"])
      },
      D = function() {
          return Z(k.confirm)
      },
      W = function() {
          return Z(k.cancel)
      },
      R = function() {
          return Z(k.actions)
      },
      N = function() {
          return Z(k.footer)
      },
      U = function() {
          return Z(k.close)
      },
      F = function() {
          var t = u(E().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function(t, e) {
                  return t = parseInt(t.getAttribute("tabindex")), (e = parseInt(e.getAttribute("tabindex"))) < t ? 1 : t < e ? -1 : 0
              }),
              e = u(E().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter(function(t) {
                  return "-1" !== t.getAttribute("tabindex")
              });
          return function(t) {
              for (var e = [], i = 0; i < t.length; i++) - 1 === e.indexOf(t[i]) && e.push(t[i]);
              return e
          }(t.concat(e)).filter(function(t) {
              return L(t)
          })
      },
      X = function() {
          return !Y() && !document.body.classList.contains(k["no-backdrop"])
      },
      Y = function() {
          return document.body.classList.contains(k["toast-shown"])
      },
      K = function() {
          return "undefined" == typeof window || "undefined" == typeof document
      },
      Q = '\n <div aria-labelledby="'.concat(k.title, '" aria-describedby="').concat(k.content, '" class="').concat(k.popup, '" tabindex="-1">\n   <div class="').concat(k.header, '">\n     <ul class="').concat(k.progresssteps, '"></ul>\n     <div class="').concat(k.icon, " ").concat($.error, '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="').concat(k.icon, " ").concat($.question, '">\n       <span class="').concat(k["icon-text"], '">?</span>\n      </div>\n     <div class="').concat(k.icon, " ").concat($.warning, '">\n       <span class="').concat(k["icon-text"], '">!</span>\n      </div>\n     <div class="').concat(k.icon, " ").concat($.info, '">\n       <span class="').concat(k["icon-text"], '">i</span>\n      </div>\n     <div class="').concat(k.icon, " ").concat($.success, '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="').concat(k.image, '" />\n     <h2 class="').concat(k.title, '" id="').concat(k.title, '"></h2>\n     <button type="button" class="').concat(k.close, '">Ã—</button>\n   </div>\n   <div class="').concat(k.content, '">\n     <div id="').concat(k.content, '"></div>\n     <input class="').concat(k.input, '" />\n     <input type="file" class="').concat(k.file, '" />\n     <div class="').concat(k.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(k.select, '"></select>\n     <div class="').concat(k.radio, '"></div>\n     <label for="').concat(k.checkbox, '" class="').concat(k.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat(k.label, '"></span>\n     </label>\n     <textarea class="').concat(k.textarea, '"></textarea>\n     <div class="').concat(k["validation-message"], '" id="').concat(k["validation-message"], '"></div>\n   </div>\n   <div class="').concat(k.actions, '">\n     <button type="button" class="').concat(k.confirm, '">OK</button>\n     <button type="button" class="').concat(k.cancel, '">Cancel</button>\n   </div>\n   <div class="').concat(k.footer, '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
      G = function(t) {
          var e = B();
          if (e && (e.parentNode.removeChild(e), M([document.documentElement, document.body], [k["no-backdrop"], k["toast-shown"], k["has-column"]])), !K()) {
              var i = document.createElement("div");
              i.className = k.container, i.innerHTML = Q;
              var o = "string" == typeof t.target ? document.querySelector(t.target) : t.target;
              o.appendChild(i);
              var a, s = E(),
                  n = V(),
                  r = O(n, k.input),
                  l = O(n, k.file),
                  c = n.querySelector(".".concat(k.range, " input")),
                  d = n.querySelector(".".concat(k.range, " output")),
                  p = O(n, k.select),
                  u = n.querySelector(".".concat(k.checkbox, " input")),
                  h = O(n, k.textarea);
              s.setAttribute("role", t.toast ? "alert" : "dialog"), s.setAttribute("aria-live", t.toast ? "polite" : "assertive"), t.toast || s.setAttribute("aria-modal", "true"), "rtl" === window.getComputedStyle(o).direction && A(B(), k.rtl);
              var g = function(t) {
                  Bt.isVisible() && a !== t.target.value && Bt.resetValidationMessage(), a = t.target.value
              };
              return r.oninput = g, l.onchange = g, p.onchange = g, u.onchange = g, h.oninput = g, c.oninput = function(t) {
                  g(t), d.value = c.value
              }, c.onchange = function(t) {
                  g(t), c.nextSibling.value = c.value
              }, s
          }
          f("SweetAlert2 requires document to initialize")
      },
      J = function(e, i) {
          if (!e) return P(i);
          if ("object" === t(e))
              if (i.innerHTML = "", 0 in e)
                  for (var o = 0; o in e; o++) i.appendChild(e[o].cloneNode(!0));
              else i.appendChild(e.cloneNode(!0));
          else e && (i.innerHTML = e);
          H(i)
      },
      tt = function() {
          if (K()) return !1;
          var t = document.createElement("div"),
              e = {
                  WebkitAnimation: "webkitAnimationEnd",
                  OAnimation: "oAnimationEnd oanimationend",
                  animation: "animationend"
              };
          for (var i in e)
              if (e.hasOwnProperty(i) && void 0 !== t.style[i]) return e[i];
          return !1
      }(),
      et = function(t) {
          var e = I(),
              i = parseInt(null === t.currentProgressStep ? Bt.getQueueStep() : t.currentProgressStep, 10);
          t.progressSteps && t.progressSteps.length ? (H(e), e.innerHTML = "", i >= t.progressSteps.length && h("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), t.progressSteps.forEach(function(o, a) {
              var s = document.createElement("li");
              if (A(s, k.progresscircle), s.innerHTML = o, a === i && A(s, k.activeprogressstep), e.appendChild(s), a !== t.progressSteps.length - 1) {
                  var n = document.createElement("li");
                  A(n, k.progressline), t.progressStepsDistance && (n.style.width = t.progressStepsDistance), e.appendChild(n)
              }
          })) : P(e)
      },
      it = function() {
          return !!window.MSInputMethodContext && !!document.documentMode
      },
      ot = function() {
          var t = B(),
              e = E();
          t.style.removeProperty("align-items"), e.offsetTop < 0 && (t.style.alignItems = "flex-start")
      },
      at = {},
      st = function(t, e) {
          var i = B(),
              o = E();
          if (o) {
              null !== t && "function" == typeof t && t(o), M(o, k.show), A(o, k.hide);
              var a = function() {
                  Y() ? nt(e) : (new Promise(function(t) {
                      var e = window.scrollX,
                          i = window.scrollY;
                      at.restoreFocusTimeout = setTimeout(function() {
                          at.previousActiveElement && at.previousActiveElement.focus ? (at.previousActiveElement.focus(), at.previousActiveElement = null) : document.body && document.body.focus(), t()
                      }, 100), void 0 !== e && void 0 !== i && window.scrollTo(e, i)
                  }).then(function() {
                      return nt(e)
                  }), at.keydownTarget.removeEventListener("keydown", at.keydownHandler, {
                      capture: at.keydownListenerCapture
                  }), at.keydownHandlerAdded = !1), i.parentNode && i.parentNode.removeChild(i), M([document.documentElement, document.body], [k.shown, k["height-auto"], k["no-backdrop"], k["toast-shown"], k["toast-column"]]), X() && (null !== C.previousBodyPadding && (document.body.style.paddingRight = C.previousBodyPadding, C.previousBodyPadding = null), function() {
                      if (x(document.body, k.iosfix)) {
                          var t = parseInt(document.body.style.top, 10);
                          M(document.body, k.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * t
                      }
                  }(), "undefined" != typeof window && it() && window.removeEventListener("resize", ot), u(document.body.children).forEach(function(t) {
                      t.hasAttribute("data-previous-aria-hidden") ? (t.setAttribute("aria-hidden", t.getAttribute("data-previous-aria-hidden")), t.removeAttribute("data-previous-aria-hidden")) : t.removeAttribute("aria-hidden")
                  }))
              };
              tt && !x(o, k.noanimation) ? o.addEventListener(tt, function t() {
                  o.removeEventListener(tt, t), x(o, k.hide) && a()
              }) : a()
          }
      },
      nt = function(t) {
          null !== t && "function" == typeof t && setTimeout(function() {
              t()
          })
      };

  function rt(t) {
      var e = function t() {
          for (var e = arguments.length, i = new Array(e), o = 0; o < e; o++) i[o] = arguments[o];
          if (!(this instanceof t)) return l(t, i);
          Object.getPrototypeOf(t).apply(this, i)
      };
      return e.prototype = a(Object.create(t.prototype), {
          constructor: e
      }), "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t, e
  }
  var lt = {
          title: "",
          titleText: "",
          text: "",
          html: "",
          footer: "",
          type: null,
          toast: !1,
          customClass: "",
          target: "body",
          backdrop: !0,
          animation: !0,
          heightAuto: !0,
          allowOutsideClick: !0,
          allowEscapeKey: !0,
          allowEnterKey: !0,
          stopKeydownPropagation: !0,
          keydownListenerCapture: !1,
          showConfirmButton: !0,
          showCancelButton: !1,
          preConfirm: null,
          confirmButtonText: "OK",
          confirmButtonAriaLabel: "",
          confirmButtonColor: null,
          confirmButtonClass: null,
          cancelButtonText: "Cancel",
          cancelButtonAriaLabel: "",
          cancelButtonColor: null,
          cancelButtonClass: null,
          buttonsStyling: !0,
          reverseButtons: !1,
          focusConfirm: !0,
          focusCancel: !1,
          showCloseButton: !1,
          closeButtonAriaLabel: "Close this dialog",
          showLoaderOnConfirm: !1,
          imageUrl: null,
          imageWidth: null,
          imageHeight: null,
          imageAlt: "",
          imageClass: null,
          timer: null,
          width: null,
          padding: null,
          background: null,
          input: null,
          inputPlaceholder: "",
          inputValue: "",
          inputOptions: {},
          inputAutoTrim: !0,
          inputClass: null,
          inputAttributes: {},
          inputValidator: null,
          validationMessage: null,
          grow: !1,
          position: "center",
          progressSteps: [],
          currentProgressStep: null,
          progressStepsDistance: null,
          onBeforeOpen: null,
          onAfterClose: null,
          onOpen: null,
          onClose: null,
          useRejections: !1,
          expectRejections: !1
      },
      ct = ["useRejections", "expectRejections", "extraParams"],
      dt = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusCancel", "heightAuto", "keydownListenerCapture"],
      pt = function(t) {
          return lt.hasOwnProperty(t) || "extraParams" === t
      },
      ut = function(t) {
          return -1 !== ct.indexOf(t)
      },
      ht = function(t) {
          for (var e in t) pt(e) || h('Unknown parameter "'.concat(e, '"')), t.toast && -1 !== dt.indexOf(e) && h('The parameter "'.concat(e, '" is incompatible with toasts')), ut(e) && m('The parameter "'.concat(e, '" is deprecated and will be removed in the next major release.'))
      },
      ft = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.',
      gt = {},
      mt = [],
      vt = function() {
          var t = E();
          t || Bt(""), t = E();
          var e = R(),
              i = D(),
              o = W();
          H(e), H(i), A([t, e], k.loading), i.disabled = !0, o.disabled = !0, t.setAttribute("data-loading", !0), t.setAttribute("aria-busy", !0), t.focus()
      },
      wt = Object.freeze({
          isValidParameter: pt,
          isDeprecatedParameter: ut,
          argsToParams: function(e) {
              var i = {};
              switch (t(e[0])) {
                  case "object":
                      a(i, e[0]);
                      break;
                  default:
                      ["title", "html", "type"].forEach(function(o, a) {
                          switch (t(e[a])) {
                              case "string":
                                  i[o] = e[a];
                                  break;
                              case "undefined":
                                  break;
                              default:
                                  f("Unexpected type of ".concat(o, '! Expected "string", got ').concat(t(e[a])))
                          }
                      })
              }
              return i
          },
          adaptInputValidator: function(t) {
              return function(e, i) {
                  return t.call(this, e, i).then(function() {}, function(t) {
                      return t
                  })
              }
          },
          close: st,
          closePopup: st,
          closeModal: st,
          closeToast: st,
          isVisible: function() {
              return !!E()
          },
          clickConfirm: function() {
              return D().click()
          },
          clickCancel: function() {
              return W().click()
          },
          getContainer: B,
          getPopup: E,
          getTitle: _,
          getContent: V,
          getImage: z,
          getIcons: j,
          getCloseButton: U,
          getButtonsWrapper: function() {
              return m("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"), Z(k.actions)
          },
          getActions: R,
          getConfirmButton: D,
          getCancelButton: W,
          getFooter: N,
          getFocusableElements: F,
          getValidationMessage: q,
          isLoading: function() {
              return E().hasAttribute("data-loading")
          },
          fire: function() {
              for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
              return l(this, e)
          },
          mixin: function(t) {
              return rt(function(i) {
                  function r() {
                      return e(this, r), c(this, n(r).apply(this, arguments))
                  }
                  return s(r, i), o(r, [{
                      key: "_main",
                      value: function(e) {
                          return d(n(r.prototype), "_main", this).call(this, a({}, t, e))
                      }
                  }]), r
              }(this))
          },
          queue: function(t) {
              var e = this;
              mt = t;
              var i = function() {
                      mt = [], document.body.removeAttribute("data-swal2-queue-step")
                  },
                  o = [];
              return new Promise(function(t) {
                  ! function a(s, n) {
                      s < mt.length ? (document.body.setAttribute("data-swal2-queue-step", s), e(mt[s]).then(function(e) {
                          void 0 !== e.value ? (o.push(e.value), a(s + 1, n)) : (i(), t({
                              dismiss: e.dismiss
                          }))
                      })) : (i(), t({
                          value: o
                      }))
                  }(0)
              })
          },
          getQueueStep: function() {
              return document.body.getAttribute("data-swal2-queue-step")
          },
          insertQueueStep: function(t, e) {
              return e && e < mt.length ? mt.splice(e, 0, t) : mt.push(t)
          },
          deleteQueueStep: function(t) {
              void 0 !== mt[t] && mt.splice(t, 1)
          },
          showLoading: vt,
          enableLoading: vt,
          getTimerLeft: function() {
              return at.timeout && at.timeout.getTimerLeft()
          }
      }),
      bt = "function" == typeof Symbol ? Symbol : function() {
          var t = 0;

          function e(e) {
              return "__" + e + "_" + Math.floor(1e9 * Math.random()) + "_" + ++t + "__"
          }
          return e.iterator = e("Symbol.iterator"), e
      }(),
      yt = "function" == typeof WeakMap ? WeakMap : function(t, e, i) {
          function o() {
              e(this, t, {
                  value: bt("WeakMap")
              })
          }
          return o.prototype = {
              delete: function(e) {
                  delete e[this[t]]
              },
              get: function(e) {
                  return e[this[t]]
              },
              has: function(e) {
                  return i.call(e, this[t])
              },
              set: function(i, o) {
                  e(i, this[t], {
                      configurable: !0,
                      value: o
                  })
              }
          }, o
      }(bt("WeakMap"), Object.defineProperty, {}.hasOwnProperty),
      kt = {
          promise: new yt,
          innerParams: new yt,
          domCache: new yt
      };

  function $t() {
      var t = kt.innerParams.get(this),
          e = kt.domCache.get(this);
      t.showConfirmButton || (P(e.confirmButton), t.showCancelButton || P(e.actions)), M([e.popup, e.actions], k.loading), e.popup.removeAttribute("aria-busy"), e.popup.removeAttribute("data-loading"), e.confirmButton.disabled = !1, e.cancelButton.disabled = !1
  }

  function Ct(t) {
      var e = kt.domCache.get(this);
      e.validationMessage.innerHTML = t;
      var i = window.getComputedStyle(e.popup);
      e.validationMessage.style.marginLeft = "-".concat(i.getPropertyValue("padding-left")), e.validationMessage.style.marginRight = "-".concat(i.getPropertyValue("padding-right")), H(e.validationMessage);
      var o = this.getInput();
      o && (o.setAttribute("aria-invalid", !0), o.setAttribute("aria-describedBy", k["validation-message"]), S(o), A(o, k.inputerror))
  }

  function xt() {
      var t = kt.domCache.get(this);
      t.validationMessage && P(t.validationMessage);
      var e = this.getInput();
      e && (e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedBy"), M(e, k.inputerror))
  }
  var St, Tt = function t(i, o) {
          var a, s, n;
          e(this, t);
          var r = o;
          this.start = function() {
              n = !0, s = new Date, a = setTimeout(i, r)
          }, this.stop = function() {
              n = !1, clearTimeout(a), r -= new Date - s
          }, this.getTimerLeft = function() {
              return n && (this.stop(), this.start()), r
          }, this.start()
      },
      At = {
          email: function(t, e) {
              return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t) ? Promise.resolve() : Promise.reject(e && e.validationMessage ? e.validationMessage : "Invalid email address")
          },
          url: function(t, e) {
              return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\/\/=]*)$/.test(t) ? Promise.resolve() : Promise.reject(e && e.validationMessage ? e.validationMessage : "Invalid URL")
          }
      },
      Mt = function(t) {
          var e = B(),
              i = E();
          null !== t.onBeforeOpen && "function" == typeof t.onBeforeOpen && t.onBeforeOpen(i), t.animation ? (A(i, k.show), A(e, k.fade), M(i, k.hide)) : M(i, k.fade), H(i), e.style.overflowY = "hidden", tt && !x(i, k.noanimation) ? i.addEventListener(tt, function t() {
              i.removeEventListener(tt, t), e.style.overflowY = "auto"
          }) : e.style.overflowY = "auto", A([document.documentElement, document.body, e], k.shown), t.heightAuto && t.backdrop && !t.toast && A([document.documentElement, document.body], k["height-auto"]), X() && (null === C.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (C.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")), document.body.style.paddingRight = C.previousBodyPadding + function() {
              if ("ontouchstart" in window || navigator.msMaxTouchPoints) return 0;
              var t = document.createElement("div");
              t.style.width = "50px", t.style.height = "50px", t.style.overflow = "scroll", document.body.appendChild(t);
              var e = t.offsetWidth - t.clientWidth;
              return document.body.removeChild(t), e
          }() + "px"), function() {
              if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !x(document.body, k.iosfix)) {
                  var t = document.body.scrollTop;
                  document.body.style.top = -1 * t + "px", A(document.body, k.iosfix)
              }
          }(), "undefined" != typeof window && it() && (ot(), window.addEventListener("resize", ot)), u(document.body.children).forEach(function(t) {
              t === B() || t.contains(B()) || (t.hasAttribute("aria-hidden") && t.setAttribute("data-previous-aria-hidden", t.getAttribute("aria-hidden")), t.setAttribute("aria-hidden", "true"))
          }), setTimeout(function() {
              e.scrollTop = 0
          })), Y() || at.previousActiveElement || (at.previousActiveElement = document.activeElement), null !== t.onOpen && "function" == typeof t.onOpen && setTimeout(function() {
              t.onOpen(i)
          })
      },
      Ot = Object.freeze({
          hideLoading: $t,
          disableLoading: $t,
          getInput: function(t) {
              var e = kt.innerParams.get(this),
                  i = kt.domCache.get(this);
              if (!(t = t || e.input)) return null;
              switch (t) {
                  case "select":
                  case "textarea":
                  case "file":
                      return O(i.content, k[t]);
                  case "checkbox":
                      return i.popup.querySelector(".".concat(k.checkbox, " input"));
                  case "radio":
                      return i.popup.querySelector(".".concat(k.radio, " input:checked")) || i.popup.querySelector(".".concat(k.radio, " input:first-child"));
                  case "range":
                      return i.popup.querySelector(".".concat(k.range, " input"));
                  default:
                      return O(i.content, k.input)
              }
          },
          enableButtons: function() {
              var t = kt.domCache.get(this);
              t.confirmButton.disabled = !1, t.cancelButton.disabled = !1
          },
          disableButtons: function() {
              var t = kt.domCache.get(this);
              t.confirmButton.disabled = !0, t.cancelButton.disabled = !0
          },
          enableConfirmButton: function() {
              kt.domCache.get(this).confirmButton.disabled = !1
          },
          disableConfirmButton: function() {
              kt.domCache.get(this).confirmButton.disabled = !0
          },
          enableInput: function() {
              var t = this.getInput();
              if (!t) return !1;
              if ("radio" === t.type)
                  for (var e = t.parentNode.parentNode.querySelectorAll("input"), i = 0; i < e.length; i++) e[i].disabled = !1;
              else t.disabled = !1
          },
          disableInput: function() {
              var t = this.getInput();
              if (!t) return !1;
              if (t && "radio" === t.type)
                  for (var e = t.parentNode.parentNode.querySelectorAll("input"), i = 0; i < e.length; i++) e[i].disabled = !0;
              else t.disabled = !0
          },
          showValidationMessage: Ct,
          resetValidationMessage: xt,
          resetValidationError: function() {
              m("Swal.resetValidationError() is deprecated and will be removed in the next major release, use Swal.resetValidationMessage() instead"), xt.bind(this)()
          },
          showValidationError: function(t) {
              m("Swal.showValidationError() is deprecated and will be removed in the next major release, use Swal.showValidationMessage() instead"), Ct.bind(this)(t)
          },
          getProgressSteps: function() {
              return kt.innerParams.get(this).progressSteps
          },
          setProgressSteps: function(t) {
              var e = a({}, kt.innerParams.get(this), {
                  progressSteps: t
              });
              kt.innerParams.set(this, e), et(e)
          },
          showProgressSteps: function() {
              var t = kt.domCache.get(this);
              H(t.progressSteps)
          },
          hideProgressSteps: function() {
              var t = kt.domCache.get(this);
              P(t.progressSteps)
          },
          _main: function(e) {
              var i = this;
              ht(e);
              var o = a({}, lt, e);
              ! function(e) {
                  var i;
                  e.inputValidator || Object.keys(At).forEach(function(t) {
                      e.input === t && (e.inputValidator = e.expectRejections ? At[t] : Bt.adaptInputValidator(At[t]))
                  }), e.validationMessage && ("object" !== t(e.extraParams) && (e.extraParams = {}), e.extraParams.validationMessage = e.validationMessage), (!e.target || "string" == typeof e.target && !document.querySelector(e.target) || "string" != typeof e.target && !e.target.appendChild) && (h('Target parameter is not valid, defaulting to "body"'), e.target = "body"), "function" == typeof e.animation && (e.animation = e.animation.call());
                  var o = E(),
                      a = "string" == typeof e.target ? document.querySelector(e.target) : e.target;
                  i = o && a && o.parentNode !== a.parentNode ? G(e) : o || G(e), e.width && (i.style.width = "number" == typeof e.width ? e.width + "px" : e.width), e.padding && (i.style.padding = "number" == typeof e.padding ? e.padding + "px" : e.padding), e.background && (i.style.background = e.background);
                  for (var s = window.getComputedStyle(i).getPropertyValue("background-color"), n = i.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), r = 0; r < n.length; r++) n[r].style.backgroundColor = s;
                  var l = B(),
                      c = U(),
                      d = N();
                  if (function(t) {
                          var e = _();
                          t.titleText ? e.innerText = t.titleText : t.title && ("string" == typeof t.title && (t.title = t.title.split("\n").join("<br />")), J(t.title, e))
                      }(e), function(t) {
                          var e = V().querySelector("#" + k.content);
                          t.html ? J(t.html, e) : t.text ? (e.textContent = t.text, H(e)) : P(e)
                      }(e), "string" == typeof e.backdrop ? B().style.background = e.backdrop : e.backdrop || A([document.documentElement, document.body], k["no-backdrop"]), !e.backdrop && e.allowOutsideClick && h('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'), e.position in k ? A(l, k[e.position]) : (h('The "position" parameter is not valid, defaulting to "center"'), A(l, k.center)), e.grow && "string" == typeof e.grow) {
                      var p = "grow-" + e.grow;
                      p in k && A(l, k[p])
                  }
                  e.showCloseButton ? (c.setAttribute("aria-label", e.closeButtonAriaLabel), H(c)) : P(c), i.className = k.popup, e.toast ? (A([document.documentElement, document.body], k["toast-shown"]), A(i, k.toast)) : A(i, k.modal), e.customClass && A(i, e.customClass), et(e),
                      function(t) {
                          for (var e = j(), i = 0; i < e.length; i++) P(e[i]);
                          if (t.type)
                              if (-1 !== Object.keys($).indexOf(t.type)) {
                                  var o = Bt.getPopup().querySelector(".".concat(k.icon, ".").concat($[t.type]));
                                  H(o), t.animation && A(o, "swal2-animate-".concat(t.type, "-icon"))
                              } else f('Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.type, '"'))
                      }(e),
                      function(t) {
                          var e = z();
                          t.imageUrl ? (e.setAttribute("src", t.imageUrl), e.setAttribute("alt", t.imageAlt), H(e), t.imageWidth ? e.setAttribute("width", t.imageWidth) : e.removeAttribute("width"), t.imageHeight ? e.setAttribute("height", t.imageHeight) : e.removeAttribute("height"), e.className = k.image, t.imageClass && A(e, t.imageClass)) : P(e)
                      }(e),
                      function(t) {
                          var e = R(),
                              i = D(),
                              o = W();
                          if (t.showConfirmButton || t.showCancelButton ? H(e) : P(e), t.showCancelButton ? o.style.display = "inline-block" : P(o), t.showConfirmButton ? i.style.removeProperty("display") : P(i), i.innerHTML = t.confirmButtonText, o.innerHTML = t.cancelButtonText, i.setAttribute("aria-label", t.confirmButtonAriaLabel), o.setAttribute("aria-label", t.cancelButtonAriaLabel), i.className = k.confirm, A(i, t.confirmButtonClass), o.className = k.cancel, A(o, t.cancelButtonClass), t.buttonsStyling) {
                              A([i, o], k.styled), t.confirmButtonColor && (i.style.backgroundColor = t.confirmButtonColor), t.cancelButtonColor && (o.style.backgroundColor = t.cancelButtonColor);
                              var a = window.getComputedStyle(i).getPropertyValue("background-color");
                              i.style.borderLeftColor = a, i.style.borderRightColor = a
                          } else M([i, o], k.styled), i.style.backgroundColor = i.style.borderLeftColor = i.style.borderRightColor = "", o.style.backgroundColor = o.style.borderLeftColor = o.style.borderRightColor = ""
                      }(e), J(e.footer, d), !0 === e.animation ? M(i, k.noanimation) : A(i, k.noanimation), e.showLoaderOnConfirm && !e.preConfirm && h("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request")
              }(o), Object.freeze(o), kt.innerParams.set(this, o), at.timeout && (at.timeout.stop(), delete at.timeout), clearTimeout(at.restoreFocusTimeout);
              var s = {
                  popup: E(),
                  container: B(),
                  content: V(),
                  actions: R(),
                  confirmButton: D(),
                  cancelButton: W(),
                  closeButton: U(),
                  validationMessage: q(),
                  progressSteps: I()
              };
              kt.domCache.set(this, s);
              var n = this.constructor;
              return new Promise(function(e, a) {
                  var r = function(t) {
                          n.closePopup(o.onClose, o.onAfterClose), o.useRejections ? e(t) : e({
                              value: t
                          })
                      },
                      l = function(t) {
                          n.closePopup(o.onClose, o.onAfterClose), o.useRejections ? a(t) : e({
                              dismiss: t
                          })
                      },
                      c = function(t) {
                          n.closePopup(o.onClose, o.onAfterClose), a(t)
                      };
                  o.timer && (at.timeout = new Tt(function() {
                      l("timer"), delete at.timeout
                  }, o.timer)), o.input && setTimeout(function() {
                      var t = i.getInput();
                      t && S(t)
                  }, 0);
                  for (var d = function(t) {
                          if (o.showLoaderOnConfirm && n.showLoading(), o.preConfirm) {
                              i.resetValidationMessage();
                              var e = Promise.resolve().then(function() {
                                  return o.preConfirm(t, o.extraParams)
                              });
                              o.expectRejections ? e.then(function(e) {
                                  return r(e || t)
                              }, function(t) {
                                  i.hideLoading(), t && i.showValidationMessage(t)
                              }) : e.then(function(e) {
                                  L(s.validationMessage) || !1 === e ? i.hideLoading() : r(e || t)
                              }, function(t) {
                                  return c(t)
                              })
                          } else r(t)
                      }, p = function(t) {
                          var e = t.target,
                              a = s.confirmButton,
                              r = s.cancelButton,
                              p = a && (a === e || a.contains(e)),
                              u = r && (r === e || r.contains(e));
                          switch (t.type) {
                              case "click":
                                  if (p && n.isVisible())
                                      if (i.disableButtons(), o.input) {
                                          var h = function() {
                                              var t = i.getInput();
                                              if (!t) return null;
                                              switch (o.input) {
                                                  case "checkbox":
                                                      return t.checked ? 1 : 0;
                                                  case "radio":
                                                      return t.checked ? t.value : null;
                                                  case "file":
                                                      return t.files.length ? t.files[0] : null;
                                                  default:
                                                      return o.inputAutoTrim ? t.value.trim() : t.value
                                              }
                                          }();
                                          if (o.inputValidator) {
                                              i.disableInput();
                                              var f = Promise.resolve().then(function() {
                                                  return o.inputValidator(h, o.extraParams)
                                              });
                                              o.expectRejections ? f.then(function() {
                                                  i.enableButtons(), i.enableInput(), d(h)
                                              }, function(t) {
                                                  i.enableButtons(), i.enableInput(), t && i.showValidationMessage(t)
                                              }) : f.then(function(t) {
                                                  i.enableButtons(), i.enableInput(), t ? i.showValidationMessage(t) : d(h)
                                              }, function(t) {
                                                  return c(t)
                                              })
                                          } else i.getInput().checkValidity() ? d(h) : (i.enableButtons(), i.showValidationMessage(o.validationMessage))
                                      } else d(!0);
                                  else u && n.isVisible() && (i.disableButtons(), l(n.DismissReason.cancel))
                          }
                      }, u = s.popup.querySelectorAll("button"), g = 0; g < u.length; g++) u[g].onclick = p, u[g].onmouseover = p, u[g].onmouseout = p, u[g].onmousedown = p;
                  if (s.closeButton.onclick = function() {
                          l(n.DismissReason.close)
                      }, o.toast) s.popup.onclick = function() {
                      o.showConfirmButton || o.showCancelButton || o.showCloseButton || o.input || l(n.DismissReason.close)
                  };
                  else {
                      var m = !1;
                      s.popup.onmousedown = function() {
                          s.container.onmouseup = function(t) {
                              s.container.onmouseup = void 0, t.target === s.container && (m = !0)
                          }
                      }, s.container.onmousedown = function() {
                          s.popup.onmouseup = function(t) {
                              s.popup.onmouseup = void 0, (t.target === s.popup || s.popup.contains(t.target)) && (m = !0)
                          }
                      }, s.container.onclick = function(t) {
                          m ? m = !1 : t.target === s.container && v(o.allowOutsideClick) && l(n.DismissReason.backdrop)
                      }
                  }
                  o.reverseButtons ? s.confirmButton.parentNode.insertBefore(s.cancelButton, s.confirmButton) : s.confirmButton.parentNode.insertBefore(s.confirmButton, s.cancelButton);
                  var b = function(t, e) {
                      for (var i = F(o.focusCancel), a = 0; a < i.length; a++) return (t += e) === i.length ? t = 0 : -1 === t && (t = i.length - 1), i[t].focus();
                      s.popup.focus()
                  };
                  at.keydownHandlerAdded && (at.keydownTarget.removeEventListener("keydown", at.keydownHandler, {
                      capture: at.keydownListenerCapture
                  }), at.keydownHandlerAdded = !1), o.toast || (at.keydownHandler = function(t) {
                      return function(t, e) {
                          if (e.stopKeydownPropagation && t.stopPropagation(), "Enter" !== t.key || t.isComposing)
                              if ("Tab" === t.key) {
                                  for (var o = t.target, a = F(e.focusCancel), r = -1, c = 0; c < a.length; c++)
                                      if (o === a[c]) {
                                          r = c;
                                          break
                                      }
                                  t.shiftKey ? b(r, -1) : b(r, 1), t.stopPropagation(), t.preventDefault()
                              } else -1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].indexOf(t.key) ? document.activeElement === s.confirmButton && L(s.cancelButton) ? s.cancelButton.focus() : document.activeElement === s.cancelButton && L(s.confirmButton) && s.confirmButton.focus() : "Escape" !== t.key && "Esc" !== t.key || !0 !== v(e.allowEscapeKey) || (t.preventDefault(), l(n.DismissReason.esc));
                          else if (t.target && i.getInput() && t.target.outerHTML === i.getInput().outerHTML) {
                              if (-1 !== ["textarea", "file"].indexOf(e.input)) return;
                              n.clickConfirm(), t.preventDefault()
                          }
                      }(t, o)
                  }, at.keydownTarget = o.keydownListenerCapture ? window : s.popup, at.keydownListenerCapture = o.keydownListenerCapture, at.keydownTarget.addEventListener("keydown", at.keydownHandler, {
                      capture: at.keydownListenerCapture
                  }), at.keydownHandlerAdded = !0), i.enableButtons(), i.hideLoading(), i.resetValidationMessage(), o.toast && (o.input || o.footer || o.showCloseButton) ? A(document.body, k["toast-column"]) : M(document.body, k["toast-column"]);
                  for (var y, $, C = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], x = function(t) {
                          t.placeholder && !o.inputPlaceholder || (t.placeholder = o.inputPlaceholder)
                      }, T = 0; T < C.length; T++) {
                      var B = k[C[T]],
                          Z = O(s.content, B);
                      if (y = i.getInput(C[T])) {
                          for (var E in y.attributes)
                              if (y.attributes.hasOwnProperty(E)) {
                                  var j = y.attributes[E].name;
                                  "type" !== j && "value" !== j && y.removeAttribute(j)
                              }
                          for (var _ in o.inputAttributes) y.setAttribute(_, o.inputAttributes[_])
                      }
                      Z.className = B, o.inputClass && A(Z, o.inputClass), P(Z)
                  }
                  switch (o.input) {
                      case "text":
                      case "email":
                      case "password":
                      case "number":
                      case "tel":
                      case "url":
                          y = O(s.content, k.input), "string" == typeof o.inputValue || "number" == typeof o.inputValue ? y.value = o.inputValue : h('Unexpected type of inputValue! Expected "string" or "number", got "'.concat(t(o.inputValue), '"')), x(y), y.type = o.input, H(y);
                          break;
                      case "file":
                          x(y = O(s.content, k.file)), y.type = o.input, H(y);
                          break;
                      case "range":
                          var V = O(s.content, k.range),
                              z = V.querySelector("input"),
                              I = V.querySelector("output");
                          z.value = o.inputValue, z.type = o.input, I.value = o.inputValue, H(V);
                          break;
                      case "select":
                          var q = O(s.content, k.select);
                          if (q.innerHTML = "", o.inputPlaceholder) {
                              var D = document.createElement("option");
                              D.innerHTML = o.inputPlaceholder, D.value = "", D.disabled = !0, D.selected = !0, q.appendChild(D)
                          }
                          $ = function(t) {
                              t.forEach(function(t) {
                                  var e = t[0],
                                      i = t[1],
                                      a = document.createElement("option");
                                  a.value = e, a.innerHTML = i, o.inputValue.toString() === e.toString() && (a.selected = !0), q.appendChild(a)
                              }), H(q), q.focus()
                          };
                          break;
                      case "radio":
                          var W = O(s.content, k.radio);
                          W.innerHTML = "", $ = function(t) {
                              t.forEach(function(t) {
                                  var e = t[0],
                                      i = t[1],
                                      a = document.createElement("input"),
                                      s = document.createElement("label");
                                  a.type = "radio", a.name = k.radio, a.value = e, o.inputValue.toString() === e.toString() && (a.checked = !0);
                                  var n = document.createElement("span");
                                  n.innerHTML = i, n.className = k.label, s.appendChild(a), s.appendChild(n), W.appendChild(s)
                              }), H(W);
                              var e = W.querySelectorAll("input");
                              e.length && e[0].focus()
                          };
                          break;
                      case "checkbox":
                          var R = O(s.content, k.checkbox),
                              N = i.getInput("checkbox");
                          N.type = "checkbox", N.value = 1, N.id = k.checkbox, N.checked = Boolean(o.inputValue), R.querySelector("span").innerHTML = o.inputPlaceholder, H(R);
                          break;
                      case "textarea":
                          var U = O(s.content, k.textarea);
                          U.value = o.inputValue, x(U), H(U);
                          break;
                      case null:
                          break;
                      default:
                          f('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(o.input, '"'))
                  }
                  if ("select" === o.input || "radio" === o.input) {
                      var X = function(t) {
                          return $((e = t, i = [], "undefined" != typeof Map && e instanceof Map ? e.forEach(function(t, e) {
                              i.push([e, t])
                          }) : Object.keys(e).forEach(function(t) {
                              i.push([t, e[t]])
                          }), i));
                          var e, i
                      };
                      w(o.inputOptions) ? (n.showLoading(), o.inputOptions.then(function(t) {
                          i.hideLoading(), X(t)
                      })) : "object" === t(o.inputOptions) ? X(o.inputOptions) : f("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(t(o.inputOptions)))
                  } else -1 !== ["text", "email", "number", "tel", "textarea"].indexOf(o.input) && w(o.inputValue) && (n.showLoading(), P(y), o.inputValue.then(function(t) {
                      y.value = "number" === o.input ? parseFloat(t) || 0 : t + "", H(y), y.focus(), i.hideLoading()
                  }).catch(function(t) {
                      f("Error in inputValue promise: " + t), y.value = "", H(y), y.focus(), i.hideLoading()
                  }));
                  Mt(o), o.toast || (v(o.allowEnterKey) ? o.focusCancel && L(s.cancelButton) ? s.cancelButton.focus() : o.focusConfirm && L(s.confirmButton) ? s.confirmButton.focus() : b(-1, 1) : document.activeElement && document.activeElement.blur()), s.container.scrollTop = 0
              })
          }
      });

  function Ht() {
      if ("undefined" != typeof window) {
          "undefined" == typeof Promise && f("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");
          for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
          if (0 === e.length) return f("At least 1 argument is expected!"), !1;
          St = this;
          var o = Object.freeze(this.constructor.argsToParams(e));
          Object.defineProperties(this, {
              params: {
                  value: o,
                  writable: !1,
                  enumerable: !0
              }
          });
          var a = this._main(this.params);
          kt.promise.set(this, a)
      }
  }
  Ht.prototype.then = function(t, e) {
      return kt.promise.get(this).then(t, e)
  }, Ht.prototype.catch = function(t) {
      return kt.promise.get(this).catch(t)
  }, Ht.prototype.finally = function(t) {
      return kt.promise.get(this).finally(t)
  }, a(Ht.prototype, Ot), a(Ht, wt), Object.keys(Ot).forEach(function(t) {
      Ht[t] = function() {
          var e;
          if (St) return (e = St)[t].apply(e, arguments)
      }
  }), Ht.DismissReason = b, Ht.noop = function() {};
  var Pt, Lt, Bt = rt((Pt = Ht, Lt = function(i) {
      function r() {
          return e(this, r), c(this, n(r).apply(this, arguments))
      }
      return s(r, Pt), o(r, [{
          key: "_main",
          value: function(t) {
              return d(n(r.prototype), "_main", this).call(this, a({}, gt, t))
          }
      }], [{
          key: "setDefaults",
          value: function(e) {
              if (m(ft), !e || "object" !== t(e)) throw new TypeError("SweetAlert2: The argument for setDefaults() is required and has to be a object");
              ht(e), Object.keys(e).forEach(function(t) {
                  Pt.isValidParameter(t) && (gt[t] = e[t])
              })
          }
      }, {
          key: "resetDefaults",
          value: function() {
              m(ft), gt = {}
          }
      }]), r
  }(), "undefined" != typeof window && "object" === t(window._swalDefaults) && Lt.setDefaults(window._swalDefaults), Lt));
  return Bt.default = Bt
}), "undefined" != typeof window && window.Sweetalert2 && (window.Sweetalert2.version = "7.29.0", window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2), $(function() {
  const t = {
          methods: {}
      },
      e = !!$("#cabecalho .btn-group").length;
      t.methods.instagram = function() {
      if ("undefined" != typeof $instagram) {
          var t = $instagram.user,
              e = "<div id='instagram'><div class='conteiner'><h2><span><svg class='icon' xmlns='http://www.w3.org/2000/svg' viewBox='-8700.68 2378.321 32.422 32.421'><path id='Union_72' data-name='Union 72' class='cls-1' d='M7835.447-3201.945a8.957,8.957,0,0,1-8.947-8.947v-14.528a8.957,8.957,0,0,1,8.947-8.946h14.526a8.957,8.957,0,0,1,8.949,8.946v14.528a8.957,8.957,0,0,1-8.949,8.947Zm-6.071-23.475v14.528a6.077,6.077,0,0,0,6.071,6.069h14.528a6.075,6.075,0,0,0,6.069-6.069v-14.528a6.079,6.079,0,0,0-6.071-6.071h-14.526A6.078,6.078,0,0,0,7829.376-3225.42Zm4.98,7.264a8.364,8.364,0,0,1,8.355-8.355,8.363,8.363,0,0,1,8.353,8.355,8.361,8.361,0,0,1-8.353,8.353A8.362,8.362,0,0,1,7834.356-3218.156Zm2.877,0a5.483,5.483,0,0,0,5.478,5.477,5.484,5.484,0,0,0,5.477-5.477,5.484,5.484,0,0,0-5.477-5.477A5.483,5.483,0,0,0,7837.233-3218.156Zm12.692-7.191a2.128,2.128,0,0,1-.622-1.493,2.114,2.114,0,0,1,.622-1.491,2.116,2.116,0,0,1,1.489-.617,2.127,2.127,0,0,1,1.493.617,2.118,2.118,0,0,1,.617,1.491,2.132,2.132,0,0,1-.617,1.493,2.138,2.138,0,0,1-1.493.617A2.123,2.123,0,0,1,7849.926-3225.347Z' transform='translate(-16527.18 5612.687)'/></svg>" + $instagram.title + "</span><a href='https://instagram.com/" + t + "' target='blank'>@" + t + "</a></h2><ul></ul></div></div>";
          if ($(".pagina-inicial #video").length ? $(e).insertAfter($("#video")) : $(e).insertAfter($("#corpo")), $("#instagram").length) {
              var i = $("#instagram ul"),
                  o = $instagram.token,
                  a = $instagram.userid;
              $.ajax({
                  url: "https://api.instagram.com/v1/users/" + a + "/media/recent",
                  dataType: "jsonp",
                  type: "GET",
                  data: {
                      access_token: o,
                      count: 6
                  },
                  success: function(t) {
                      for (var e = 0; e < t.data.length; e++) i.append('<li><a href="' + t.data[e].link + '" target="_blank"><img src="' + t.data[e].images.standard_resolution.url + '" width="250" height="250" /></li>')
                  },
                  error: function(t) {
                      $("#instagram").hide()
                  }
              })
          }
      }
  }, t.methods.instagram2 = function() {
      if ("undefined" != typeof $instagram) {
          var t = `https://www.instagram.com/${$instagram.user}`.split("/").pop(),
              e = $instagram.user,
              i = `<div id="instagram"> <div class="conteiner"> <div class="row-fluid"><div class="feedInsta"></div></div></div></div>`;
          $("#barraNewsletter.posicao-rodape").length ? $("#barraNewsletter").before(i) : $("#rodape").before(i), o = jQuery, a = {
              host: "https://www.instagram.com/",
              username: "",
              container: "",
              display_profile: !0,
              display_biography: !0,
              display_gallery: !0,
              get_raw_json: !1,
              callback: null,
              styling: !0,
              items: 8,
              items_per_row: 4,
              margin: .5
          }, o.instagramFeed = function(t) {
              "" == (t = o.fn.extend({}, a, t)).username && "" == t.tag ? console.log("Instagram Feed: Error, no username or tag found.") : t.get_raw_json || "" != t.container ? t.get_raw_json && null == t.callback ? console.log("Instagram Feed: Error, no callback defined to get the raw json") : o.get(t.host + t.username, function(e) {
                  if (e = (e = (e = (e = e.split("window._sharedData = "))[1].split("<\/script>"))[0]).substr(0, e.length - 1), e = (e = JSON.parse(e)).entry_data.ProfilePage[0].graphql.user, t.get_raw_json) t.callback(JSON.stringify({
                      id: e.id,
                      username: e.username,
                      full_name: e.full_name,
                      is_private: e.is_private,
                      is_verified: e.is_verified,
                      biography: e.biography,
                      followed_by: e.edge_followed_by.count,
                      following: e.edge_follow.count,
                      images: e.edge_owner_to_timeline_media.edges
                  }));
                  else {
                      var i = "",
                          a = "",
                          s = "",
                          n = "",
                          r = "";
                      t.styling && (i = " style='text-align:center;'", a = " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'", s = " style='font-size:1.2em;'", n = " style='font-size:1em;'", r = " style='margin:" + t.margin + "% " + t.margin + "%;width:" + (100 - 2 * t.margin * t.items_per_row) / t.items_per_row + "%;float:left;'");
                      var l = "";
                      if (t.display_profile && (l = l + "<div class='instagram_profile'" + i + ">\t<img class='instagram_profile_image' src='" + e.profile_pic_url + "' alt='" + t.username + " profile pic'" + a + " />", l += "\t<p class='instagram_username'" + s + ">@" + e.full_name + " (<a href='https://www.instagram.com/" + t.username + "'>@" + t.username + "</a>)</p>"), t.display_biography && (l += "\t<p class='instagram_biography'" + n + ">" + e.biography + "</p>"), t.display_profile && (l += "</div>"), t.display_gallery)
                          if (e.is_private) l += "<p class='instagram_private'><strong>This profile is private</strong></p>";
                          else {
                              for (e = e.edge_owner_to_timeline_media.edges, max = e.length > t.items ? t.items : e.length, l += "<ul class='instagram_gallery'>", i = 0; i < max; i++) l += "<li><a href='https://www.instagram.com/p/" + e[i].node.shortcode + "' target='_blank'>", l += "\t<img style='height: 200px;' src='" + e[i].node.thumbnail_src + "' alt='" + t.username + " instagram image " + i + "'" + r + " />", l += "</a></li>";
                              l += "</ul>"
                          }
                      o(t.container).html(l)
                  }
              }) : console.log("Instagram Feed: Error, no container found.")
          }, $(window).load(function() {
              $.instagramFeed({
                  username: t,
                  container: ".feedInsta",
                  display_profile: !1,
                  display_biography: !1,
                  display_gallery: !0,
                  callback: null,
                  styling: !1,
                  items: 6,
                  items_per_row: 6,
                  margin: 1
              })
          })
      }
      var o, a
  }, t.methods.fullbannerMobile = function() {
      "undefined" != typeof $banners_mobile && ($('<div id="fullbanner-mob" class="fullbanner-mob"></div>').insertBefore(".pagina-inicial .secao-banners"), $banners_mobile.forEach(function(t) {
          var e, i, o;
          e = t, i = $("#fullbanner-mob"), o = '<div><a href="' + e.href + '"><img src="' + e.src + '" alt="' + e.alt + '" title="' + e.title + '"></a></div>', $(i).append(o)
      }), $("#fullbanner-mob").slick({
          infinite: !0,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 250,
          dots: !0,
          arrows: !1
      }))
  };
  
  t.methods.fullbannerMobile(), t.methods.instagram2()
}
);