import { loginService } from "../loginService";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import createUser from "../user/createUser";
import { ROUTES } from "../../index";

jest.mock("../user/createUser");
const mockedCreateUser = createUser as jest.Mocked<typeof createUser>;

describe("googleLoginServiceShould", () => {
  const successfulResponse = {
    profileObj: {
      name: "testProfile",
    },
  } as GoogleLoginResponse;

  const unSuccessfulResponse = {} as GoogleLoginResponseOffline;
  test("should call createUser service when google login is successful", async () => {
    await loginService(successfulResponse);
    expect(mockedCreateUser).toHaveBeenCalledWith({
      externalId: "someID",
      fullName: "test name",
    });
  });

  test("should not call createUser service when google login is unsuccessful", async () => {
    await loginService(unSuccessfulResponse);
    expect(mockedCreateUser).not.toHaveBeenCalled();
  });

  test("return '/teams' when login is successful", async () => {
    const returnValue = await loginService(successfulResponse);
    expect(returnValue).toEqual(ROUTES.teams);
  });

  test("return '/error' when login is unsuccessful", async () => {
    const returnValue = await loginService(unSuccessfulResponse);
    expect(returnValue).toEqual(ROUTES.error);
  });
});
