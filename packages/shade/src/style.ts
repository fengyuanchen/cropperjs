export default `
:host {
  outline: var(--theme-color) solid 1px;
  display: block;
  height: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: 0;
}

:host([transparent]) {
  outline-color: transparent;
}
`;
