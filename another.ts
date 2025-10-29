export const productsData = {
  "the house of w": {
    label: "The House of W",
    categories: [
      {
        label: "ISVEA",
        products: [
          {
            label: "Red Vanity Lavabo Dolabi Siyah Lavabolu",
            image:
              "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/red%20vanity.png",
          },
          {
            label: "Blue Vanity Lavabo Dolabi Siyah Lavabolu",
            image:
              "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/red%20vanity.png",
          },
        ],
      },
      {
        label: "IDEVIT",
        products: [
          {
            label: "Red Vanity Lavabo Dolabi Siyah Lavabolu",
            image:
              "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/thumbnail/RPTFBTLT_00182_THUMBNAIL.png",
          },
        ],
      },
    ],
  },
  "colour coats": {
    label: "Colour Coats",
    categories: [
      {
        label: "ISVEA",
        products: [
          {
            label: "Red Vanity Lavabo Dolabi Siyah Lavabolu",
            image:
              "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/red%20vanity.png",
          },
          {
            label: "Blue Vanity Lavabo Dolabi Siyah Lavabolu",
            image:
              "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/red%20vanity.png",
          },
        ],
      },
    ],
  },
  metalia: {
    label: "Metalia",
    categories: [
      {
        label: "General",
        products: [
          {
            label: "Red Vanity Lavabo Dolabi Siyah Lavabolu",
            image:
              "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/red%20vanity.png",
          },
        ],
      },
    ],
  },
};

export const navItems = Object.entries(productsData).map(
  ([key, { label, categories }]) => ({
    label,
    data: {
      label: "Explore Products",
      items: categories.map((sub) => ({
        label: sub.label,
        data: sub.products.map((p) => ({ label: p.label })),
      })),
    },
  })
);