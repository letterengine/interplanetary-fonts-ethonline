/**
 *
 * @param token jwt token
 * @returns expiry time in seconds
 */
const getJwtExpiration = (
  token
) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error(error);
    return { exp: 0 };
  }
};

export default getJwtExpiration;