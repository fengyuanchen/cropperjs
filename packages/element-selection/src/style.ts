export default `
:host {
  display: block;
  position: relative;
}

:host([outlined]) {
  outline: 1px solid var(--theme-color);
}
`;
