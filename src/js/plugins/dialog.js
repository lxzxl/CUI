//dialog plugin
(function($) {
    var dialogConfig = {
        name: 'dialog',
        defaultOpt: {
            showafter: null,
            hideafter: null,
            showbefore: null,
            initafter: null,
            autoclose: true,
            cache: false,
            theme: 'default',
            id: +new Date(),
            trigger: null,
        },
        initBefore: null,
        init: function(context) {
            var opt = context.opt;
            var $this = context.$element;
            var $dialog = $('<div class="dialog dialog-' + opt.theme + '" tabIndex="-1"></div>');
            var $dialogCloseButton = $('<a class="dialog-title-close" dialog-close href="javascript:void(0);"><i class="icon-remove"></i></a>');
            var $dialogPanel = $('<div class="dialog-panel"></div>');
            var $dialogBody = $('<div class="dialog-body"></div>');
            var $dialogOverLay = $('<div class="dialog-overlay"></div>');
            var _reposition = function() {
                var height = $dialog.height() - $dialogPanel.outerHeight();
                if (height > 0) {
                    $dialogPanel.css({
                        marginTop: height / 2 + 'px'
                    });
                } else {
                    $dialogPanel.css({
                        marginTop: 5
                    });
                }
            };
            var _addCloseButton = function() {
                if ($dialogBody && $dialogBody.find('.dialog-title') && $dialogBody.find('.dialog-title').length) {
                    $dialogBody.find('.dialog-title').append($dialogCloseButton);
                }
                $dialogBody.on('click', '[dialog-close]', function() {
                    _hide();
                });
            };
            var _show = function() {
                $(document).trigger('dialog.hidden.except', [opt.id]);
                if (opt.showBefore) {
                    $.CUI.addEvent(opt.showBefore, $this);
                }
                //todo here
                if (!opt.cache || !$dialogBody.html()) {
                    $dialogBody.html($this.html());
                    _addCloseButton();
                }
                if (opt.initafter) {
                    if ($.isFunction(opt.initafter)) {
                        opt.initafter();
                    } else {
                        $(document).trigger(opt.initafter, [opt.trigger]);
                    }
                }
                $(document).trigger('dom.load');

                $('html').addClass('model-dialog');
                $dialog.show();
                setTimeout(function() {
                    $dialog.addClass('dialog-active');
                    _reposition();
                    if (opt.showafter) {
                        $.CUI.addEvent(opt.showafter, $this);
                    }
                }, 50);
            };
            var _hide = function() {
                $('html').removeClass('model-dialog');
                $dialog.removeClass('dialog-active');
                $dialogPanel.css({marginTop: '0'});
                setTimeout(function() {
                    $dialog.hide();
                    if (opt.hideafter) {
                        if ($.isFunction(opt.hideafter)) {
                            opt.hideafter();
                        } else {
                            $(document).trigger(opt.hideafter, [opt.trigger]);
                        }
                    }
                }, 500);
            };
            var _option = function(option) {
                opt = $.extend(opt, option);
                return opt;
            };
            var _init = function() {
                $dialogPanel.append($dialogBody);
                $dialog.append($dialogPanel);
                $dialog.prepend($dialogOverLay);
                $('body').append($dialog);

                if (opt.theme == 'dropdown') {
                    $dialogBody.on('click', 'a', function() {
                        setTimeout(function() {
                            _hide();
                        }, 10);
                    });
                }
                if (opt.autoclose) {
                    $dialogOverLay.click(_hide);
                }
                $(document).on('dialog.hidden.except', function(e, id) {
                    if (id != opt.id) {
                        _hide();
                    }
                });
                $(document).on('dom.resize', function() {
                    _reposition();
                });
                var obj = {
                    show: _show,
                    hide: _hide,
                    option: _option
                };
                $this.data('dialog', obj);
                $dialog.attr('role', 'Dialog');
                return obj;
            };
        },
        exports: {},
        setOptionsBefore: null,
        setOptionsAfter: null,
        destroyBefore: null,
        initAfter: null,
        isThirdPart: false,
    };
    $.fn.dialog = function(option) {
        // var $this = $(this);
        // if ($this.data('dialog')) {
        //     $this.data('dialog').option(option);
        //     return $this.data('dialog');
        // }
        // var defaultOpt = {
        //     showafter: null,
        //     hideafter: null,
        //     showbefore: null,
        //     initafter: null,
        //     autoclose: true,
        //     cache: false,
        //     theme: 'default',
        //     id: +new Date(),
        //     trigger: null,
        // };
        // var opt = $.extend({}, defaultOpt, option);
        // var $dialog = $('<div class="dialog dialog-' + opt.theme + '" tabIndex="-1"></div>');
        // var $dialogCloseButton = $('<a class="dialog-title-close" dialog-close href="javascript:void(0);"><i class="icon-remove"></i></a>');
        // var $dialogPanel = $('<div class="dialog-panel"></div>');
        // var $dialogBody = $('<div class="dialog-body"></div>');
        // var $dialogOverLay = $('<div class="dialog-overlay"></div>');
        var _reposition = function() {
            var height = $dialog.height() - $dialogPanel.outerHeight();
            if (height > 0) {
                $dialogPanel.css({
                    marginTop: height / 2 + 'px'
                });
            } else {
                $dialogPanel.css({
                    marginTop: 20
                });
            }
        };
        var _addCloseButton = function() {
            if ($dialogBody && $dialogBody.find('.dialog-title') && $dialogBody.find('.dialog-title').length) {
                $dialogBody.find('.dialog-title').append($dialogCloseButton);
            }
            $dialogBody.on('click', '[dialog-close]', function() {
                _hide();
            });
        };
        var _show = function() {
            $(document).trigger('dialog.hidden.except', [opt.id]);
            if (opt.showbefore) {
                if ($.isFunction(opt.showbefore)) {
                    opt.showbefore();
                } else {
                    $(document).trigger(opt.showbefore, [opt.trigger]);
                }
            }
            if (!opt.cache || !$dialogBody.html()) {
                $dialogBody.html($this.html());
                _addCloseButton();
            }
            if (opt.initafter) {
                if ($.isFunction(opt.initafter)) {
                    opt.initafter();
                } else {
                    $(document).trigger(opt.initafter, [opt.trigger]);
                }
            }
            $(document).trigger('dom.load');

            $('html').addClass('model-dialog');
            $dialog.show();
            setTimeout(function() {
                $dialog.addClass('dialog-active');
                _reposition();
                if (opt.showafter) {
                    if ($.isFunction(opt.showafter)) {
                        opt.showafter();
                    } else {
                        $(document).trigger(opt.showafter, [opt.trigger]);
                    }
                }
            }, 50);
        };
        var _hide = function() {
            $('html').removeClass('model-dialog');
            $dialog.removeClass('dialog-active');
            $dialogPanel.css({marginTop: '0'});
            setTimeout(function() {
                $dialog.hide();
                if (opt.hideafter) {
                    if ($.isFunction(opt.hideafter)) {
                        opt.hideafter();
                    } else {
                        $(document).trigger(opt.hideafter, [opt.trigger]);
                    }
                }
            }, 500);
        };
        var _option = function(option) {
            opt = $.extend(opt, option);
            return opt;
        };
        var _init = function() {
            $dialogPanel.append($dialogBody);
            $dialog.append($dialogPanel);
            $dialog.prepend($dialogOverLay);
            $('body').append($dialog);

            if (opt.theme == 'dropdown') {
                $dialogBody.on('click', 'a', function() {
                    setTimeout(function() {
                        _hide();
                    }, 10);
                });
            }
            if (opt.autoclose) {
                $dialogOverLay.click(_hide);
            }
            $(document).on('dialog.hidden.except', function(e, id) {
                if (id != opt.id) {
                    _hide();
                }
            });
            $(document).on('dom.resize', function() {
                _reposition();
            });
            var obj = {
                show: _show,
                hide: _hide,
                option: _option
            };
            $this.data('dialog', obj);
            $dialog.attr('role', 'Dialog');
            return obj;
        };
        return _init();
    };

    $(document).on('dom.load.dialog', function() {
        $('[data-dialog]').each(function() {
            $(this).click(function() {
                var $this = $(this);
                var data = $this.data();
                data.trigger = $this;
                var $target = $(data.target);
                $target.dialog(data).show();
                return false;
            });
            $(this).removeAttr('data-dialog');
        });
    });
})(jQuery);
