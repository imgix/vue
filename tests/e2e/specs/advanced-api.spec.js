describe('Advanced API', () => {
  before(() => {
    cy.fixture('test-image').as('testImage');
  });
  it('renders an image', () => {
    cy.visit('/');
    cy.findByTestId('advanced-basic-image').then($image => {
      expect($image.attr('src')).to.match(/ixlib=vue/);
    });
  });
});
