// `npm install typescript`, then `npx tsc prototypes/hovercard/hovercard.ts` to compile into JS
// the only non-vanilla-browser thing I used so I can play around w/fewer "oops it's
// undefined" bugs
function showHovercard() {
  //   console.log('show hovercard')
  const hovercard = document.getElementById('hovercard')
  if (hovercard) {
    hovercard.style.visibility = 'visible'
  }
}

function hideHovercard() {
  //   console.log('hide hovercard')
  const hovercard = document.getElementById('hovercard')
  if (hovercard) {
    hovercard.style.visibility = 'hidden'
  }
}

function moveFocusIntoHovercard() {
  //   console.log('move focus into hovercard')
  focusFirst()
}

function focusFirst() {
  // focus the first interactive thing in the hovercard (hardcoded for this
  // prototype)
  window.document.getElementById('first')?.focus()
}

function focusLast() {
  // focus the last interactive thing in the hovercard (hardcoded for this
  // prototype)
  window.document.getElementById('last')?.focus()
}

const HOVERCARD_TRIGGER_ID = 'hovercard-trigger'

window.addEventListener('DOMContentLoaded', (_) => {
  // mouse listeners
  window.document
    .getElementById(HOVERCARD_TRIGGER_ID)
    ?.addEventListener('mouseover', () => {
      showHovercard()
    })
  window.document
    .getElementById(HOVERCARD_TRIGGER_ID)
    ?.addEventListener('mouseleave', (event) => {
      console.log(event)
      hideHovercard()
    })
  // Decide on a shortcut, then document it....docs.github.com/accessibility???
  // Right now we ask the user to press Alt+Up to show the hovercard when the
  // trigger is focused
  window.document
    .getElementById(HOVERCARD_TRIGGER_ID)
    ?.addEventListener('keyup', (event) => {
      if (event.key == 'ArrowUp' && event.altKey) {
        showHovercard()
        moveFocusIntoHovercard()
      } else if (event.key == 'Esc') {
        hideHovercard()
      }
    })

  window.document
    .getElementById('hovercard')
    ?.addEventListener('keyup', (event) => {
      if (event.key == 'Escape') {
        hideHovercard()
        document.getElementById(HOVERCARD_TRIGGER_ID)?.focus()
      }
    })

  // janky focus trapping
  window.document
    .getElementById('a11y-hidden-start')
    ?.addEventListener('keyup', (event) => {
      if (event.key == 'Tab' && event.shiftKey) {
        focusLast()
      } else if (event.key == 'Tab') {
        focusFirst()
      }
    })
  window.document
    .getElementById('a11y-hidden-end')
    ?.addEventListener('keyup', (event) => {
      if (event.key == 'Tab' && event.shiftKey) {
        focusLast()
      } else if (event.key == 'Tab') {
        focusFirst()
      }
    })
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
})
