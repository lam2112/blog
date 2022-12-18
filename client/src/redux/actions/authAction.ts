import { AUTH, IAuthType } from "../types/AuthType";
import { ALERT, IAlertType } from "../types/alertType";
import { IUserLogin } from "../../utils/TypeScript";
import { postAPI } from "../../utils/FetchData";
import { Dispatch } from "redux";

export const login =
  (userLogin: IUserLogin) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await postAPI("login", userLogin);
      console.log(res);

      dispatch({
        type: AUTH,
        payload: {
          token: res.data.token,
          user: res.data.user,
        },
      });
      dispatch({ type: ALERT, payload: { success: "Login Success!" } });

    } catch (err: any) {
      console.log(err.response.data.msg);
      dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });

    }
  };
