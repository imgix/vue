describe('Advanced API', () => {
  before(() => {
    cy.fixture('test-image').as('testImage');
  });
  it('renders an image', () => {
    cy.server({ force404: true });

    cy.route('https://assets.imgix.net/examples/test-image.jpg').as(
      'testImage',
    );

    cy.visit('/');
    cy.findByTestId('advanced-basic-image').then($image => {
      expect($image).to.have.attr('src', /ixlib=vue/);
    });
  });
});
