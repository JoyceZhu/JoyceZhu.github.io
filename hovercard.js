// `npm install typescript`, then `npx tsc prototypes/hovercard/hovercard.ts` to compile into JS
// the only non-vanilla-browser thing I used so I can play around w/fewer "oops it's
// undefined" bugs
function showHovercard() {
    //   console.log('show hovercard')
    var hovercard = document.getElementById('hovercard');
    if (hovercard) {
        hovercard.style.visibility = 'visible';
    }
}
function hideHovercard() {
    //   console.log('hide hovercard')
    var hovercard = document.getElementById('hovercard');
    if (hovercard) {
        hovercard.style.visibility = 'hidden';
    }
}
function moveFocusIntoHovercard() {
    //   console.log('move focus into hovercard')
    focusFirst();
}
function focusFirst() {
    var _a;
    // focus the first interactive thing in the hovercard (hardcoded for this
    // prototype)
    (_a = window.document.getElementById('first')) === null || _a === void 0 ? void 0 : _a.focus();
}
function focusLast() {
    var _a;
    // focus the last interactive thing in the hovercard (hardcoded for this
    // prototype)
    (_a = window.document.getElementById('last')) === null || _a === void 0 ? void 0 : _a.focus();
}
var HOVERCARD_TRIGGER_ID = 'hovercard-trigger';
window.addEventListener('DOMContentLoaded', function (_) {
    var _a, _b, _c, _d, _e, _f;
    // mouse listeners
    (_a = window.document
        .getElementById(HOVERCARD_TRIGGER_ID)) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseover', function () {
        showHovercard();
    });
    (_b = window.document
        .getElementById(HOVERCARD_TRIGGER_ID)) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseleave', function (event) {
        console.log(event);
        hideHovercard();
    });
    // Decide on a shortcut, then document it....docs.github.com/accessibility???
    // Right now we ask the user to press Alt+Up to show the hovercard when the
    // trigger is focused
    (_c = window.document
        .getElementById(HOVERCARD_TRIGGER_ID)) === null || _c === void 0 ? void 0 : _c.addEventListener('keyup', function (event) {
        if (event.key == 'ArrowUp' && event.altKey) {
            showHovercard();
            moveFocusIntoHovercard();
        }
        else if (event.key == 'Esc') {
            hideHovercard();
        }
    });
    (_d = window.document
        .getElementById('hovercard')) === null || _d === void 0 ? void 0 : _d.addEventListener('keyup', function (event) {
        var _a;
        if (event.key == 'Escape') {
            hideHovercard();
            (_a = document.getElementById(HOVERCARD_TRIGGER_ID)) === null || _a === void 0 ? void 0 : _a.focus();
        }
    });
    // janky focus trapping
    (_e = window.document
        .getElementById('a11y-hidden-start')) === null || _e === void 0 ? void 0 : _e.addEventListener('keyup', function (event) {
        if (event.key == 'Tab' && event.shiftKey) {
            focusLast();
        }
        else if (event.key == 'Tab') {
            focusFirst();
        }
    });
    (_f = window.document
        .getElementById('a11y-hidden-end')) === null || _f === void 0 ? void 0 : _f.addEventListener('keyup', function (event) {
        if (event.key == 'Tab' && event.shiftKey) {
            focusLast();
        }
        else if (event.key == 'Tab') {
            focusFirst();
        }
    });
    // old code for "show hovercard when the trigger is focused"
    // window.document
    //   .getElementById(HOVERCARD_TRIGGER_ID)
    //   ?.addEventListener('keydown', (event) => {
    //     // We're not using blur here b/c the event propagation prevents actually
    //     // focusing anything and just dismisses the hovercard
    //     if (event.key == 'Tab') {
    //       hideHovercard()
    //     }
    //   })
    // window.document
    //   .getElementById(HOVERCARD_TRIGGER_ID)
    //   ?.addEventListener('keyup', (event) => {
    //     // We're not using focus here b/c the event propagation doesn't allow us
    //     // to dismiss the hovercard w/Esc correctly
    //     if (event.key == 'Tab') {
    //       showHovercard()
    //     }
    //   })
});
