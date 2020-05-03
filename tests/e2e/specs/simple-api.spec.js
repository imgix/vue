describe('Simple API', () => {
  it('renders a fluid image', () => {
    cy.visit('/');
    cy.findByTestId('simple-fluid').should(($image) => {
      expect($image.attr('src')).to.match(/ixlib=vue/);
      expect($image.attr('srcset')).to.match(/ixlib=vue/);
    });
  });

  it('renders a fixed width image', () => {
    cy.findByTestId('simple-fixed-width').should(($image) => {
      expect($image.attr('src')).to.match(/w=100/);
      expect($image.attr('width')).to.eq('100');
    });
  });

  it('renders a picture', () => {
    const picture = cy.findByTestId('simple-picture').find('picture');

    picture.find('source:first').should('have.attr', 'srcset', /ixlib/);
    picture.find('img').should('have.attr', 'src', /ixlib/);
  });
});
