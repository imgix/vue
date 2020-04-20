describe('Simple API', () => {
  it('renders a fluid image', () => {
    cy.visit('/');
    cy.findByTestId('simple-fluid').then($image => {
      expect($image.attr('src')).to.match(/ixlib=vue/);
      expect($image.attr('srcset')).to.match(/ixlib=vue/);
    });
  });
});
