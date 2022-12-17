import { AUTH, IAuthType } from "../types/AuthType";
import { IUserLogin } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";
import { Dispatch } from "redux";

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType>) => {
  try {
    const res = await postAPI("login", userLogin);
    console.log(res);

    dispatch({
      type: AUTH,
      payload: {
        token: res.data.token,
        user: res.data.user,
      },
    });
  } catch (err: any) {
    console.log(err.response.data.msg);
  }
};
