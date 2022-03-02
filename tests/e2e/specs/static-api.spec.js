describe('Static API', () => {
  it('should render image with relative URL', () => {
    cy.visit('/');
    cy.findByTestId('static-api-relative').should(($image) => {
      expect($image.attr('src')).to.match(/assets.imgix.net/);
      expect($image.attr('srcset')).to.match(/assets.imgix.net/);
    });
  })
  it('should render image with an absolute URL', () => {
    cy.visit('/');
    cy.findByTestId('static-api-absolute').should(($image) => {
      expect($image.attr('src')).to.match(/https:\/\/sdk-test.imgix.net\/amsterdam.jpg/,
      );
      expect($image.attr('srcset')).to.match(/sdk-test.imgix.net\/amsterdam.jpg/);
    });
  })
});
