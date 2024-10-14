import axios from "axios";

interface IUpdatePresentation {
  newName: string;
  createdBy: number;
  id: number;
}

class PresentationServices {
  getPresentationsUrl = "/presentations";
  createPresentationsUrl = "/createNewPresentation";
  apiUrl = "http://localhost:3000/api";

  getPresentations = (token: string) => {
    return axios.get(`${this.apiUrl}${this.getPresentationsUrl}`, {
      headers: {
        authorization: token,
      },
    });
  };
  createPresentations = (createPresentationsBody: any, token: string) => {
    return axios.post(
      `${this.apiUrl}${this.createPresentationsUrl}`,
      createPresentationsBody,
      {
        headers: {
          authorization: token,
        },
      }
    );
  };

  updatePresentation = (
    updatePresentationBody: IUpdatePresentation,
    token: string
  ) => {
    return axios.put(
      `${this.apiUrl}${this.getPresentationsUrl}/${updatePresentationBody.id}`,
      {
        newName: updatePresentationBody.newName,
        createdBy: updatePresentationBody.createdBy,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  };
  deletePresentation = (deleteId: number, token: string) => {
    return axios.delete(
      `${this.apiUrl}${this.getPresentationsUrl}/${deleteId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
  };
}

export default PresentationServices;
