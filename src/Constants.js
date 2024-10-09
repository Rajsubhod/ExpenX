const PING = 'http://192.168.0.105:9010/auth/v1/ping';

const REFRESH_TOKEN = 'http://192.168.0.105:9010/auth/v1/refreshtoken';

const LOGIN = 'http://192.168.0.105:9010/auth/v1/login';

const SIGNUP = 'http:////192.168.0.105:9010/auth/v1/signup';

const FETCH_USER_DETAILS = 'http://192.168.0.105:9020/user/v1/id';

const UPDATE_USER_DETAILS = 'http://192.168.0.105:9020/user/v1/id';

const ADD_TRANSACTION = 'http://192.168.0.105:9040/expense/api/v1/message';

const FETCH_USER_TRANSACTIONS = 'http://192.168.0.105:9050/transaction/v1/id';

const SSE_URL = 'http://192.168.0.105:9050/transaction/v1/connec';

export const constants = {
    PING,
    REFRESH_TOKEN,
    LOGIN,
    SIGNUP,
    FETCH_USER_DETAILS,
    UPDATE_USER_DETAILS,
    ADD_TRANSACTION,
    FETCH_USER_TRANSACTIONS,
    SSE_URL
}