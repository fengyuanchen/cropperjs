export default ({ Vue, isServer }) => {
  if (!isServer) {
    import('cropperjs');
  }

  Vue.ignoredElements = [/^cropper-/];
};
