function render(state) {
  switch(state.currentPage) {
    case 'upload':
      imageModule.render(state);
  }
}