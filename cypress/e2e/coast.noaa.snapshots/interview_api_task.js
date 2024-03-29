/// <reference types="cypress"/>

describe("Object Structure Test", () => {
  it("should have consistent structure", () => {
    cy.request({
      method: "GET",
      url: "https://coast.noaa.gov/snapshots/api/futureFlood/45019.json",
    }).then((response) => {
      const futureDemographics =
        response.body.sections.futureDemographics.demographicsMain.use;
      const expectedStructure = {
        pdf: true,
        ui: true,
      };
      expect(futureDemographics).to.deep.equal(expectedStructure);
    });
  });
});

it("should fail if structure changes", () => {
  cy.request({
    method: "GET",
    url: "https://coast.noaa.gov/snapshots/api/futureFlood/45019.json",
  }).then((response) => {
    const futureDemographics2 =
      response.body.sections.futureDemographics.demographicsMain.use;
    const modifiedStructure = {
      pdf: true,
      ui1: true,
    };
    expect(futureDemographics2).not.to.deep.equal(modifiedStructure);
  });
});
