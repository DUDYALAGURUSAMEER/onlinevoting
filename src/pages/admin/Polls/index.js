import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { getAllPolls } from "../../../apicalls/polls";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/spinnerSlice";
import { message, Table } from "antd";
import { deletePollById } from "../../../apicalls/polls";
function Polls() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [polls, setPolls] = React.useState([]);

  const getPollsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllPolls();
      dispatch(HideLoading());
      if (response.success) {
        setPolls(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteExam = async (pollId) => {
    try {
      dispatch(ShowLoading());
      const response = await deletePollById({
        pollId,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getPollsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Poll Name",
      dataIndex: "name",
    },
    {
      title: "Poll Start",
      dataIndex: "duration",
    },
    {
      title: "Poll End",
      dataIndex: "endduration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/polls/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteExam(record._id)}
          ></i>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getPollsData();
  }, []);

  return (
    <div>
      <div class="flex justify-between mt-2">
        <PageTitle title="Polls" />
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/polls/add")}
        >
          <i className="ri-add-line"></i>
          Add Poll
        </button>
      </div>
      <div className="divider"></div>
      <Table columns={columns} dataSource={polls} />
    </div>
  );
}

export default Polls;
