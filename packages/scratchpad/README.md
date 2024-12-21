# Scratchpad

## Description

---

A simple static Frontend only scratchpad.  
Saves the text into `localstorage` while typing (debounced), or once in a while, and on exit, so that the data is not lost.  
Clearing the content is done manually by deleting the data.
It is meant to be a temporary scratchpad, that is not ephemeral, so that you don't lose your data if you accidentaly close the tab, browser, computer, etc...  
The data is not sent to any external Backend, and therefore is completely local. Does not protect against hardware failures.

## KNOWN ISSUES

---

Has problems with having multiple tabs open. They each override the same `localstorage`.  
It really is meant to be a singleton scratchpad.  

## TODO

---

Fix singleton problem by using a [Broadcast Channel]( https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API ).
Turn the content readonly for new tabs.  
!!! If the editable tab is closed, another readonly tab should update it's content and be promoted to editable !!!
Because message passing is async, that means the initial render needs to wait before loading it's content from `localstorage`.
