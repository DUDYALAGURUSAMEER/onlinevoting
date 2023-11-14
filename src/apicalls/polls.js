const { default: axiosInstance } = require(".");

// add poll

export const addPoll = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/polls/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all polls
export const getAllPolls = async () => {
  try {
    const response = await axiosInstance.post("/api/polls/get-all-polls");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get poll by id

export const getPollById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/polls/get-poll-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editPollById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/polls/edit-poll-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deletePollById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/polls/delete-poll-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};


export const addQuestionToPoll = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/polls/add-question-to-poll",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
