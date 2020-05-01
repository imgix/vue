describe('Advanced API', () => {
  context('buildUrlObject', () => {
    it('renders an image', () => {
      cy.visit('/');
      cy.findByTestId('advanced-basic-image').then(($image) => {
        expect($image.attr('src')).to.match(/ixlib=vue/);
      });
    });
  });

  context('buildUrl', () => {
    it('renders an image', () => {
      cy.visit('/');
      cy.findByTestId('advanced-build-url').then(($image) => {
        expect($image.attr('src')).to.match(/ixlib=vue/);
      });
    });
  });

  context('buildSrcSet', () => {
    it('renders an image', () => {
      cy.visit('/');
      cy.findByTestId('advanced-build-src-set').then(($image) => {
        expect($image.attr('srcset')).to.match(/ixlib=vue/);
      });
    });
  });

  context('attributeConfig', () => {
    it('a custom attribute config maps the urls to the right attributes', () => {
      cy.visit('/');

      cy.findByTestId('advanced-attribute-config')
        .find('img')
        .then(($image) => {
          expect($image.attr('src')).to.not.be.ok;
          expect($image.attr('srcset')).to.not.be.ok;
          expect($image.attr('data-src')).to.be.ok;
          expect($image.attr('data-srcset')).to.be.ok;
        });
    });
  });
});
