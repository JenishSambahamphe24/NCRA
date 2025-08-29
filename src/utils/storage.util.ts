import { ACTION_PAYLOAD_QUERY, REDIRECT_TO_QUERY, SKIP_ONBOARDING_QUERY } from "@/constants/static/routes";
import { ANONYMOUS_USER_MESSAGE_KEY } from "@/constants/static/storageKeys";

export const hasLocalStorage = (function () {
  try {
    return "localStorage" in window && window["localStorage"] !== null;
  } catch (e) {
    return false;
  }
})();

const hasSessionStorage = (function () {
  try {
    return "sessionStorage" in window && window["sessionStorage"] !== null;
  } catch (e) {
    return false;
  }
})();

/**
 * Store string record in the storage
 *
 * @param {string} key - A string representing the key under which the value will be stored in the
 * browser's local storage.
 * @param {T} value - The value to be stored in the local storage. It can be of type string, array,
 * object or boolean. The type parameter T is used to specify the type of the value being stored.
 */
export const setLocalStorage = <T = string | unknown[] | object | boolean>(key: string, value: T) => {
  if (typeof window !== "undefined") {
    if (hasLocalStorage) {
      localStorage.setItem(key, JSON.stringify(value)); // convert arrays or objects into strings
    } else {
      setCookie(key, JSON.stringify(value));
    }
  }
};

/**
 * Retrieve record from the storage using the key
 *
 * @param {string} key
 * @returns {T | null}
 */
export const getLocalStorage = <T = string>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const data = hasLocalStorage ? localStorage.getItem(key) : getCookie(key);
    try {
      if (typeof data === "string") {
        return JSON.parse(data); // converts a JSON string into a Javascript Object
      }
      throw new Error("Data is not a string");
    } catch (e) {
      return null;
    }
  }
  return null;
};

/**
 * Clear records from the storage using the key
 *
 * @param {string} key
 */
export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    if (hasLocalStorage) {
      localStorage.removeItem(key);
    } else {
      removeCookie(key);
    }
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined" && hasLocalStorage) {
    localStorage.clear();
  }
};

// add cookie
export const setCookie = (key: string, value: string, date?: Date) => {
  if (typeof window !== "undefined") {
    if (date) {
      document.cookie = `${key}=${value}; expires=${date.toUTCString()}; path=/;`;
    } else {
      document.cookie = `${key}=${value}; path=/;`;
    }
  }
};

// get cookie
export const getCookie = (key: string) => {
  if (typeof window !== "undefined") {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
};

// remove cookie
export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

// remove localStorage data associated with user
export const clearLocalUserData = () => {
  if (typeof window !== "undefined") {
    removeLocalStorage(REDIRECT_TO_QUERY);
    removeLocalStorage(SKIP_ONBOARDING_QUERY);
    removeLocalStorage(ANONYMOUS_USER_MESSAGE_KEY);
    removeLocalStorage(ACTION_PAYLOAD_QUERY);
  }
};

// Session storage
export const setSessionStorage = <T = string | unknown[] | object | boolean>(key: string, value: T) => {
  if (typeof window !== "undefined") {
    if (hasSessionStorage) {
      sessionStorage.setItem(key, JSON.stringify(value)); // convert arrays or objects into strings
    } else {
      setCookie(key, JSON.stringify(value));
    }
  }
};

export const getSessionStorage = <T = string>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const data = hasSessionStorage ? sessionStorage.getItem(key) : getCookie(key);
    try {
      if (typeof data === "string") {
        return JSON.parse(data); // converts a JSON string into a Javascript Object
      }
      throw new Error("Data is not a string");
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const removeSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    if (hasSessionStorage) {
      sessionStorage.removeItem(key);
    } else {
      removeCookie(key);
    }
  }
};
