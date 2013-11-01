var s,
    Accordions = {

        settings: {
            accordions: $('.js-accordion'),
            panels: $('.js-accordion dd'),
            titles: $('.js-accordion dt'),
            firstTitle: $('.js-accordion dt').first(),
            lastTitle: $('.js-accordion dt').last(),
            keys: {
              enter: 13,
              space: 32,
              end: 35,
              home: 36,
              left: 37,
              up: 38,
              right: 39,
              down: 40
            }
        },

        init: function() {
            // Make settings available to the module
            s = this.settings;

            // Bind UI Actions
            this.bindUiActions();

            // Set defaults if JS is enabled
            s.titles.attr({
                'aria-selected': 'false',
                'aria-expanded': 'false'
            });
            s.panels.addClass('hide').attr('aria-hidden', 'true');
        },

        bindUiActions: function() {
            Accordions.click();
            Accordions.keyDown();
        },

        // When title clicked, open/close accordion, and set proper aria attributes
        click: function() {
            s.titles.
                on('click', function(e) {
                    Accordions.toggle($(this));
                    Accordions.focusedTitle($(this));
                }).
                // This prevents highlight if user click too rapidly on title
                on('selectstart', function(e) {
                    e.preventDefault();
                });
        },

        // Handle keydown events
        keyDown: function() {
            s.titles.on('keydown', function(e) {
                switch(true) {
                  case (e.which === s.keys.enter): 
                      Accordions.toggle($(this));
                      break;

                  case (e.which === s.keys.space):
                      Accordions.toggle($(this));
                      break;

                  case (e.which === s.keys.right):
                      Accordions.nextTab($(this));
                      break;

                  case (e.which === s.keys.down):
                      Accordions.nextTab($(this));
                      break;

                  case (e.which === s.keys.left):
                      Accordions.previousTab($(this));
                      break;

                  case (e.which === s.keys.up):
                      Accordions.previousTab($(this));
                      break;

                  case (e.which === s.keys.home):
                      Accordions.firstTab($(this));
                      break;

                  case (e.which === s.keys.end):
                      Accordions.lastTab($(this));
                      break;
                }
            });
          s.panels.on('keydown', function(e) {
              switch(true) {
                  case (e.which === s.keys.up && e.ctrlKey):
                      Accordions.parentTitle($(this));
                      break;
              }
          });
        },

        // Show tab panel
        show: function(ele) {
            ele.removeClass('hide').attr('aria-hidden', 'false');
        },

        // Hide tab panel
        hide: function(ele) {
            ele.addClass('hide').attr('aria-hidden', 'true');
        },

        // Show/hide accordion and set proper aria attributes
        toggle: function(ele) {
            var $title = ele,
                $target = ele.next();
            if ($target.hasClass('hide')) {
                Accordions.show($target);
                $title.attr('aria-expanded', 'true');
                Accordions.setChildrenTabIndex();
            } else {
                Accordions.hide($target);
                $title.attr('aria-expanded', 'false');
                Accordions.unsetChildrenTabIndex();
            }
            Accordions.focusedTitle($title);
        },

        // Get next tab, set focus on it and set aria-selected attribute
        nextTab: function(ele) {
            try {
                var $target = ele.next('dd').next('dt')[0];
                $target.focus();
                Accordions.focusedTitle(ele);
            } catch (e) {
                if (!(e instanceof TypeError)) {
                    throw e;
                }
            }
        },

        // Get previous tab, set focus on it and set aria-selected attribute
        previousTab: function(ele) {
            try {
                var $target = ele.prev('dd').prev('dt')[0];
                $target.focus();
                Accordions.focusedTitle(ele);
            } catch (e) {
                if (!(e instanceof TypeError)) {
                    throw e;
                }
            }
        },

        // Set focus on first accordion title and set aria-selected attribute
        firstTab: function() {
            s.firstTitle.focus();
            Accordions.focusedTitle(s.firstTitle);
        },

        // Set focus on last accordion title and set aria-selected attribute
        lastTab: function() {
            s.lastTitle.focus();
            Accordions.focusedTitle(s.lastTitle);
        },

        parentTitle: function(ele) {
            var $title = ele.prev();
            $title.focus();
            Accordions.focusedTitle($title);
        },

        // Set proper aria-selected attribute on accordion titles
        // @todo: make this better. The 'if' statement breaks keyboard
        // navigation if there's more than one accordion on the page.
        focusedTitle: function(ele) {
            var $prevSelected = $('dt[aria-selected="true"]'),
                $focused = $(document.activeElement);

            if ($focused.is('dt')) {
                $prevSelected.attr('aria-selected', 'false').attr('tabindex', '-1');
                $focused.attr('aria-selected', 'true').attr('tabindex', '0');
            }
        },

        // Get the active title and assign tabindex on tabpanel children
        setChildrenTabIndex: function() {
            var $active = $('dt[aria-expanded="true"]'),
                $activeTabPanel = $active.next();

            $activeTabPanel.children().attr('tabindex', '0');
        },

        // Get the non-active titles and unset tabindex on tabpanel children
        unsetChildrenTabIndex: function() {
            var $nonActive = $('dt[aria-expanded="false"]'),
                $nonActiveTabPanel = $nonActive.next();

            $nonActiveTabPanel.children().attr('tabindex', '-1');
        }

};

Accordions.init();
