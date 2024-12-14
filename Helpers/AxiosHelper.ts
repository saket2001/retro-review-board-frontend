import axios, { AxiosResponse } from "axios";

class AxiosHelper {
  _baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

  HandleApiCallsResponse = (response: AxiosResponse) => {
    if (response !== null || response !== undefined) {
      // if got error return error message
      if (response.data?.IsError)
        return {
          IsError: true,
          Message: response.data?.Message ?? "Something went wrong",
        };
      //if success return message and data
      else {
        return {
          IsError: false,
          Message: response.data?.Message ?? "",
          data: response.data?.data,
        };
      }
    }
  };

  GetReq = async (apiEndpoint: string) => {
    const res = await axios.get(this._baseUrl + apiEndpoint);
    return this.HandleApiCallsResponse(res);
  };

  PostReq = async (apiEndpoint: string, data: unknown) => {
    const res = await axios.post(
      this._baseUrl + apiEndpoint,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return this.HandleApiCallsResponse(res);
  };

  DeleteReq = async (apiEndpoint: string, data?: unknown) => {
    const res = await axios.delete(this._baseUrl + apiEndpoint);
    return this.HandleApiCallsResponse(res);
  };

  DeleteReqWithBody = async (apiEndpoint: string, data?: unknown) => {
    const res = await axios.post(
      this._baseUrl + apiEndpoint,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return this.HandleApiCallsResponse(res);
  };
}

export default AxiosHelper;
