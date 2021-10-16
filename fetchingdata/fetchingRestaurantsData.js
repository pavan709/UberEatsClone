import vars from "../env";
export const getRestaurantsFromYelp = async (activeTab) => {
  const yelpUrl =
    "https://api.yelp.com/v3/businesses/search?term=restaurants&location=New York City";
  const apiOptions = {
    headers: {
      Authorization: `Bearer ${vars.YELP_API_KEY}`,
    },
  };
  try {
    const response = await fetch(yelpUrl, apiOptions);
    if (!response.ok) {
      throw new Error("something went wrong!");
    }
    const resData = await response.json();
    // console.log("inside fetch",resData.businesses);
    return resData.businesses.filter((business) =>
      business.transactions.includes(activeTab.toLowerCase())
    );
  } catch (error) {
    throw error;
  }
};
