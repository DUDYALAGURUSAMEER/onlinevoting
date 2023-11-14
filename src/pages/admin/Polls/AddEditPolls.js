import React, { useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Row, message, Tabs, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/spinnerSlice";
import AddEditPollQuestion from "./AddEditPollQuestion";
import {
  addPoll,
  getPollById,
  editPollById,
  deletePollById,
} from "../../../apicalls/polls";
const { TabPane } = Tabs;
function AddEditPolls() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [pollData, setPollData] = React.useState(null);
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    React.useState(false);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;

      if (params.id) {
        response = await editPollById({
          ...values,
          pollId: params.id,
        });
      } else {
        response = await addPoll(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/admin/polls");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getPollData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getPollById({
        pollId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setPollData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPollData();
    }
  }, []);

  const questionsColumns = [
    {
      title: "Question",
      dataIndex: "question",
    },
      {
        title: "Options",
        dataIndex: "options",
        render: (text, record) => {
          const options = record.options || [];
          return options.map((option, index) => (
            <div key={index}>
              {option.option}
            </div>
          ));
        },
      },
      
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => {
              setShowAddEditQuestionModal(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              // Handle delete action
            }}
          ></i>
        </div>
      ),
    },
  ];
  

  return (
    <div>
      <PageTitle title={params.id ? "Edit Poll" : "Add Poll"} />
      <div className="divider"></div>
      {(pollData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={pollData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Poll Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Poll Name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Poll Start" name="duration">
                    <input type="Date" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Poll End" name="endduration">
                    <input type="Date" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <select name="" id="">
                      <option value="">Select Category</option>
                      <option value="Election">Election</option>
                      <option value="Survey">Survey</option>
                    </select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end gap-2">
                <button
                  className="primary-outlined-btn"
                  type="button"
                  onClick={() => navigate("/admin/polls")}
                >
                  Cancel
                </button>
                <button className="primary-contained-btn" type="submit">
                  Save
                </button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Polls" key="2">
                <div className="flex justify-end gap-2">
                  <button
                    className="primary-outlined-btn"
                    type="button"
                    onClick={() => setShowAddEditQuestionModal(true)}
                  >
                    Add Poll
                  </button>
                  </div>
                  <Table
                  columns={questionsColumns}
                  dataSource={pollData?.questions || []}
                />
                
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}
      {showAddEditQuestionModal && (
        <AddEditPollQuestion
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          showAddEditQuestionModal={showAddEditQuestionModal}
          pollId={params.id}
          refreshData={getPollData}
        />
      )}
    </div>
  );
}

export default AddEditPolls;
