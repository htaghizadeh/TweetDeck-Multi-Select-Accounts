// ==UserScript==
// @name         TweetDeck Multi-Select Accounts
// @namespace    http://web.tweetdeck.com/
// @version      1.0
// @description  Add a button to select all accounts in order to send a tweet!
// @author       Hossein Taghi-Zadeh
// @copyright    2016+, Hossein Taghi-Zadeh (h.t.azeri@gmail.com)
// @include      https://tweetdeck.twitter.com/
// @run-at       document-end
// ==/UserScript==

(function(window) {
    var $ = window.$, _ = window._, TD, _gaq;
    var containerSelector = 'div.js-account-list.compose-accounts.cf';
    var accountItemSelector = 'a.js-account-item.compose-account.is-actionable';

    function getAccountSelector(item) {
        return accountItemSelector+':eq('+item.toString()+')';
    }

    function getAccountItem(item) {
        return $(getAccountSelector(item));
    }

    function clickOnAccount(item) {
        getAccountItem(item).click();
    }

    function accountIsSelected(item) {
        return getAccountItem(item).hasClass('is-selected');
    }

    function selectAccount(item) {
        if (!accountIsSelected(item))
            getAccountItem(item).click();
    }

    function unSelectAccount(item) {
        if (accountIsSelected(item))
            getAccountItem(item).click();
    }

    $(window.document).on('TD.ready', function() {
        TD = window.TD;        
        var container = $(containerSelector);
        var accountCount = container.find(accountItemSelector).size();

        var h1 = $('h1.js-compose-title.compose-title-text.txt-ellipsis.inline-block');
        if (h1) {
            var btnSelectAll = $('<button id="btnSelectAll" class="js-spinner-button js-show-tip btn btn-positive">Select All</button>');
            var btnToggle = $('<button id="btnToggle" class="js-spinner-button js-show-tip btn btn-positive">Toggle</button>');
            var btnRandom = $('<button id="btnRandom" class="js-spinner-button js-show-tip btn btn-positive">Random</button>');
            h1.after(btnSelectAll).after(btnToggle).after(btnRandom);
            h1.remove();
            //
            $('#btnSelectAll').click(function(){
                var container = $(containerSelector);
                var text = $(this).text();
                if (text == 'DeSelect All') {
                    for(var i=0; i< accountCount; i++) {
                        unSelectAccount(i);
                    }
                    $(this).html('Select All');
                }
                else {
                    for(var j=0; j< accountCount; j++) {
                        selectAccount(j);
                    }
                    $(this).html('DeSelect All');
                }
            });

            $('#btnToggle').click(function(){
                for(var i=0; i< accountCount; i++) {
                    clickOnAccount(i);
                }
            });

            $('#btnRandom').click(function(){
                var def = Math.floor(accountCount / 2);
                if (def < 1)
                    def = 1;
                var count = prompt("How many account do you want to select? (1-"+accountCount.toString()+")", def.toString());

                var randomArr = [];
                while(randomArr.length < count){
                    var rnd = Math.floor(Math.random() * accountCount);
                    if(randomArr.indexOf(rnd) > -1) continue;
                    randomArr[randomArr.length] = rnd;
                }

                if (count !== null) {
                    for(var i=0; i< accountCount; i++) {
                        mustSelect = randomArr.indexOf(i) > -1;
                        if (mustSelect)
                            selectAccount(i);
                        else
                            unSelectAccount(i);
                    }
                }
            });
        }
    });
}(unsafeWindow));
