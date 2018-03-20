const directive = {
  inserted (el, { value }, vnode) {
    console.info('vnode:', vnode);
  }
};

export default directive;
