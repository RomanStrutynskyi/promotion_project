describe('Widgets', () => {
  before(() => {
    cy.login();
  });
  beforeEach(() => {
    cy.intercept('get', ' https://api.coingecko.com/api/v3/coins/list', {
      fixture: 'crypto-currencies.js',
    });
    cy.intercept('get', '*api/v3/coins/markets?*').as('loadCurrency');
    cy.visit('/');
  });

  describe('Widget Edit', () => {
    const settingsBtn = '.crypto-currencies__button';
    const submitBtn = '.crypto-currencies__form button[type="submit"]';
    it('should show form if click on settings button', () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get('.crypto-currencies__form').should('not.exist');
        cy.get(settingsBtn).click();
        cy.get('.crypto-currencies__list').should('not.exist');
      });
    });
    it('should show list if click on cancel button', () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get(settingsBtn).click();

        cy.get('.crypto-currencies__list').should('not.exist');
        cy.get('.crypto-currencies__form button').contains('Cancel').click();
        cy.get('.crypto-currencies__form').should('not.exist');
      });
    });
    it('should show list if click on submit button', () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get(settingsBtn).click();

        cy.get('.crypto-currencies__list').should('not.exist');
        cy.get(submitBtn).click();
        cy.get('.crypto-currencies__form').should('not.exist');
      });
    });
    it('should add cryptoCurrency and change currency', () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get(settingsBtn).click();
        cy.get('mat-select')
          .first()
          .click()
          .then(() => {
            cy.getWithWait('mat-option').contains('Acoin').click();
            clickOutside();
          });
        cy.get('mat-select')
          .last()
          .click()
          .then(() => {
            cy.get('mat-option').contains('Ukrainian hryvnia').click();
          });
        cy.get(submitBtn).click();
        cy.wait('@loadCurrency').then(() => {
          cy.getWithWait('.crypto-currencies__list').contains('Acoin');
          cy.getWithWait('.crypto-currencies__list').contains('₴');
        });
      });
    });
    it('should remove cryptoCurrency and change currency', () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get(settingsBtn).click();
        cy.get('mat-select')
          .first()
          .click()
          .then(() => {
            cy.getWithWait('mat-option').contains('Acoin').click();
            clickOutside();
          });
        cy.get('mat-select')
          .last()
          .click()
          .then(() => {
            cy.get('mat-option').contains('Ukrainian hryvnia').click();
          });
        cy.get(submitBtn).click();
        cy.wait('@loadCurrency').then(() => {
          cy.get('.crypto-currencies__list').contains('Acoin');
          cy.get('.crypto-currencies__list').contains('₴');
          cy.get(settingsBtn).click();

          cy.get('mat-select')
            .first()
            .click()
            .then(() => {
              cy.getWithWait('mat-option').contains('Acoin').click();
              clickOutside();
            });
          cy.get('mat-select')
            .last()
            .click()
            .then(() => {
              cy.get('mat-option').contains('US Dollar').click();
            });
          cy.get(submitBtn).click();
          cy.wait('@loadCurrency').then(() => {
            cy.get('.crypto-currencies__list').should('not.contain', 'Acoin');
            cy.get('.crypto-currencies__list').contains('$');
          });
        });
      });
    });
    it('should clear changes cryptoCurrency and currency if click Cancel button', () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get(settingsBtn).click();
        cy.get('mat-select')
          .first()
          .click()
          .then(() => {
            cy.getWithWait('mat-option').contains('Acoin').click();
            clickOutside();
          });
        cy.get('mat-select')
          .last()
          .click()
          .then(() => {
            cy.get('mat-option').contains('Ukrainian hryvnia').click();
          });
        cy.get('.crypto-currencies__form').contains('Acoin');
        cy.get('.crypto-currencies__form').contains('Ukrainian hryvnia');

        cy.get('.crypto-currencies__form button').contains('Cancel').click();
        cy.wait('@loadCurrency').then(() => {
          cy.get(settingsBtn).click();

          cy.get('.crypto-currencies__form').should(
            'not.contain.text',
            'Acoin'
          );
          cy.get('.crypto-currencies__form').contains('US Dollar');
        });
      });
    });
    it('should have error message if cryptoCurrency more 10', () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get(settingsBtn).click();
        cy.get('mat-select')
          .first()
          .click()
          .then(() => {
            cy.getWithWait('mat-option').contains('Bitcoin').click();
            let i = 0;
            while (i < 11) {
              cy.get('mat-option').eq(i).click();
              i++;
            }
            clickOutside();
            cy.contains('Max quantity should be 10');
          });
        cy.get('mat-select')
          .last()
          .click()
          .then(() => {
            cy.get('mat-option').contains('Ukrainian hryvnia').click();
          });
        cy.get(submitBtn).should('be.disabled');
      });
    });
    it('should have error message if cryptoCurrency no selected', () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get(settingsBtn).click();
        cy.get('mat-select')
          .first()
          .click()
          .then(() => {
            cy.getWithWait('mat-option').contains('Bitcoin').click();
            clickOutside();
            cy.contains('Please select Crypto Currencies');
          });
        cy.get('mat-select')
          .last()
          .click()
          .then(() => {
            cy.get('mat-option').contains('Ukrainian hryvnia').click();
          });
        cy.get(submitBtn).should('be.disabled');
      });
    });
  });
  after(() => {
    cy.logout();
  });
});

function clickOutside() {
  cy.get('body').click(0, 0);
}
