export const to = (promise) =>
  promise.then((data) => [null, data]).catch((err) => [err]);

export const throwError = (errMessage, log) => {
  if (log === true) console.log(errMessage);
  return errMessage;
};

export const getAPIQuery = (query) => {
  let params = "/";
  if (query) {
    for (let key in query) {
      params += `${query[key]}/`;
    }
  }

  return params.substring(0, params.length - 1);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const renderHtmlContent = (htmlString) => {
  return { __html: htmlString };
};

export const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return `${year}-${month}-${day}`;
};

export const fakeResponse = (sku) => {
  return sku === "CDT845P2N8S1"
    ? {
        items: {
          0: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "WASH PUMP MAIN ASM",
            ITEM_ID: "WD19X32518",
            NOTES: "",
            QUANTITY: 1,
          },
          1: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "LOWER SPRAY ARM ASM",
            ITEM_ID: "WD22X25281",
            NOTES: "",
            QUANTITY: 1,
          },
          2: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "DOOR VENT SEAL",
            ITEM_ID: "WD08X10092",
            NOTES: "",
            QUANTITY: 1,
          },
          3: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "GASKET TUB PLASTIC",
            ITEM_ID: "WD08X22095",
            NOTES: "",
            QUANTITY: 1,
          },
          4: {
            ADDITIONAL_TECH_NEEDED: 1,
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "SUMP OVERMOLD SERVICE KIT",
            ITEM_ID: "WD19X28199",
            NOTES: "",
            QUANTITY: 1,
          },
          5: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "INNER DOOR ASM",
            ITEM_ID: "WD31X29644",
            NOTES:
              "DD09-21 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            QUANTITY: 1,
          },
          6: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "DRAIN PUMP ASM",
            ITEM_ID: "WD19X25461",
            NOTES: "",
            QUANTITY: 1,
          },
          7: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "TRANSITION PIECE ASM",
            ITEM_ID: "WD12X23557",
            NOTES: "",
            QUANTITY: 1,
          },
          8: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "30min",
            ITEM_DESCRIPTION: "FAN VENT ASM",
            ITEM_ID: "WD24X25325",
            NOTES: "",
            QUANTITY: 1,
          },
          9: {
            ADDITIONAL_TECH_NEEDED: "",
            ADDITIONAL_TIME_NEEDED: "",
            ITEM_DESCRIPTION: "DETERGENT MODULE",
            ITEM_ID: "WD12X28239",
            NOTES: "",
            QUANTITY: 1,
          },
        },
        status: "S",
      }
    : {
        NO_RECOMMENDATION_REASON:
          "No Parts Recommended - Inputted appliance model number not valid or complete",
        status: "E",
      };
};
