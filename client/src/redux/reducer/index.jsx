import {
  GET_BEERS,
  GET_BEER_DETAIL,
  SEARCH_BAR,
  REMOVE_DETAIL,
  POST_BEER,
  GET_TYPE,
  POST_USER,
  REMOVE_ONE_FROM_CART,
  UPDATE_BEER,
  REMOVE_ALL_FROM_CART,
  ADD_TO_CART,
  GET_CART,
  TOTAL_PRICE,
  CHECKOUT_BEERS,
  FILTER_BEER_BY_BREWERY,
  SORT_BY_NAME,
  SORT_BY_PRICE,
  SET_PAGE,
  GET_SELLERS,
  POST_SELLER,
  POST_FAVS,
  GET_USER,
  ALL_USERS,
} from "../const";

const initialState = {
  search: [],
  beers: [],
  allBeers: [],
  detail: {},
  allSellers: [],
  userType: [],
  type: [],
  page: 1,
  filterPlaceholder: [],
  cart: [],
  infoBeers: [],
  infoSoldBeers: [],
  totalPrice: 0,
  user: [],
  sellers: [],
  favs: [],
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BEERS:
      return {
        ...state,
        allBeers: action.payload,
        beers: action.payload,
      };

    case GET_ALL_SELLERS:
      return {
        ...state,
        allBreweries: action.payload,
      };

    case ADD_TO_CART:
      let newbeer = state.allBeers?.find((beer) => beer?.id === action.payload);
      newbeer.cant = 1;
      let carrito = JSON.parse(localStorage.getItem("carrito"));
      if (carrito) {
        carrito.push(newbeer);
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        localStorage.setItem("carrito", JSON.stringify([newbeer]));
      }
      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("carrito")),
      };

    case REMOVE_ALL_FROM_CART:
      localStorage.setItem("carrito", JSON.stringify([]));
      return {
        cart: [],
      };

    case REMOVE_ONE_FROM_CART:
      let beerToDelete = JSON.parse(localStorage.getItem("carrito")).filter(
        (beer) => beer.id !== action.payload
      );
      localStorage.setItem("carrito", JSON.stringify(beerToDelete));
      return {
        ...state,
        cart: beerToDelete,
      };

    case GET_CART:
      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("carrito")),
      };

    case TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case CHECKOUT_BEERS:
      return {
        ...state,
        infoBeers: action.payload,
      };

    case REMOVE_DETAIL:
      return {
        ...state,
        detail: [],
      };

    case GET_BEER_DETAIL: {
      return {
        ...state,
        detail: action.payload,
      };
    }

    case GET_TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }

    case SEARCH_BAR: {
      return {
        ...state,
        search: action.payload,
        allBeers: action.payload,
      };
    }

    case SORT_BY_NAME:
      let sortedByName = [];
      if (state.allBeers.length === state.beers.length) {
        sortedByName =
          action.payload === "AtoZ"
            ? state.allBeers.sort(function (a, b) {
                return a.name.localeCompare(b.name);
              })
            : state.allBeers.sort(function (a, b) {
                return b.name.localeCompare(a.name);
              });
      }
      if (state.allBeers.length !== state.beers.length) {
        sortedByName =
          action.payload === "AtoZ"
            ? state.beers.sort(function (a, b) {
                return a.name.localeCompare(b.name);
              })
            : state.beers.sort(function (a, b) {
                return b.name.localeCompare(a.name);
              });
      }
      return {
        ...state,
        beers: sortedByName,
        filterPlaceholder: sortedByName,
      };

    case SORT_BY_PRICE:
      let sortedByPrice = [];
      if (state.allBeers.length === state.beers.length) {
        //revisa si allBeers tiene el mismo largo que beers, para ver si ha habido o no algun filtrado
        sortedByPrice =
          action.payload === "Low to High"
            ? state.allBeers.sort(function (a, b) {
                return a.price - b.price;
              })
            : state.allBeers.sort(function (a, b) {
                return b.price - a.price;
              });
      }
      if (state.allBeers.length !== state.beers.length) {
        //misma logica de arriba, caso opuesto
        sortedByPrice =
          action.payload === "Low to High"
            ? state.beers.sort(function (a, b) {
                return a.price - b.price;
              })
            : state.beers.sort(function (a, b) {
                return b.price - a.price;
              });
      }
      return {
        ...state,
        beers: sortedByPrice,
        filterPlaceholder: sortedByPrice,
      };

    case FILTER_BEER_BY_BREWERY:
      const preFilteredBeersByBrewery = state.allBeers;
      const filteredBeersByBrewery =
        action.payload === "All"
          ? preFilteredBeersByBrewery
          : preFilteredBeersByBrewery.filter((beer) =>
              beer.brewery.find((brewery) => brewery.name === action.payload)
            );
      return {
        ...state,
        beers: filteredBeersByBrewery,
        filterPlaceholder: filteredBeersByBrewery,
      };

    case FILTER_BEER_BY_TYPE:
      const preFilteredBeersByType = state.allBeers;
      const filteredBeersByType =
        action.payload === "All"
          ? preFilteredBeersByType
          : preFilteredBeersByType.filter(
              (beer) => beer.tipo === action.payload
            );

      return {
        ...state,
        beers: filteredBeersByType,
        filterPlaceholder: filteredBeersByType,
      };

    case POST_BEER:
      return {
        ...state,
      };

    case POST_USER:
      return {
        ...state,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case UPDATE_BEER:
      return {
        ...state,
      };
    case POST_SELLER:
      return {
        ...state,
      };

    case POST_FAVS:
      return {
        ...state,
        favs: action.payload,
      };

    case GET_SELLERS:
      return {
        ...state,
        allSellers: action.payload,
        sellers: action.payload,
      };

    case ALL_USERS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return { ...state };
  }
}

export default Reducer;
