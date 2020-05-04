export default {
  padawans: {
    card: `
      width: calc((100% / 6) - 20px);
      height: 110px;

      @media screen and (max-width: 768px) {
        width: calc((100% / 3) - 20px);
      }
    `,
    logo: `
      max-width: 110px;
      max-height: 90px;
    `,
  },
  juniors: {
    card: `
      width: calc((100% / 5) - 20px);
      height: 150px;

      @media screen and (max-width: 768px) {
        width: calc((100% / 3) - 20px);
      }
    `,
    logo: `
      max-width: 150px;
      max-height: 100px;
    `,
  },
  plenos: {
    card: `
      width: calc((100% / 3) - 20px);
      height: 200px;

      @media screen and (max-width: 768px) {
        width: calc((100% / 2) - 20px);
      }
    `,
    logo: `
      max-width: 200px;
      max-height: 150px;
    `,
  },
  seniors: {
    card: `
      width: calc((100% / 2) - 20px);
      height: 300px;
    `,
    logo: `
      max-width: 250px;
      max-height: 200px;
    `,
  },
};
