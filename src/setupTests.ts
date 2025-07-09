import '@testing-library/jest-dom';

// Polyfill for structuredClone (needed for Chakra UI)
global.structuredClone = global.structuredClone || function(obj) {
  return JSON.parse(JSON.stringify(obj));
};