/// <reference types="cypress"/>

describe("Validate snapshots module", () => {
  var state = "Charleston County, SC";
  var cardTitle = "Sea Level Rise";
  it("Validate snapshot search box and people at risk number", () => {
    cy.visit("https://coast.noaa.gov/snapshots/");
    cy.get("input[class='react-autosuggest__input']").type(
      "Charleston , South Carolina"
    );
    cy.get(".react-autosuggest__suggestions-list > li").each(
      ($el, index, $list) => {
        if ($el.text() === state) {
          $el.trigger("click");
        }
      }
    );

    cy.get(".card__title").each(($el, index, $list) => {
      var text = $el.text();
      if (text === cardTitle) {
        expect(text).to.equal(cardTitle);
        cy.wrap($el).click();
      }
    });
    cy.get(".container--fluid .button.button--primary").click({ force: true });
    cy.get(
      ":nth-child(2) > .print__columns > .print__section-sidebar > p"
    ).should("contain", "19.3%");

    cy.get("button.button--large.button--flat").click();
    cy.get("[title^='Creating a Better Future']").click({ force: true });

    cy.request({
      method: "GET",
      url: "https://coast.noaa.gov/snapshots/api/futureFlood/45019.json",
    }).then((response) => {
      let body = JSON.parse(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(
        body.sections.futureLandcover.landcoverMain.data[0].percentWetlands
      ).to.eq(92.2);
      expect(
        body.sections.futureLandcover.landcoverMain.data[1].percentWetlands
      ).to.eq(81.8);
      expect(
        body.sections.futureLandcover.landcoverMain.data[2].percentWetlands
      ).to.eq(73.8);
      expect(
        body.sections.futureLandcover.landcoverMain.data[3].percentWetlands
      ).to.eq(68.4);
      expect(
        body.sections.futureLandcover.landcoverMain.data[4].percentWetlands
      ).to.eq(64.3);
    });
  });
});
