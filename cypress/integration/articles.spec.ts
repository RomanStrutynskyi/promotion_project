import { ROUTES_DATA } from '../../src/app/shared/constants/routePaths';

describe('Articles', () => {
  before(() => {
    cy.login();
  });
  describe('Create/Preview/Edit Article page', () => {
    const titleField = '.title input';
    const bodyField = '.body textarea';
    const imageField = 'input[type="file"]';
    const submitBtn = 'button[type="submit"]';
    const editBtn = '.preview-article__edit a';
    let articleId;
    describe('Create Article', () => {
      beforeEach(() => {
        cy.visit(`/${ROUTES_DATA.ARTICLES.children.ADD.url}`);
      });
      it('should go to articles page', () => {
        cy.getWithWait('.create-edit-article__cancel').click();
        cy.url().should('include', ROUTES_DATA.ARTICLES.url);
      });

      it('should have error message if title is empty or invalid', () => {
        cy.getWithWait(bodyField).type('test article description');
        uploadImg(imageField, 'test.png');

        cy.get(titleField).focus().blur();
        cy.contains('Please enter Title');
        cy.get(submitBtn).should('be.disabled');

        cy.get(titleField).type('test').blur();
        cy.contains('Should have 10 characters');
        cy.get(submitBtn).should('be.disabled');
      });
      it('should cut string to 100 symbols in title if string to long', () => {
        cy.getWithWait(bodyField).type('test article description');
        uploadImg(imageField, 'test.png');

        cy.get(titleField)
          .clear()
          .type(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat dui sed nunc efficitur fermentum. Proin at quis.'
          )
          .blur()
          .should(
            'have.value',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat dui sed nunc efficitur ferme'
          );
        cy.get(submitBtn).should('not.be.disabled');
      });
      it('should have error message if body is empty or to short', () => {
        cy.getWithWait(titleField).type('test article title');
        uploadImg(imageField, 'test.png');

        cy.get(bodyField).focus().blur();
        cy.contains('Please enter Body');
        cy.get(submitBtn).should('be.disabled');

        cy.get(bodyField).type('test').blur();
        cy.contains('Should have 10 characters');
        cy.get(submitBtn).should('be.disabled');
      });
      it('should have error message if image is empty', () => {
        cy.getWithWait(titleField).type('test article title');
        cy.get(bodyField).type('test article description');
        cy.get(imageField).focus().blur();
        cy.contains('Please select image');

        cy.get(submitBtn).should('be.disabled');
      });

      it('should active submit button', () => {
        cy.intercept('get', '*api/v3/coins/markets?*').as('loadCurrency');

        cy.getWithWait(submitBtn).should('be.disabled');
        cy.get(titleField).type('test article title');
        cy.get(bodyField).type('test article description');
        uploadImg(imageField, 'test.png');

        cy.get(submitBtn).should('not.be.disabled').click();
        cy.wait('@loadCurrency').then(() => {
          cy.url().then(($url) => {
            articleId = $url.toString().split('articles/')[1];
          });
        });
      });
    });
    describe('Preview Article', () => {
      beforeEach(() => {
        cy.visit(`/${ROUTES_DATA.ARTICLES.url}/${articleId}`);
        cy.intercept('get', '*api/v3/coins/markets?*').as('loadCurrency');
      });
      it('should go to article edit page after click edit button', () => {
        cy.wait('@loadCurrency').then(() => {
          cy.getWithWait(editBtn).click();
          cy.url().should(
            'include',
            `${ROUTES_DATA.ARTICLES.url}/edit/${articleId}`
          );
        });
      });
      it(`shouldn't found edit button if I'm not author for article`, () => {
        cy.wait('@loadCurrency').then(() => {
          cy.visit(`/${ROUTES_DATA.ARTICLES.url}`);
          cy.getWithWait('.item-article')
            .last()
            .click()
            .then((item) => {
              cy.url().should('include', item.attr('href'));
              cy.get(editBtn).should('not.exist');
            });
        });
      });
    });
    describe('Edit Article', () => {
      beforeEach(() => {
        cy.visit(`/${ROUTES_DATA.ARTICLES.url}/edit/${articleId}`);
      });

      it('should have error message if title is empty or invalid', () => {
        cy.getWithWait(titleField).clear().blur();
        cy.contains('Please enter Title');
        cy.get(submitBtn).should('be.disabled');

        cy.get(titleField).type('test').blur();
        cy.contains('Should have 10 characters');
        cy.get(submitBtn).should('be.disabled');
      });
      it('should cut string to 100 symbols in title if string to long', () => {
        cy.getWithWait(titleField)
          .clear()
          .type(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat dui sed nunc efficitur fermentum. Proin at quis.'
          )
          .blur()
          .should(
            'have.value',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat dui sed nunc efficitur ferme'
          );
        cy.get(submitBtn).should('not.be.disabled');
      });
      it('should go to current article page after cancel', () => {
        cy.visit(`/${ROUTES_DATA.ARTICLES.url}/${articleId}`);
        cy.visit(`/${ROUTES_DATA.ARTICLES.url}/edit/${articleId}`);

        cy.getWithWait('.create-edit-article__cancel').click();
        cy.url().should('include', `${ROUTES_DATA.ARTICLES.url}/${articleId}`);
      });
      it('should go to current article page after submit', () => {
        cy.getWithWait(submitBtn).click();
        cy.url().should('include', `${ROUTES_DATA.ARTICLES.url}/${articleId}`);
      });
      it('should go to articles page after remove', () => {
        cy.getWithWait('.create-edit-article__remove ').click();
        cy.url().should('include', ROUTES_DATA.ARTICLES.url);
      });
    });
  });
  describe('Articles page', () => {
    beforeEach(() => {
      cy.visit(`/${ROUTES_DATA.ARTICLES.url}`);
      cy.intercept('get', '*api/v3/coins/markets?*').as('loadCurrency');
    });
    it(`should go to article preview if click on article`, () => {
      cy.wait('@loadCurrency').then(() => {
        cy.get('.item-article')
          .first()
          .click()
          .then((item) => {
            cy.url().should('include', item.attr('href'));
          });
      });
    });
    it(`should go to create article if click on article`, () => {
      cy.wait('@loadCurrency').then(() => {
        cy.getWithWait('.article-list__button').click();
        cy.url().should('include', ROUTES_DATA.ARTICLES.children.ADD.url);
      });
    });
    it(`should go to user profile if click profile avatar`, () => {
      cy.wait('@loadCurrency').then(() => {
        cy.getWithWait('.layout-header__user').click();
        cy.url().should('include', ROUTES_DATA.PROFILE.url);
      });
    });
  });
  after(() => {
    cy.logout();
  });
});

function uploadImg(selector: string, fileName: string): void {
  cy.fixture(`images/${fileName}`)
    .then(Cypress.Blob.base64StringToBlob)
    .then((fileContent) => {
      cy.get(selector).attachFile({
        fileContent,
        fileName,
        mimeType: `image/png`,
      });
    });
}
