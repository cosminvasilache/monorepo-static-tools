import debounce from 'lodash/debounce';
import './style.scss';

// ================================================================

const e_textArea = document.getElementById('t') as HTMLTextAreaElement;

// ================================================================
// Ensure only one instance / tab exists to prevent race conditions
// ================================================================

const tabId = crypto.randomUUID();

const tabsOpen = new Set([tabId]);

type BroadcastMessage = {
  sender: ReturnType<typeof crypto.randomUUID>;
  type: 'open' | 'close' | 'ping';
};
const bc = new BroadcastChannel('tab-count');
bc.addEventListener('message', (e: MessageEvent<BroadcastMessage>) => {
  if (e.data.type === 'open') {
    tabsOpen.add(e.data.sender);
    bc.postMessage({
      sender: tabId,
      type: 'ping',
    } satisfies BroadcastMessage);
  }
  if (e.data.type === 'ping') {
    tabsOpen.add(e.data.sender);
  }
  if (e.data.type === 'close') {
    tabsOpen.delete(e.data.sender);
  }
  if (tabsOpen.size > 1) {
    e_textArea.disabled = true;
  } else {
    e_textArea.disabled = false;
  }
});

window.addEventListener('load', () => {
  bc.postMessage({
    sender: tabId,
    type: 'open',
  } satisfies BroadcastMessage);
});
window.addEventListener('beforeunload', () => {
  bc.postMessage({
    sender: tabId,
    type: 'close',
  } satisfies BroadcastMessage);
});

// ================================================================
// Persist content of `textarea` to `localStorage`
// ================================================================

const LOCAL_STORAGE_KEY = 'text';

const loadTextAreaValueFromLocalStorage = () => {
  const savedText = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedText !== null) {
    e_textArea.value = savedText;
    e_textArea.focus();
  }
};
const saveTextAreaValueToLocalStorage = () => {
  const contentText = e_textArea.value;
  if (contentText !== null) {
    localStorage.setItem(LOCAL_STORAGE_KEY, contentText);
  }
};

const onTextAreaInput = debounce(
  saveTextAreaValueToLocalStorage,
  1_000,
  {
    maxWait: 5_000,
  },
);
e_textArea.addEventListener('input', onTextAreaInput);

window.addEventListener('load', () => {
  loadTextAreaValueFromLocalStorage();
});
window.addEventListener('beforeunload', () => {
  saveTextAreaValueToLocalStorage();
});
