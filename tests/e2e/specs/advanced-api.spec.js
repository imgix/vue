describe('Advanced API', () => {
  context('buildUrlObject', () => {
    it('renders an image', () => {
      cy.visit('/');
      cy.findByTestId('advanced-basic-image').then($image => {
        expect($image.attr('src')).to.match(/ixlib=vue/);
      });
    });
  });

  context('buildUrl', () => {
    it('renders an image', () => {
      cy.visit('/');
      cy.findByTestId('advanced-build-url').then($image => {
        expect($image.attr('src')).to.match(/ixlib=vue/);
      });
    });
  });

  context('buildSrcSet', () => {
    it('renders an image', () => {
      cy.visit('/');
      cy.findByTestId('advanced-build-src-set').then($image => {
        expect($image.attr('srcset')).to.match(/ixlib=vue/);
      });
    });
  });
});
